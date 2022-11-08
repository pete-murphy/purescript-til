module Main (main) where

import TIL.Prelude

import ArgParse.Basic (ArgParser)
import ArgParse.Basic as ArgParse
import Data.Array as Array
import Data.Array.NonEmpty as Array.NonEmpty
import Data.Either (Either(..))
import Data.Either as Either
import Data.Lazy as Data.Lazy
import Data.Maybe (Maybe(..))
import Data.RFC3339String (RFC3339String(..))
import Data.RFC3339String as RFC3339String
import Data.String.CaseInsensitive (CaseInsensitiveString(..))
import Data.String.Ext (Pattern(..))
import Data.String.Ext as String
import Data.String.NonEmpty as String.NonEmpty
import Data.Traversable as Traversable
import Debug as Debug
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff as Aff
import Effect.Class as Effect
import Effect.Class.Console as Console
import Effect.Exception as Exception
import Effect.Now as Now
import Node.ChildProcess (Exit(..))
import Node.Encoding (Encoding(..))
import Node.FS.Aff as FS.Aff
import Node.FS.Async as FS.Async
import Node.Path as Path
import Node.Process as Process
import Node.ReadLine as ReadLine
import Slug as Slug
import TIL.FS as TIL.FS
import TIL.Process as TIL.Process
import TIL.Title (Title)
import TIL.Title as Title

type EditParams =
  { title :: Title
  , mediaFilePaths :: Array String
  }

data Command
  = Build
  | Sync
  | Edit (Maybe EditParams)

parser :: ArgParser Command
parser =
  ArgParse.choose "command"
    [ ArgParse.command [ "build" ]
        "Build all documents to HTML files for distribution"
        do
          Build <$ ArgParse.fromRecord {}
    , ArgParse.command [ "sync" ]
        "Ensure the local environment has all known changes"
        do
          Sync <$ ArgParse.fromRecord {}
    , ArgParse.command [ "edit" ]
        "Edit and publish a new document"
        do
          Edit
            <$> ArgParse.optional
              ( ArgParse.fromRecord
                  { title
                  , mediaFilePaths
                  }
              )
            <* ArgParse.flagHelp
    ] <* ArgParse.flagHelp
  where
  title = do
    ArgParse.unfolded1 (ArgParse.anyNotFlag "TITLE" "Title")
      <#> String.joinWith " "
      # ArgParse.unformat "STRING"
          -- Probably not reachable?
          (Title.fromString >>> Either.note "Failed to generate slug from string")

  mediaFilePaths =
    ArgParse.argument [ "--files", "-f" ] "Paths to media files"
      # ArgParse.separated "FILE" (Pattern ",")
      # ArgParse.unformat "LIST"
          -- Probably not reachable?
          (Array.NonEmpty.fromArray >>> Either.note "Expected non-empty list of files")
      # ArgParse.optional
      <#> foldMap Array.fromFoldable

main :: Effect Unit
main = Aff.launchAff_ do
  args <- Array.drop 2 <$> Effect.liftEffect Process.argv
  let
    parsedCommand =
      ArgParse.parseArgs
        "til"
        "Publish short articles from the command line."
        parser
        args
  case parsedCommand of
    Left error -> do
      Console.log (ArgParse.printArgError error)
      Effect.liftEffect do
        case error of
          ArgParse.ArgError _ ArgParse.ShowHelp -> do
            Process.exit 0
          ArgParse.ArgError _ (ArgParse.ShowInfo _) -> do
            Process.exit 0
          _ -> do
            Process.exit 1
    Right command -> do
      tilPath <- Effect.liftEffect do
        Process.lookupEnv "TIL_PATH" `whenNothingM` do
          Exception.throw "Missing environment variable: TIL_PATH"
      -- TODO: Refactor?
      entriesPath <- do
        path <- Effect.liftEffect (Path.resolve [ tilPath ] "entries")
        pathExists <- TIL.FS.directoryExists path
        unless pathExists do
          askToMake path
        pure path

      case command of
        Build -> do
          pure unit
        Sync -> do
          handleSync tilPath
          pure unit

        Edit maybeEditParams -> do
          handleSync tilPath

          existingEntries <- do
            let
              listAllFiles =
                -- Get all files in entries
                "git ls-files -z | "
                  <>
                    -- Sorted by git last modification time
                    "xargs -0 -n1 -I\"{}\" -- git log -1 --format=\"%at {}\" \"{}\" | sort -sr | cut -d \" \" -f2- | tr '\\n' '\\0' | "
                  <>
                    -- Remove the extension
                    "xargs -0 basename -s .md"
            rawEntries <- TIL.Process.exec listAllFiles (_ { cwd = Just entriesPath }) <#> _.stdout
              >>> String.trim
              >>> String.NonEmpty.fromString
              >>> foldMap (String.NonEmpty.toString >>> String.split (Pattern "\n"))
            case Traversable.traverse Slug.generate rawEntries of
              Just slugEntries -> do
                pure slugEntries
              Nothing -> do
                Console.log "Failed to parse existing entries as slugs"
                for_ rawEntries Console.logShow
                Effect.liftEffect (Process.exit 1)

          { filePath, alreadyExists } <- case maybeEditParams of
            Just { title, mediaFilePaths }
              | titleSlug <- Title.slug title
              , titleSlug `notElem` existingEntries -> do
                  Debug.traceM "Making a new file"
                  Aff.bracket
                    (_.stdout <$> TIL.Process.exec "mktemp" identity)
                    FS.Aff.unlink
                    \tempFile -> do
                      RFC3339String dateString <- Effect.liftEffect do
                        Now.nowDateTime
                          <#> RFC3339String.fromDateTime
                          >>> RFC3339String.trim
                      tags <- do
                        -- TODO: parse tags from existing files
                        pure []
                      let
                        frontMatter = String.joinWith "\n"
                          [ "---"
                          , "title: " <> String.NonEmpty.toString (Title.full title)
                          , "permalink: " <> Slug.toString titleSlug
                          , "date: " <> dateString
                          , "tags: " <> if Array.null tags then "" else "[" <> String.joinWith "," tags <> "]"
                          , "---"
                          ]

                      let filePath = Path.concat [ entriesPath, Slug.toString titleSlug <> ".md" ]

                      FS.Aff.writeTextFile UTF8 tempFile frontMatter
                      let command_ = String.quote ("+silent 0read " <> tempFile) <> " +\\$d +8 +start " <> String.escape filePath
                      Debug.traceM { command_ }
                      TIL.Process.edit command_

                      pure { filePath, alreadyExists: false }

            -- `fileAlreadyExists` covers both cases
            --   * an existing filename was specified
            --   * no filename was specified (in which case we select from a list)
            fileAlreadyExists -> do
              let
                fzfList =
                  "fzf --no-multi --layout=reverse --margin 7% "
                    <> "--border=none --preview \"bat --color=always --style=plain "
                    <> "--line-range=:500 {}.md\" --preview-window=right,70%,border-none"
                echoEntries = "echo " <> show (String.joinWith "\n" (Slug.toString <$> existingEntries))
                echoAndFzf = echoEntries <> " | " <> fzfList

              titleSlug <-
                fileAlreadyExists <#> _.title >>> Title.slug >>> Just
                  # onNothing do
                      TIL.Process.interactive echoAndFzf entriesPath
                        <#> (String.trim >>> Slug.parse)
                  # onNothingM do
                      Console.log ("Failed to parse filename as slug")
                      Effect.liftEffect (Process.exit 1)

              let filePath = Path.concat [ entriesPath, Slug.toString titleSlug <> ".md" ]

              TIL.Process.edit (String.escape ("+8 " <> filePath))

              pure { filePath, alreadyExists: true }

          Debug.traceM "TODO: Continuation"
          Debug.traceM { filePath, alreadyExists }

          pure unit

  where
  askToMake :: String -> Aff Unit
  askToMake path = Aff.makeAff \k -> do
    interface <- ReadLine.createConsoleInterface ReadLine.noCompletion
    interface # ReadLine.question "No entries path exists, do you want to create it at \"./entries\"? (Y/n) " case _ of
      input
        | CaseInsensitiveString input == CaseInsensitiveString "n" -> do
            ReadLine.close interface
            Process.exit 0
        | CaseInsensitiveString input == CaseInsensitiveString "y" -> do
            ReadLine.close interface
            FS.Async.mkdir path k
        | otherwise -> FS.Async.mkdir path k

    let canceler = Aff.effectCanceler (ReadLine.close interface)
    pure canceler

-- TIL.Process edit

handleSync :: String -> Aff Unit
handleSync tilPath = do
  gitStatusResult <- TIL.Process.exec (String.joinWith " " [ "git", "-C", tilPath, "status", "--porcelain" ]) (_ { cwd = Just tilPath })
  case gitStatusResult.exit, gitStatusResult.stdout of
    Normally 0, stdout
      | String.null stdout -> do
          Debug.traceM "Good, repo not dirty"
      | otherwise -> do
          Console.log "Dirty repo, stash or commit changes?\n"
          Console.log stdout
          Effect.liftEffect do
            Process.exit 1
    Normally n, _ -> do
      Console.log ("Exiting with code: " <> show n)
      Effect.liftEffect do
        Process.exit n
    BySignal signal, _ -> do
      Effect.liftEffect do
        Exception.throw ("Killed by signal: " <> show signal)

  gitFetchAndRebaseResult <- do
    let
      fetch = "git -C " <> tilPath <> " fetch origin main -q"
      rebase = "git -C " <> tilPath <> " rebase -q"
      fetchAndRebase = fetch <> " && " <> rebase
    TIL.Process.exec fetchAndRebase (_ { timeout = Just 5_000.0 })

  case gitFetchAndRebaseResult.exit of
    Normally 0 -> pure unit
    Normally n -> do
      Console.log ("Exiting with code: " <> show n)
      Effect.liftEffect do
        Process.exit n
    BySignal signal -> do
      Effect.liftEffect do
        Exception.throw ("Killed by signal: " <> show signal)


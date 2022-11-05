module Main where

import Prelude

import ArgParse.Basic (ArgParser)
import ArgParse.Basic as ArgParse
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as Array.NonEmpty
import Data.Either (Either(..))
import Data.Either as Either
import Data.Foldable as Foldable
import Data.Maybe (Maybe(..))
import Data.Maybe as Maybe
import Data.String (Pattern(..))
import Data.String as String
import Data.String.CaseInsensitive (CaseInsensitiveString(..))
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as String.NonEmpty
import Data.Traversable (class Traversable)
import Data.Traversable as Traversable
import Debug as Debug
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff as Aff
import Effect.Class as Effect
import Effect.Class.Console as Console
import Effect.Exception as Exception
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
      <#> Foldable.foldMap Array.fromFoldable

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

        Edit mbEditParams -> do
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
              >>> Foldable.foldMap (String.NonEmpty.toString >>> String.split (Pattern "\n"))
            case Traversable.traverse Slug.generate rawEntries of
              Just slugEntries -> do
                pure slugEntries
              Nothing -> do
                Console.log "Failed to parse existing entries as slugs"
                Foldable.for_ rawEntries Console.logShow
                Effect.liftEffect (Process.exit 1)

          case mbEditParams of
            Just { title, mediaFilePaths }
              | Title.slug title `Foldable.elem` existingEntries -> do
                  Console.log "Title already exists"
                  Debug.traceM "TODO: here we should edit it"
              | otherwise -> do
                  let newFileName = Slug.toString (Title.slug title) <> ".md"
                  Debug.traceM ("Writing to: " <> newFileName)
                  FS.Aff.writeTextFile UTF8 newFileName ("Testing:\n\n" <> String.joinWith "\n" mediaFilePaths)
            Nothing -> do
              Debug.traceM "No title specified"
              Debug.traceM "TODO: here we should show fzf"
              Debug.traceM { existingEntries }

  --  "fzf --no-multi --layout=reverse --margin 7% --border=none --preview \"bat --color=always --style=plain --line-range=:500 {}.md\" --preview-window=right,70%,border-none"

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

handleEditNew :: String -> Aff Unit
handleEditNew tilPath = do
  pure unit

handleSync :: String -> Aff Unit
handleSync tilPath = do
  gitStatusResult <- TIL.Process.exec (String.joinWith " " [ "git", "-C", tilPath, "status", "--porcelain" ]) (_ { cwd = Just tilPath })
  case gitStatusResult.exit of
    Normally 1 -> pure unit
    Normally 0 -> do
      Console.log "Dirty repo, stash or commit changes?\n"
      Console.log gitStatusResult.stdout
      Effect.liftEffect do
        Process.exit 1
    Normally n -> do
      Console.log ("Exiting with code: " <> show n)
      Effect.liftEffect do
        Process.exit n
    BySignal signal -> do
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

whenNothingM :: forall m a. Monad m => m (Maybe a) -> m a -> m a
whenNothingM mma ma = mma >>= Maybe.maybe ma pure

onNothingM :: forall m a. Monad m => m a -> m (Maybe a) -> m a
onNothingM = flip whenNothingM
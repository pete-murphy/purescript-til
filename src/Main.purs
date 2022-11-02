module Main where

import Prelude

import ArgParse.Basic (ArgParser)
import ArgParse.Basic as ArgParse
import Data.Array as Array
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Maybe as Maybe
import Data.String (Pattern(..))
import Data.String as String
import Debug as Debug
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff as Aff
import Effect.Class as Effect
import Effect.Class.Console as Console
import Effect.Exception as Exception
import Node.ChildProcess (Exit(..))
import Node.Process (argv, exit, lookupEnv) as Process
import TIL.Process (exec) as Process

data Command
  = Build
  | Sync
  | Edit
      (Maybe { title :: String, mediaFilePaths :: Array String })

parser :: ArgParser Command
parser =
  ArgParse.choose "command"
    [ ArgParse.flag [ "build" ]
        "Build all documents to HTML files for distribution"
        $> Build
    , ArgParse.flag [ "sync" ]
        "Ensure the local environment has all known changes"
        $> Sync
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
    let parts = ArgParse.unfolded (ArgParse.anyNotFlag "TITLE" "Title")
    String.joinWith " " <$> parts
  mediaFilePaths =
    ArgParse.argument [ "--files", "-f" ] "Paths to media files"
      # ArgParse.separated "FILE" (Pattern ",")

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

      case command of
        Build -> do
          pure unit
        Sync -> do
          handleSync tilPath
        Edit Nothing -> do
          pure unit
        Edit (Just x) -> do
          Debug.traceM x
          pure unit

handleSync :: String -> Aff Unit
handleSync tilPath = do
  gitStatusResult <- Process.exec (String.joinWith " " [ "git", "-C", tilPath, "status", "--porcelain" ]) identity
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
      rebase = "git -C" <> tilPath <> " rebase -q"
      fetchAndRebase = fetch <> " && " <> rebase
    Process.exec fetchAndRebase (_ { timeout = Just 5000.0 })

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
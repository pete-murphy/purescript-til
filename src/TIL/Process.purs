module TIL.Process
  ( Result
  , exec
  , spawn
  ) where

import Prelude

import Data.Either (Either(..))
import Data.Either as Either
import Data.Foldable as Foldable
import Data.Maybe (Maybe)
import Data.Maybe as Maybe
import Data.Posix.Signal (Signal(..))
import Effect.Aff (Aff)
import Effect.Aff as Aff
import Effect.Ref as Ref
import Node.Buffer as Buffer
import Node.ChildProcess (ExecOptions, Exit(..), SpawnOptions)
import Node.ChildProcess as ChildProcess
import Node.Encoding (Encoding(..))
import Node.Stream as Stream

type Result =
  { stdout :: String
  , stderr :: String
  , exit :: Exit
  }

exec :: String -> (ExecOptions -> ExecOptions) -> Maybe String -> Aff Result
exec command modifyOptions maybeStdin = Aff.makeAff \k -> do
  let
    options = modifyOptions ChildProcess.defaultExecOptions
    encoding = Maybe.fromMaybe UTF8 options.encoding
    killSignal = Maybe.fromMaybe SIGTERM options.killSignal
  childProcess <- ChildProcess.exec command options \{ error, stderr, stdout } -> do
    Foldable.for_ error (k <<< Left)
    stderr' <- Buffer.toString encoding stderr
    stdout' <- Buffer.toString encoding stdout
    k (Right { stderr: stderr', stdout: stdout', exit: Normally 0 })

  ChildProcess.onError childProcess (k <<< Left <<< ChildProcess.toStandardError)

  Foldable.for_ maybeStdin \stdin ->
    Stream.writeString (ChildProcess.stdin childProcess) encoding ("\n" <> stdin)
      ( k <<< Either.either Right Left <<< Either.note
          { exit: Normally 1
          , stderr: mempty
          , stdout: mempty
          }
      )

  let
    canceler = Aff.effectCanceler (ChildProcess.kill killSignal childProcess)
  pure canceler

spawn :: String -> Array String -> (SpawnOptions -> SpawnOptions) -> Aff Result
spawn command args modifyOptions = Aff.makeAff \k -> do
  stdoutRef <- Ref.new []
  stderrRef <- Ref.new []

  let
    options = modifyOptions ChildProcess.defaultSpawnOptions
    -- TODO: Accept as argument
    encoding = UTF8
    -- TODO: `spawn` should take killSignal as option
    -- https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
    killSignal = SIGTERM
  childProcess <- ChildProcess.spawn command args options

  Stream.onData (ChildProcess.stdout childProcess) \buffer ->
    Ref.modify_ (_ <> [ buffer ]) stdoutRef
  Stream.onData (ChildProcess.stderr childProcess) \buffer ->
    Ref.modify_ (_ <> [ buffer ]) stderrRef

  ChildProcess.onError childProcess (k <<< Left <<< ChildProcess.toStandardError)
  ChildProcess.onExit childProcess \exit -> do
    stdout <- Buffer.toString encoding =<< Buffer.concat =<< Ref.read stdoutRef
    stderr <- Buffer.toString encoding =<< Buffer.concat =<< Ref.read stderrRef
    k (Right { exit, stdout, stderr })

  let
    canceler = Aff.effectCanceler (ChildProcess.kill killSignal childProcess)
  pure canceler


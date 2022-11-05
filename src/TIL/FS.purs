module TIL.FS where

import Prelude

import Data.Either (Either(..))
import Data.Function.Uncurried as Uncurried
import Debug as Debug
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff as Aff
import Effect.Class.Console as Console
import Node.FS.Async as FS.Async
import Node.FS.Stats (Stats)
import Node.FS.Stats as Stats
import Node.Path (FilePath)
import Unsafe.Coerce as Unsafe

exists' :: (Stats -> Boolean) -> FilePath -> Aff Boolean
exists' check filePath = Aff.makeAff \k -> do
  FS.Async.lstat filePath case _ of
    Left error ->
      if
        -- TODO: FFI
        (Unsafe.unsafeCoerce error).code == "ENOENT" then k (Right false)
      else k (Left error)
    Right x -> k (Right (check x))
  pure Aff.nonCanceler

fileExists :: FilePath -> Aff Boolean
fileExists = exists' Stats.isFile

directoryExists :: FilePath -> Aff Boolean
directoryExists = exists' Stats.isDirectory

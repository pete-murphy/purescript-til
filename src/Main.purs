module Main where

import Prelude

import Control.Monad.Except as ExceptT
import Effect (Effect)
import Effect.Aff as Aff
import Effect.Console (log)
import Shell as Shell

main :: Effect Unit
main = do
  Aff.launchAff_ do
    _ <- ExceptT.runExceptT do
      Shell.exec' "pwd" >>= case _ of
        _ -> pure unit
    pure unit
  log "🍝"


module Data.String.Ext
  ( escape
  , module String
  , quote
  , trimEnd
  , trimStart
  ) where

import TIL.Prelude

import Data.Foldable as Foldable
import Data.List as List
import Data.String (Pattern(..), Replacement(..))
import Data.String
  ( CodePoint
  , Pattern(..)
  , Replacement(..)
  , codePointAt
  , codePointFromChar
  , contains
  , countPrefix
  , drop
  , dropWhile
  , fromCodePointArray
  , indexOf
  , indexOf'
  , joinWith
  , lastIndexOf
  , lastIndexOf'
  , length
  , localeCompare
  , null
  , replace
  , replaceAll
  , singleton
  , split
  , splitAt
  , stripPrefix
  , stripSuffix
  , take
  , takeWhile
  , toCodePointArray
  , toLower
  , toUpper
  , trim
  , uncons
  ) as String

foreign import trimEnd :: String -> String
foreign import trimStart :: String -> String

escape :: String -> String
escape = quote <<< String.replaceAll (Pattern "\"") (Replacement "\\\"")

quote :: String -> String
quote = Foldable.surround "\"" <<< List.singleton
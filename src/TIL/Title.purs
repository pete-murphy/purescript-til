module TIL.Title
  ( Title
  , fromString
  , full
  , slug
  ) where

import Prelude

import Data.Maybe (Maybe)
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NonEmpty
import Slug (Slug)
import Slug as Slug

newtype Title =
  Title
    { full :: NonEmptyString
    , slug :: Slug
    }

fromString :: String -> Maybe Title
fromString str = ado
  full' <- NonEmpty.fromString str
  slug' <- Slug.generate str
  in Title { full: full', slug: slug' }

full :: Title -> NonEmptyString
full (Title title) = title.full

slug :: Title -> Slug
slug (Title title) = title.slug
module TIL.Prelude
  ( elem
  , foldMap
  , for_
  , module Prelude
  , notElem
  , onNothing
  , onNothingM
  , traverse_
  , whenNothing
  , whenNothingM
  ) where

import Prelude

import Data.Foldable (class Foldable)
import Data.Foldable as Foldable
import Data.Maybe (Maybe)
import Data.Maybe as Maybe

elem :: forall (a :: Type) (f :: Type -> Type). Foldable f => Eq a => a -> f a -> Boolean
elem = Foldable.elem

notElem :: forall (a :: Type) (f :: Type -> Type). Foldable f => Eq a => a -> f a -> Boolean
notElem = Foldable.notElem

for_ :: forall a b f m. Applicative m => Foldable f => f a -> (a -> m b) -> m Unit
for_ = Foldable.for_

traverse_ :: forall a b f m. Applicative m => Foldable f => (a -> m b) -> f a -> m Unit
traverse_ = Foldable.traverse_

foldMap :: forall (f :: Type -> Type) (a :: Type) (m :: Type). Foldable f => Monoid m => (a -> m) -> f a -> m
foldMap = Foldable.foldMap

onNothingM :: forall m a. Monad m => m a -> m (Maybe a) -> m a
onNothingM ma = (_ >>= Maybe.maybe ma pure)

whenNothingM :: forall m a. Monad m => m (Maybe a) -> m a -> m a
whenNothingM = flip onNothingM

onNothing :: forall m a. Monad m => m a -> Maybe a -> m a
onNothing ma = Maybe.maybe ma pure

whenNothing :: forall m a. Monad m => Maybe a -> m a -> m a
whenNothing = flip onNothing

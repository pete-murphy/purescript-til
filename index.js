// output-es/runtime.js
function fail() {
  throw new Error("Failed pattern match");
}

// output-es/Data.Function/index.js
var $$const = (a) => (v) => a;

// output-es/Control.Semigroupoid/index.js
var semigroupoidFn = { compose: (f) => (g) => (x) => f(g(x)) };

// output-es/Data.Unit/foreign.js
var unit = void 0;

// output-es/Type.Proxy/index.js
var $Proxy = () => ({ tag: "Proxy" });
var $$Proxy = /* @__PURE__ */ $Proxy();

// output-es/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output-es/Control.Apply/index.js
var identity = (x) => x;

// output-es/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};

// output-es/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};
var concatArray = function(xs) {
  return function(ys) {
    if (xs.length === 0)
      return ys;
    if (ys.length === 0)
      return xs;
    return xs.concat(ys);
  };
};

// output-es/Data.Semigroup/index.js
var semigroupString = { append: concatString };
var semigroupArray = { append: concatArray };

// output-es/Control.Alternative/index.js
var guard = (dictAlternative) => {
  const pure = dictAlternative.Applicative0().pure;
  const empty2 = dictAlternative.Plus1().empty;
  return (v) => {
    if (v) {
      return pure(unit);
    }
    return empty2;
  };
};

// output-es/Control.Bind/foreign.js
var arrayBind = function(arr) {
  return function(f) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }
    return result;
  };
};

// output-es/Control.Bind/index.js
var identity2 = (x) => x;

// output-es/Control.Monad.ST.Internal/foreign.js
var bind_ = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};
var run = function(f) {
  return f();
};
function whileST(f) {
  return function(a) {
    return function() {
      while (f()) {
        a();
      }
    };
  };
}
function forST(lo) {
  return function(hi) {
    return function(f) {
      return function() {
        for (var i = lo; i < hi; i++) {
          f(i)();
        }
      };
    };
  };
}

// output-es/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};

// output-es/Data.Ordering/index.js
var $Ordering = (tag) => ({ tag });
var LT = /* @__PURE__ */ $Ordering("LT");
var GT = /* @__PURE__ */ $Ordering("GT");
var EQ = /* @__PURE__ */ $Ordering("EQ");

// output-es/Data.Maybe/index.js
var $Maybe = (tag, _1) => ({ tag, _1 });
var Nothing = /* @__PURE__ */ $Maybe("Nothing");
var Just = (value0) => $Maybe("Just", value0);
var isNothing = (v2) => {
  if (v2.tag === "Nothing") {
    return true;
  }
  if (v2.tag === "Just") {
    return false;
  }
  fail();
};
var isJust = (v2) => {
  if (v2.tag === "Nothing") {
    return false;
  }
  if (v2.tag === "Just") {
    return true;
  }
  fail();
};
var functorMaybe = {
  map: (v) => (v1) => {
    if (v1.tag === "Just") {
      return $Maybe("Just", v(v1._1));
    }
    return Nothing;
  }
};
var applyMaybe = {
  apply: (v) => (v1) => {
    if (v.tag === "Just") {
      if (v1.tag === "Just") {
        return $Maybe("Just", v._1(v1._1));
      }
      return Nothing;
    }
    if (v.tag === "Nothing") {
      return Nothing;
    }
    fail();
  },
  Functor0: () => functorMaybe
};
var applicativeMaybe = { pure: Just, Apply0: () => applyMaybe };
var altMaybe = {
  alt: (v) => (v1) => {
    if (v.tag === "Nothing") {
      return v1;
    }
    return v;
  },
  Functor0: () => functorMaybe
};
var plusMaybe = { empty: Nothing, Alt0: () => altMaybe };
var alternativeMaybe = { Applicative0: () => applicativeMaybe, Plus1: () => plusMaybe };

// output-es/Data.Either/index.js
var $Either = (tag, _1) => ({ tag, _1 });
var Left = (value0) => $Either("Left", value0);
var Right = (value0) => $Either("Right", value0);
var functorEither = {
  map: (f) => (m) => {
    if (m.tag === "Left") {
      return $Either("Left", m._1);
    }
    if (m.tag === "Right") {
      return $Either("Right", f(m._1));
    }
    fail();
  }
};
var applyEither = {
  apply: (v) => (v1) => {
    if (v.tag === "Left") {
      return $Either("Left", v._1);
    }
    if (v.tag === "Right") {
      if (v1.tag === "Left") {
        return $Either("Left", v1._1);
      }
      if (v1.tag === "Right") {
        return $Either("Right", v._1(v1._1));
      }
      fail();
    }
    fail();
  },
  Functor0: () => functorEither
};
var bindEither = {
  bind: (v2) => {
    if (v2.tag === "Left") {
      return (v) => $Either("Left", v2._1);
    }
    if (v2.tag === "Right") {
      return (f) => f(v2._1);
    }
    fail();
  },
  Apply0: () => applyEither
};

// output-es/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output-es/Effect/index.js
var monadEffect = { Applicative0: () => applicativeEffect, Bind1: () => bindEffect };
var bindEffect = { bind: bindE, Apply0: () => applyEffect };
var applyEffect = {
  apply: (f) => (a) => () => {
    const f$p = f();
    const a$p = a();
    return applicativeEffect.pure(f$p(a$p))();
  },
  Functor0: () => functorEffect
};
var applicativeEffect = { pure: pureE, Apply0: () => applyEffect };
var functorEffect = {
  map: (f) => (a) => () => {
    const a$p = a();
    return f(a$p);
  }
};

// output-es/Data.Array.ST/foreign.js
function newSTArray() {
  return [];
}
var pushAll = function(as) {
  return function(xs) {
    return function() {
      return xs.push.apply(xs, as);
    };
  };
};
var unsafeFreeze = function(xs) {
  return function() {
    return xs;
  };
};
function copyImpl(xs) {
  return function() {
    return xs.slice();
  };
}
var thaw = copyImpl;
var sortByImpl = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from + (to - from >> 1);
    if (mid - from > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
    if (to - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
    i = from;
    j = mid;
    k = from;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare2) {
    return function(fromOrdering) {
      return function(xs) {
        return function() {
          if (xs.length < 2)
            return xs;
          mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
          return xs;
        };
      };
    };
  };
}();

// output-es/Data.Array.ST/index.js
var withArray = (f) => (xs) => {
  const $2 = thaw(xs);
  return () => {
    const result = $2();
    f(result)();
    return unsafeFreeze(result)();
  };
};

// output-es/Data.Array.ST.Iterator/index.js
var $Iterator = (_1, _2) => ({ tag: "Iterator", _1, _2 });
var pushWhile = (p) => (iter) => (array) => () => {
  const $$break = { value: false };
  return whileST(() => {
    const $4 = $$break.value;
    return !$4;
  })(() => {
    const i = iter._2.value;
    const mx = iter._1(i);
    if (mx.tag === "Just") {
      if (p(mx._1)) {
        pushAll([mx._1])(array)();
        iter._2.value;
        const $8 = iter._2.value;
        iter._2.value = $8 + 1 | 0;
        return unit;
      }
      $$break.value = true;
      return unit;
    }
    $$break.value = true;
    return unit;
  })();
};
var iterate = (iter) => (f) => () => {
  const $$break = { value: false };
  return whileST(() => {
    const $3 = $$break.value;
    return !$3;
  })(() => {
    const i = iter._2.value;
    const $4 = iter._2.value;
    iter._2.value = $4 + 1 | 0;
    const mx = iter._1(i);
    if (mx.tag === "Just") {
      return f(mx._1)();
    }
    if (mx.tag === "Nothing") {
      $$break.value = true;
      return unit;
    }
    fail();
  })();
};

// output-es/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init) {
    return function(xs) {
      var acc = init;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init) {
    return function(xs) {
      var acc = init;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output-es/Data.Foldable/index.js
var traverse_ = (dictApplicative) => {
  const $1 = dictApplicative.Apply0();
  const map = $1.Functor0().map;
  return (dictFoldable) => (f) => dictFoldable.foldr((x) => {
    const $6 = f(x);
    return (b) => $1.apply(map((v) => identity)($6))(b);
  })(dictApplicative.pure(unit));
};
var for_ = (dictApplicative) => {
  const traverse_1 = traverse_(dictApplicative);
  return (dictFoldable) => {
    const $3 = traverse_1(dictFoldable);
    return (b) => (a) => $3(a)(b);
  };
};
var foldableMaybe = {
  foldr: (v) => (z) => (v1) => {
    if (v1.tag === "Nothing") {
      return z;
    }
    if (v1.tag === "Just") {
      return v(v1._1)(z);
    }
    fail();
  },
  foldl: (v) => (z) => (v1) => {
    if (v1.tag === "Nothing") {
      return z;
    }
    if (v1.tag === "Just") {
      return v(z)(v1._1);
    }
    fail();
  },
  foldMap: (dictMonoid) => (v) => (v1) => {
    if (v1.tag === "Nothing") {
      return dictMonoid.mempty;
    }
    if (v1.tag === "Just") {
      return v(v1._1);
    }
    fail();
  }
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: (dictMonoid) => {
    const append = dictMonoid.Semigroup0().append;
    return (f) => foldableArray.foldr((x) => (acc) => append(f(x))(acc))(dictMonoid.mempty);
  }
};

// output-es/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqIntImpl = refEq;
var eqStringImpl = refEq;
var eqArrayImpl = function(f) {
  return function(xs) {
    return function(ys) {
      if (xs.length !== ys.length)
        return false;
      for (var i = 0; i < xs.length; i++) {
        if (!f(xs[i])(ys[i]))
          return false;
      }
      return true;
    };
  };
};

// output-es/Data.Eq/index.js
var eqString = { eq: eqStringImpl };
var eqInt = { eq: eqIntImpl };

// output-es/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq2) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq2 : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;
var ordStringImpl = unsafeCompareImpl;
var ordArrayImpl = function(f) {
  return function(xs) {
    return function(ys) {
      var i = 0;
      var xlen = xs.length;
      var ylen = ys.length;
      while (i < xlen && i < ylen) {
        var x = xs[i];
        var y = ys[i];
        var o = f(x)(y);
        if (o !== 0) {
          return o;
        }
        i++;
      }
      if (xlen === ylen) {
        return 0;
      } else if (xlen > ylen) {
        return -1;
      } else {
        return 1;
      }
    };
  };
};

// output-es/Data.Ord/index.js
var ordString = { compare: /* @__PURE__ */ ordStringImpl(LT)(EQ)(GT), Eq0: () => eqString };
var ordInt = { compare: /* @__PURE__ */ ordIntImpl(LT)(EQ)(GT), Eq0: () => eqInt };
var ordArray = (dictOrd) => {
  const eqArray = { eq: eqArrayImpl(dictOrd.Eq0().eq) };
  return {
    compare: (xs) => (ys) => ordInt.compare(0)(ordArrayImpl((x) => (y) => {
      const v = dictOrd.compare(x)(y);
      if (v.tag === "EQ") {
        return 0;
      }
      if (v.tag === "LT") {
        return 1;
      }
      if (v.tag === "GT") {
        return -1;
      }
      fail();
    })(xs)(ys)),
    Eq0: () => eqArray
  };
};

// output-es/Data.Tuple/index.js
var $Tuple = (_1, _2) => ({ tag: "Tuple", _1, _2 });
var Tuple = (value0) => (value1) => $Tuple(value0, value1);
var snd = (v) => v._2;
var fst = (v) => v._1;

// output-es/Data.Bifunctor/index.js
var identity3 = (x) => x;
var bifunctorEither = {
  bimap: (v) => (v1) => (v2) => {
    if (v2.tag === "Left") {
      return $Either("Left", v(v2._1));
    }
    if (v2.tag === "Right") {
      return $Either("Right", v1(v2._1));
    }
    fail();
  }
};

// output-es/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat22(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply) {
    return function(map) {
      return function(pure) {
        return function(f) {
          return function(array) {
            function go(bot, top) {
              switch (top - bot) {
                case 0:
                  return pure([]);
                case 1:
                  return map(array1)(f(array[bot]));
                case 2:
                  return apply(map(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply(apply(map(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top - bot) / 4) * 2;
                  return apply(map(concat22)(go(bot, pivot)))(go(pivot, top));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output-es/Data.Array/foreign.js
var range = function(start) {
  return function(end) {
    var step = start > end ? -1 : 1;
    var result = new Array(step * (end - start) + 1);
    var i = start, n = 0;
    while (i !== end) {
      result[n++] = i;
      i += step;
    }
    result[n] = i;
    return result;
  };
};
var replicateFill = function(count) {
  return function(value) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value);
  };
};
var replicatePolyfill = function(count) {
  return function(value) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value;
    }
    return result;
  };
};
var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons2(head, tail) {
    this.head = head;
    this.tail = tail;
  }
  var emptyList = {};
  function curryCons(head) {
    return function(tail) {
      return new Cons2(head, tail);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr) {
    return function(xs) {
      return listToArray(foldr(curryCons)(emptyList)(xs));
    };
  };
}();
var indexImpl = function(just) {
  return function(nothing) {
    return function(xs) {
      return function(i) {
        return i < 0 || i >= xs.length ? nothing : just(xs[i]);
      };
    };
  };
};
var findMapImpl = function(nothing) {
  return function(isJust2) {
    return function(f) {
      return function(xs) {
        for (var i = 0; i < xs.length; i++) {
          var result = f(xs[i]);
          if (isJust2(result))
            return result;
        }
        return nothing;
      };
    };
  };
};
var findIndexImpl = function(just) {
  return function(nothing) {
    return function(f) {
      return function(xs) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (f(xs[i]))
            return just(i);
        }
        return nothing;
      };
    };
  };
};
var filter = function(f) {
  return function(xs) {
    return xs.filter(f);
  };
};
var sortByImpl2 = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from + (to - from >> 1);
    if (mid - from > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
    if (to - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
    i = from;
    j = mid;
    k = from;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare2) {
    return function(fromOrdering) {
      return function(xs) {
        var out;
        if (xs.length < 2)
          return xs;
        out = xs.slice(0);
        mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
        return out;
      };
    };
  };
}();
var slice = function(s) {
  return function(e) {
    return function(l) {
      return l.slice(s, e);
    };
  };
};
var zipWith = function(f) {
  return function(xs) {
    return function(ys) {
      var l = xs.length < ys.length ? xs.length : ys.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(xs[i])(ys[i]);
      }
      return result;
    };
  };
};

// output-es/Data.Array/index.js
var intercalate1 = (dictMonoid) => {
  const append = dictMonoid.Semigroup0().append;
  return (sep2) => (xs) => foldlArray((v) => (x) => {
    if (v.init) {
      return { init: false, acc: x };
    }
    return { init: false, acc: append(v.acc)(append(sep2)(x)) };
  })({ init: true, acc: dictMonoid.mempty })(xs).acc;
};
var zip = /* @__PURE__ */ zipWith(Tuple);
var sortBy = (comp) => sortByImpl2(comp)((v) => {
  if (v.tag === "GT") {
    return 1;
  }
  if (v.tag === "EQ") {
    return 0;
  }
  if (v.tag === "LT") {
    return -1;
  }
  fail();
});
var intersperse = (a) => (arr) => {
  const v = arr.length;
  if (v < 2) {
    return arr;
  }
  return run(bind_(() => {
    const out = newSTArray();
    pushAll([arr[0]])(out)();
    forST(1)(v)((idx) => {
      const $6 = pushAll([a])(out);
      return () => {
        $6();
        pushAll([arr[idx]])(out)();
        return unit;
      };
    })();
    return out;
  })(unsafeFreeze));
};
var index = /* @__PURE__ */ indexImpl(Just)(Nothing);
var groupBy = (op) => (xs) => run(() => {
  const result = newSTArray();
  const $3 = { value: 0 };
  const iter = $Iterator((v) => index(xs)(v), $3);
  iterate(iter)((x) => () => {
    const sub1 = newSTArray();
    pushAll([x])(sub1)();
    pushWhile(op(x))(iter)(sub1)();
    const grp = unsafeFreeze(sub1)();
    pushAll([grp])(result)();
    return unit;
  })();
  return unsafeFreeze(result)();
});
var findMap = /* @__PURE__ */ findMapImpl(Nothing)(isJust);
var findIndex = /* @__PURE__ */ findIndexImpl(Just)(Nothing);
var elem = (dictEq) => (a) => (arr) => {
  const $3 = findIndex((v) => dictEq.eq(v)(a))(arr);
  if ($3.tag === "Nothing") {
    return false;
  }
  if ($3.tag === "Just") {
    return true;
  }
  fail();
};
var drop = (n) => (xs) => {
  if (n < 1) {
    return xs;
  }
  return slice(n)(xs.length)(xs);
};

// output-es/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust3) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var tuple = f(value);
              result.push(fst2(tuple));
              var maybe = snd2(tuple);
              if (isNothing2(maybe))
                return result;
              value = fromJust3(maybe);
            }
          };
        };
      };
    };
  };
};

// output-es/Data.Unfoldable1/index.js
var fromJust = (v) => {
  if (v.tag === "Just") {
    return v._1;
  }
  fail();
};
var unfoldable1Array = { unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust)(fst)(snd) };

// output-es/Data.Array.NonEmpty.Internal/foreign.js
var foldr1Impl = function(f) {
  return function(xs) {
    var acc = xs[xs.length - 1];
    for (var i = xs.length - 2; i >= 0; i--) {
      acc = f(xs[i])(acc);
    }
    return acc;
  };
};
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head, tail) {
    this.head = head;
    this.tail = tail;
  };
  function finalCell(head) {
    return new ConsCell(head, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply) {
    return function(map) {
      return function(f) {
        var buildFrom = function(x, ys) {
          return apply(map(consList)(f(x)))(ys);
        };
        var go = function(acc, currentLen, xs) {
          if (currentLen === 0) {
            return acc;
          } else {
            var last = xs[currentLen - 1];
            return new Cont(function() {
              var built = go(buildFrom(last, acc), currentLen - 1, xs);
              return built;
            });
          }
        };
        return function(array) {
          var acc = map(finalCell)(f(array[array.length - 1]));
          var result = go(acc, array.length - 1, array);
          while (result instanceof Cont) {
            result = result.fn();
          }
          return map(listToArray)(result);
        };
      };
    };
  };
}();

// output-es/Data.List.Types/index.js
var $List = (tag, _1, _2) => ({ tag, _1, _2 });
var Nil = /* @__PURE__ */ $List("Nil");
var Cons = (value0) => (value1) => $List("Cons", value0, value1);
var listMap = (f) => {
  const chunkedRevMap = (chunkedRevMap$a0$copy) => (chunkedRevMap$a1$copy) => {
    let chunkedRevMap$a0 = chunkedRevMap$a0$copy, chunkedRevMap$a1 = chunkedRevMap$a1$copy, chunkedRevMap$c = true, chunkedRevMap$r;
    while (chunkedRevMap$c) {
      const chunksAcc = chunkedRevMap$a0, v = chunkedRevMap$a1;
      const $4 = (chunksAcc1, xs) => {
        const reverseUnrolledMap = (reverseUnrolledMap$a0$copy) => (reverseUnrolledMap$a1$copy) => {
          let reverseUnrolledMap$a0 = reverseUnrolledMap$a0$copy, reverseUnrolledMap$a1 = reverseUnrolledMap$a1$copy, reverseUnrolledMap$c = true, reverseUnrolledMap$r;
          while (reverseUnrolledMap$c) {
            const v1 = reverseUnrolledMap$a0, acc = reverseUnrolledMap$a1;
            if (v1.tag === "Cons") {
              if (v1._1.tag === "Cons") {
                if (v1._1._2.tag === "Cons") {
                  if (v1._1._2._2.tag === "Cons") {
                    reverseUnrolledMap$a0 = v1._2;
                    reverseUnrolledMap$a1 = $List("Cons", f(v1._1._1), $List("Cons", f(v1._1._2._1), $List("Cons", f(v1._1._2._2._1), acc)));
                    continue;
                  }
                  reverseUnrolledMap$c = false;
                  reverseUnrolledMap$r = acc;
                  continue;
                }
                reverseUnrolledMap$c = false;
                reverseUnrolledMap$r = acc;
                continue;
              }
              reverseUnrolledMap$c = false;
              reverseUnrolledMap$r = acc;
              continue;
            }
            reverseUnrolledMap$c = false;
            reverseUnrolledMap$r = acc;
            continue;
          }
          ;
          return reverseUnrolledMap$r;
        };
        return reverseUnrolledMap(chunksAcc1)((() => {
          if (xs.tag === "Cons") {
            if (xs._2.tag === "Cons") {
              if (xs._2._2.tag === "Nil") {
                return $List("Cons", f(xs._1), $List("Cons", f(xs._2._1), Nil));
              }
              return Nil;
            }
            if (xs._2.tag === "Nil") {
              return $List("Cons", f(xs._1), Nil);
            }
            return Nil;
          }
          return Nil;
        })());
      };
      if (v.tag === "Cons") {
        if (v._2.tag === "Cons") {
          if (v._2._2.tag === "Cons") {
            chunkedRevMap$a0 = $List("Cons", v, chunksAcc);
            chunkedRevMap$a1 = v._2._2._2;
            continue;
          }
          chunkedRevMap$c = false;
          chunkedRevMap$r = $4(chunksAcc, v);
          continue;
        }
        chunkedRevMap$c = false;
        chunkedRevMap$r = $4(chunksAcc, v);
        continue;
      }
      chunkedRevMap$c = false;
      chunkedRevMap$r = $4(chunksAcc, v);
      continue;
    }
    ;
    return chunkedRevMap$r;
  };
  return chunkedRevMap(Nil);
};
var foldableList = {
  foldr: (f) => (b) => {
    const $2 = foldableList.foldl((b$1) => (a) => f(a)(b$1))(b);
    const $3 = (() => {
      const go = (go$a0$copy) => (go$a1$copy) => {
        let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
        while (go$c) {
          const acc = go$a0, v = go$a1;
          if (v.tag === "Nil") {
            go$c = false;
            go$r = acc;
            continue;
          }
          if (v.tag === "Cons") {
            go$a0 = $List("Cons", v._1, acc);
            go$a1 = v._2;
            continue;
          }
          fail();
        }
        ;
        return go$r;
      };
      return go(Nil);
    })();
    return (x) => $2($3(x));
  },
  foldl: (f) => {
    const go = (go$a0$copy) => (go$a1$copy) => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const b = go$a0, v = go$a1;
        if (v.tag === "Nil") {
          go$c = false;
          go$r = b;
          continue;
        }
        if (v.tag === "Cons") {
          go$a0 = f(b)(v._1);
          go$a1 = v._2;
          continue;
        }
        fail();
      }
      ;
      return go$r;
    };
    return go;
  },
  foldMap: (dictMonoid) => {
    const append2 = dictMonoid.Semigroup0().append;
    return (f) => foldableList.foldl((acc) => {
      const $4 = append2(acc);
      return (x) => $4(f(x));
    })(dictMonoid.mempty);
  }
};

// output-es/Data.List/index.js
var toUnfoldable = (dictUnfoldable) => dictUnfoldable.unfoldr((xs) => {
  if (xs.tag === "Nil") {
    return Nothing;
  }
  if (xs.tag === "Cons") {
    return $Maybe("Just", $Tuple(xs._1, xs._2));
  }
  fail();
});
var reverse2 = /* @__PURE__ */ (() => {
  const go = (go$a0$copy) => (go$a1$copy) => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const acc = go$a0, v = go$a1;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = acc;
        continue;
      }
      if (v.tag === "Cons") {
        go$a0 = $List("Cons", v._1, acc);
        go$a1 = v._2;
        continue;
      }
      fail();
    }
    ;
    return go$r;
  };
  return go(Nil);
})();

// output-es/Data.EuclideanRing/foreign.js
var intDiv = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
  };
};
var intMod = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};

// output-es/Data.Monoid/index.js
var monoidString = { mempty: "", Semigroup0: () => semigroupString };
var monoidArray = { mempty: [], Semigroup0: () => semigroupArray };
var power = (dictMonoid) => {
  const append = dictMonoid.Semigroup0().append;
  return (x) => {
    const go = (p) => {
      if (p <= 0) {
        return dictMonoid.mempty;
      }
      if (p === 1) {
        return x;
      }
      if (intMod(p)(2) === 0) {
        const x$p2 = go(intDiv(p)(2));
        return append(x$p2)(x$p2);
      }
      const x$p = go(intDiv(p)(2));
      return append(x$p)(append(x$p)(x));
    };
    return go;
  };
};

// output-es/Data.Bounded/foreign.js
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output-es/Data.Enum/foreign.js
function toCharCode(c) {
  return c.charCodeAt(0);
}
function fromCharCode(c) {
  return String.fromCharCode(c);
}

// output-es/Data.String.Unsafe/foreign.js
var charAt = function(i) {
  return function(s) {
    if (i >= 0 && i < s.length)
      return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};

// output-es/Data.String.CodeUnits/foreign.js
var singleton = function(c) {
  return c;
};
var length2 = function(s) {
  return s.length;
};
var take = function(n) {
  return function(s) {
    return s.substr(0, n);
  };
};
var drop2 = function(n) {
  return function(s) {
    return s.substring(n);
  };
};
var splitAt = function(i) {
  return function(s) {
    return { before: s.substring(0, i), after: s.substring(i) };
  };
};

// output-es/Data.String.CodeUnits/index.js
var stripPrefix = (v) => (str) => {
  const v1 = splitAt(length2(v))(str);
  if (v1.before === v) {
    return $Maybe("Just", v1.after);
  }
  return Nothing;
};

// output-es/Data.String.Common/foreign.js
var split = function(sep2) {
  return function(s) {
    return s.split(sep2);
  };
};
var joinWith = function(s) {
  return function(xs) {
    return xs.join(s);
  };
};

// output-es/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust3) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var maybe = f(value);
              if (isNothing2(maybe))
                return result;
              var tuple = fromJust3(maybe);
              result.push(fst2(tuple));
              value = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output-es/Data.Unfoldable/index.js
var fromJust2 = (v) => {
  if (v.tag === "Just") {
    return v._1;
  }
  fail();
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust2)(fst)(snd),
  Unfoldable10: () => unfoldable1Array
};

// output-es/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";
var _unsafeCodePointAt0 = function(fallback) {
  return hasCodePointAt ? function(str) {
    return str.codePointAt(0);
  } : fallback;
};
var _singleton = function(fallback) {
  return hasFromCodePoint ? String.fromCodePoint : fallback;
};
var _take = function(fallback) {
  return function(n) {
    if (hasStringIterator) {
      return function(str) {
        var accum = "";
        var iter = str[Symbol.iterator]();
        for (var i = 0; i < n; ++i) {
          var o = iter.next();
          if (o.done)
            return accum;
          accum += o.value;
        }
        return accum;
      };
    }
    return fallback(n);
  };
};
var _toCodePointArray = function(fallback) {
  return function(unsafeCodePointAt02) {
    if (hasArrayFrom) {
      return function(str) {
        return Array.from(str, unsafeCodePointAt02);
      };
    }
    return fallback;
  };
};

// output-es/Data.String.CodePoints/index.js
var uncons = (s) => {
  const v = length2(s);
  if (v === 0) {
    return Nothing;
  }
  if (v === 1) {
    return $Maybe("Just", { head: toCharCode(charAt(0)(s)), tail: "" });
  }
  const cu1 = toCharCode(charAt(1)(s));
  const cu0 = toCharCode(charAt(0)(s));
  if (55296 <= cu0 && cu0 <= 56319 && (56320 <= cu1 && cu1 <= 57343)) {
    return $Maybe("Just", { head: (((cu0 - 55296 | 0) * 1024 | 0) + (cu1 - 56320 | 0) | 0) + 65536 | 0, tail: drop2(2)(s) });
  }
  return $Maybe("Just", { head: cu0, tail: drop2(1)(s) });
};
var unconsButWithTuple = (s) => {
  const $1 = uncons(s);
  if ($1.tag === "Just") {
    return $Maybe("Just", $Tuple($1._1.head, $1._1.tail));
  }
  return Nothing;
};
var toCodePointArrayFallback = (s) => unfoldableArray.unfoldr(unconsButWithTuple)(s);
var unsafeCodePointAt0Fallback = (s) => {
  const cu0 = toCharCode(charAt(0)(s));
  if (55296 <= cu0 && cu0 <= 56319 && length2(s) > 1) {
    const cu1 = toCharCode(charAt(1)(s));
    if (56320 <= cu1 && cu1 <= 57343) {
      return (((cu0 - 55296 | 0) * 1024 | 0) + (cu1 - 56320 | 0) | 0) + 65536 | 0;
    }
    return cu0;
  }
  return cu0;
};
var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
var fromCharCode2 = (x) => singleton((() => {
  if (x >= 0 && x <= 65535) {
    return fromCharCode(x);
  }
  if (x < 0) {
    return "\0";
  }
  return "\uFFFF";
})());
var singletonFallback = (v) => {
  if (v <= 65535) {
    return fromCharCode2(v);
  }
  return fromCharCode2(intDiv(v - 65536 | 0)(1024) + 55296 | 0) + fromCharCode2(intMod(v - 65536 | 0)(1024) + 56320 | 0);
};
var singleton2 = /* @__PURE__ */ _singleton(singletonFallback);
var takeFallback = (n) => (v) => {
  if (n < 1) {
    return "";
  }
  const v1 = uncons(v);
  if (v1.tag === "Just") {
    return singleton2(v1._1.head) + takeFallback(n - 1 | 0)(v1._1.tail);
  }
  return v;
};
var take2 = /* @__PURE__ */ _take(takeFallback);

// output-es/Record.Builder/foreign.js
function unsafeInsert(l) {
  return function(a) {
    return function(rec) {
      rec[l] = a;
      return rec;
    };
  };
}

// output-es/Record.Builder/index.js
var buildFromScratch = (a) => a({});

// output-es/ArgParse.Basic/index.js
var $ArgError = (_1, _2) => ({ tag: "ArgError", _1, _2 });
var $ArgErrorMsg = (tag, _1) => ({ tag, _1 });
var $ArgHelp = (tag, _1, _2, _3) => ({ tag, _1, _2, _3 });
var $ArgParser = (_1, _2) => ({ tag: "ArgParser", _1, _2 });
var $ArgResult = (tag, _1, _2) => ({ tag, _1, _2 });
var $HelpClass = (tag, _1) => ({ tag, _1 });
var $HelpFmt = (tag, _1) => ({ tag, _1 });
var intercalate = /* @__PURE__ */ intercalate1(monoidString);
var power2 = /* @__PURE__ */ power(monoidString);
var max2 = (x) => (y) => {
  const v = ordInt.compare(x)(y);
  if (v.tag === "LT") {
    return y;
  }
  if (v.tag === "EQ") {
    return x;
  }
  if (v.tag === "GT") {
    return x;
  }
  fail();
};
var eq = /* @__PURE__ */ eqArrayImpl(eqStringImpl);
var compare = /* @__PURE__ */ (() => ordArray(ordString).compare)();
var intercalate12 = /* @__PURE__ */ intercalate1(monoidArray);
var fromFoldable = /* @__PURE__ */ foldrArray(Cons)(Nil);
var identity9 = (x) => x;
var guard2 = /* @__PURE__ */ guard(alternativeMaybe);
var ExpectedFlag = /* @__PURE__ */ $ArgErrorMsg("ExpectedFlag");
var ExpectedArgValue = /* @__PURE__ */ $ArgErrorMsg("ExpectedArgValue");
var ExpectedArg = /* @__PURE__ */ $ArgErrorMsg("ExpectedArg");
var DuplicateArg = /* @__PURE__ */ $ArgErrorMsg("DuplicateArg");
var ShowHelp = /* @__PURE__ */ $ArgErrorMsg("ShowHelp");
var ArgError = (value0) => (value1) => $ArgError(value0, value1);
var ArgFail = /* @__PURE__ */ $ArgResult("ArgFail");
var unformat = (doc) => (unf) => (v) => {
  const go = (v1) => ({
    step: (stk) => (args) => {
      const v2 = v1.step(stk)(args);
      if (v2.tag === "ArgHalt") {
        if (v2._1._1.tag === "Cons") {
          return $ArgResult("ArgHalt", $ArgError($List("Cons", $ArgHelp("HelpFormat", doc, v._1), v2._1._1._2), v2._1._2));
        }
        return $ArgResult("ArgHalt", v2._1);
      }
      if (v2.tag === "ArgMatch") {
        return $ArgResult("ArgMatch", go(v2._1), v2._2);
      }
      if (v2.tag === "ArgFail") {
        return ArgFail;
      }
      fail();
    },
    done: (stk) => bindEither.bind(v1.done($List("Cons", $ArgHelp("HelpFormat", doc, v._1), stk)))((value) => {
      const $7 = ArgError($List("Cons", $ArgHelp("HelpFormat", doc, v._1), stk));
      return bifunctorEither.bimap((x) => $7($ArgErrorMsg("UnformatFailed", x)))(identity3)(unf(value));
    }),
    saturated: v1.saturated
  });
  return $ArgParser($ArgHelp("HelpFormat", doc, v._1), go(v._2));
};
var separated = (doc) => (pat) => unformat("[" + (doc + (pat + "...]")))((() => {
  const $2 = split(pat);
  return (x) => $Either("Right", $2(x));
})());
var semigroupHelp = {
  append: (v) => (v1) => {
    if (v.tag === "HelpArgs") {
      if (v1.tag === "HelpArgs") {
        return $ArgHelp("HelpArgs", concatArray(v._1)(v1._1));
      }
      return $ArgHelp("HelpArgs", run(withArray(pushAll([v1]))(v._1)));
    }
    if (v1.tag === "HelpArgs") {
      return $ArgHelp("HelpArgs", concatArray([v])(v1._1));
    }
    return $ArgHelp("HelpArgs", [v, v1]);
  }
};
var printHelpTable$p = (stk) => (v) => {
  if (v.tag === "HelpFlag") {
    const names = intercalate(",")(v._1);
    if (stk.tag === "Cons") {
      if (stk._1.tag === "HelpFormat") {
        return [$Tuple($HelpClass("IsFlag", v._1), [$HelpFmt("Text", names + (" " + stk._1._1)), $HelpFmt("Text", v._2)])];
      }
      return [$Tuple($HelpClass("IsFlag", v._1), [$HelpFmt("Text", names), $HelpFmt("Text", v._2)])];
    }
    return [$Tuple($HelpClass("IsFlag", v._1), [$HelpFmt("Text", names), $HelpFmt("Text", v._2)])];
  }
  if (v.tag === "HelpAny") {
    if (stk.tag === "Cons") {
      if (stk._1.tag === "HelpFormat") {
        return [$Tuple($HelpClass("IsAny", stk._1._1), [$HelpFmt("Text", stk._1._1), $HelpFmt("Text", v._1)])];
      }
      return [$Tuple($HelpClass("IsAny", "ANY"), [$HelpFmt("Text", "ANY"), $HelpFmt("Text", v._1)])];
    }
    return [$Tuple($HelpClass("IsAny", "ANY"), [$HelpFmt("Text", "ANY"), $HelpFmt("Text", v._1)])];
  }
  if (v.tag === "HelpRest") {
    return [$Tuple($HelpClass("IsAny", "--"), [$HelpFmt("Text", "--"), $HelpFmt("Text", v._1)])];
  }
  if (v.tag === "HelpCommand") {
    return [$Tuple($HelpClass("IsCommand", v._1), [$HelpFmt("Text", intercalate(",")(v._1)), $HelpFmt("Text", v._2)])];
  }
  if (v.tag === "HelpFormat") {
    return printHelpTable$p($List("Cons", $ArgHelp("HelpFormat", v._1, v._2), stk))(v._2);
  }
  if (v.tag === "HelpChoose") {
    return arrayBind(v._2)(printHelpTable$p(stk));
  }
  if (v.tag === "HelpArgs") {
    return arrayBind(v._1)(printHelpTable$p(stk));
  }
  fail();
};
var parserHelp = (v) => v._1;
var parseArgs$p = (parseArgs$p$a0$copy) => (parseArgs$p$a1$copy) => (parseArgs$p$a2$copy) => {
  let parseArgs$p$a0 = parseArgs$p$a0$copy, parseArgs$p$a1 = parseArgs$p$a1$copy, parseArgs$p$a2 = parseArgs$p$a2$copy, parseArgs$p$c = true, parseArgs$p$r;
  while (parseArgs$p$c) {
    const v = parseArgs$p$a0, stk = parseArgs$p$a1, args = parseArgs$p$a2;
    const v1 = v.step(stk)(args);
    if (v1.tag === "ArgHalt") {
      parseArgs$p$c = false;
      parseArgs$p$r = $Either("Left", v1._1);
      continue;
    }
    if (v1.tag === "ArgMatch") {
      parseArgs$p$a0 = v1._1;
      parseArgs$p$a1 = stk;
      parseArgs$p$a2 = v1._2;
      continue;
    }
    if (v1.tag === "ArgFail") {
      if (args.tag === "Nil") {
        parseArgs$p$c = false;
        parseArgs$p$r = v.done(stk);
        continue;
      }
      if (args.tag === "Cons") {
        parseArgs$p$c = false;
        parseArgs$p$r = $Either("Left", $ArgError(stk, $ArgErrorMsg("UnknownArg", args._1)));
        continue;
      }
      fail();
    }
    fail();
  }
  ;
  return parseArgs$p$r;
};
var parseArgs = (dictFoldable) => {
  const fromFoldable1 = dictFoldable.foldr(Cons)(Nil);
  return (cmd) => (doc) => (v) => (x) => parseArgs$p(v._2)($List("Cons", $ArgHelp("HelpCommand", [cmd], doc, v._1), Nil))(fromFoldable1(x));
};
var joinColumns = (width) => (sep2) => (leftLines) => (rightLines) => {
  const go = (left) => (right) => {
    const len = toCodePointArray(left).length;
    if (len < width) {
      return left + (power2(" ")(width - len | 0) + (sep2 + right));
    }
    if (len > width) {
      return take2(width)(left) + (sep2 + right);
    }
    return left + (sep2 + right);
  };
  const diff = leftLines.length - rightLines.length | 0;
  if (diff < 0) {
    return zipWith(go)(concatArray(leftLines)(replicate((() => {
      if (diff >= 0) {
        return diff;
      }
      return -diff;
    })())("")))(rightLines);
  }
  return zipWith(go)(leftLines)(concatArray(rightLines)(replicate(diff)("")));
};
var renderDocLines = (ind) => (v) => {
  if (v.tag === "Paras") {
    return arrayBind(intersperse([""])(filter((x) => x.length !== 0)(arrayMap(renderDocLines(ind))(v._1))))(identity2);
  }
  if (v.tag === "Lines") {
    return arrayBind(v._1)(renderDocLines(ind));
  }
  if (v.tag === "Text") {
    return arrayMap(($2) => ind + $2)(split("\n")(v._1));
  }
  if (v.tag === "Indent") {
    return renderDocLines(ind + "    ")(v._1);
  }
  if (v.tag === "Table") {
    return printTableLines(ind)(v._1);
  }
  fail();
};
var printTableLines = (ind) => (rows) => {
  const rows$p = arrayMap(arrayMap(renderDocLines("")))(rows);
  const colWidths = arrayMap((ix) => foldrArray((() => {
    const $4 = foldrArray((x) => max2(toCodePointArray(x).length))(0);
    return (x) => {
      const $6 = index(x)(ix);
      return max2($4((() => {
        if ($6.tag === "Nothing") {
          return [];
        }
        if ($6.tag === "Just") {
          return $6._1;
        }
        fail();
      })()));
    };
  })())(0)(rows$p))(range(0)(foldrArray((x) => max2(x.length))(0)(rows) - 1 | 0));
  return arrayBind(rows$p)((cols) => {
    const $5 = zip(colWidths)(cols);
    if ($5.length > 0) {
      return arrayMap(($6) => ind + $6)(foldr1Impl((v1) => (v2) => $Tuple(
        v1._1 + v2._1 | 0,
        joinColumns(v1._1)("    ")(v1._2)(v2._2)
      ))($5)._2);
    }
    return [];
  });
};
var renderDoc = /* @__PURE__ */ (() => {
  const $0 = intercalate("\n");
  return (x) => $0(renderDocLines("")(x));
})();
var functorArgResult = {
  map: (f) => (m) => {
    if (m.tag === "ArgHalt") {
      return $ArgResult("ArgHalt", m._1);
    }
    if (m.tag === "ArgMatch") {
      return $ArgResult("ArgMatch", f(m._1), m._2);
    }
    if (m.tag === "ArgFail") {
      return ArgFail;
    }
    fail();
  }
};
var functorArgFold = {
  map: (f) => (m) => ({
    done: (x) => {
      const $3 = m.done(x);
      if ($3.tag === "Left") {
        return $Either("Left", $3._1);
      }
      if ($3.tag === "Right") {
        return $Either("Right", f($3._1));
      }
      fail();
    },
    step: (() => {
      const $2 = semigroupoidFn.compose(functorArgResult.map(functorArgFold.map(f)));
      return (x) => $2(m.step(x));
    })(),
    saturated: m.saturated
  })
};
var functorArgParser = { map: (f) => (m) => $ArgParser(m._1, functorArgFold.map(f)(m._2)) };
var flag$p = (names) => (v) => {
  if (v.tag === "Cons") {
    if (elem(eqString)(v._1)(names)) {
      return $ArgResult("ArgMatch", unit, v._2);
    }
    return ArgFail;
  }
  return ArgFail;
};
var flagHelp = /* @__PURE__ */ (() => {
  const name2 = ["--help", "-h"];
  return $ArgParser(
    $ArgHelp("HelpFlag", name2, "Show this help message."),
    {
      step: (stk) => (args) => {
        const v = flag$p(name2)(args);
        if (v.tag === "ArgHalt") {
          return $ArgResult("ArgHalt", v._1);
        }
        if (v.tag === "ArgFail") {
          return ArgFail;
        }
        if (v.tag === "ArgMatch") {
          return $ArgResult("ArgHalt", $ArgError(stk, ShowHelp));
        }
        fail();
      },
      done: (v) => $Either("Right", unit),
      saturated: true
    }
  );
})();
var failDup = (help) => (errMsg) => (v) => ({
  step: (stk) => (args) => {
    const v1 = v.step(stk)(args);
    if (v1.tag === "ArgHalt") {
      return $ArgResult("ArgHalt", v1._1);
    }
    if (v1.tag === "ArgFail") {
      return ArgFail;
    }
    if (v1.tag === "ArgMatch") {
      return $ArgResult("ArgHalt", $ArgError($List("Cons", help, stk), errMsg));
    }
    fail();
  },
  done: v.done,
  saturated: true
});
var flag = (name2) => (doc) => {
  const step = (v) => {
    const $4 = functorArgResult.map((value) => failDup($ArgHelp("HelpFlag", name2, doc))(DuplicateArg)({ step, done: (v$1) => $Either("Right", value), saturated: true }));
    return (x) => $4(flag$p(name2)(x));
  };
  return $ArgParser(
    $ArgHelp("HelpFlag", name2, doc),
    { step, done: (stk) => $Either("Left", $ArgError($List("Cons", $ArgHelp("HelpFlag", name2, doc), stk), ExpectedFlag)), saturated: false }
  );
};
var many = (v) => {
  const go2 = (acc) => (stk) => (v1) => {
    if (v1.saturated) {
      const v2 = v1.done(stk);
      if (v2.tag === "Left") {
        return { step: (v$1) => (v1$1) => $ArgResult("ArgHalt", v2._1), done: (v$1) => $Either("Left", v2._1), saturated: true };
      }
      if (v2.tag === "Right") {
        return go1($List("Cons", v2._1, acc))(false)(v._2);
      }
      fail();
    }
    return go1(acc)(true)(v1);
  };
  const go1 = (acc) => (parsing) => (v1) => ({
    step: (stk) => {
      const $6 = functorArgResult.map(go2(acc)(stk));
      const $7 = v1.step(stk);
      return (x) => $6($7(x));
    },
    done: (stk) => {
      if (parsing) {
        return bindEither.bind(v1.done(stk))((next) => $Either("Right", reverse2($List("Cons", next, acc))));
      }
      return $Either("Right", reverse2(acc));
    },
    saturated: false
  });
  return $ArgParser(v._1, go1(Nil)(false)(v._2));
};
var unfolded = (dictUnfoldable) => {
  const $1 = functorArgParser.map(toUnfoldable(dictUnfoldable));
  return (x) => $1(many(x));
};
var eqHelpClass = {
  eq: (x) => (y) => {
    if (x.tag === "IsFlag") {
      if (y.tag === "IsFlag") {
        return eq(x._1)(y._1);
      }
      return false;
    }
    if (x.tag === "IsAny") {
      if (y.tag === "IsAny") {
        return x._1 === y._1;
      }
      return false;
    }
    if (x.tag === "IsCommand") {
      if (y.tag === "IsCommand") {
        return eq(x._1)(y._1);
      }
      return false;
    }
    return false;
  }
};
var ordHelpClass = {
  compare: (x) => (y) => {
    if (x.tag === "IsFlag") {
      if (y.tag === "IsFlag") {
        return compare(x._1)(y._1);
      }
      return LT;
    }
    if (y.tag === "IsFlag") {
      return GT;
    }
    if (x.tag === "IsAny") {
      if (y.tag === "IsAny") {
        return ordString.compare(x._1)(y._1);
      }
      return LT;
    }
    if (y.tag === "IsAny") {
      return GT;
    }
    if (x.tag === "IsCommand") {
      if (y.tag === "IsCommand") {
        return compare(x._1)(y._1);
      }
      fail();
    }
    fail();
  },
  Eq0: () => eqHelpClass
};
var printHelpTable = (stk) => {
  const $1 = sortBy((x) => (y) => ordHelpClass.compare(x._1)(y._1));
  const $2 = groupBy((x) => (y) => {
    if (x._1.tag === "IsFlag") {
      return y._1.tag === "IsFlag";
    }
    if (x._1.tag === "IsAny") {
      return y._1.tag === "IsAny";
    }
    if (x._1.tag === "IsCommand") {
      return y._1.tag === "IsCommand";
    }
    return false;
  });
  const $3 = arrayMap(arrayMap(snd));
  const $4 = intercalate12([[$HelpFmt("Text", "")]]);
  return (x) => $4($3($2($1(printHelpTable$p(stk)(x)))));
};
var printHelp$p = (stk) => (v) => {
  if (v.tag === "HelpFormat") {
    return printHelp$p($List("Cons", $ArgHelp("HelpFormat", v._1, v._2), stk))(v._2);
  }
  if (v.tag === "HelpCommand") {
    return $HelpFmt(
      "Paras",
      [$HelpFmt("Lines", [$HelpFmt("Text", intercalate(",")(v._1)), $HelpFmt("Indent", $HelpFmt("Text", v._2))]), $HelpFmt("Indent", printHelp$p(stk)(v._3))]
    );
  }
  return $HelpFmt("Table", printHelpTable(stk)(v));
};
var printArgError = (v) => {
  const getCmd = (getCmd$a0$copy) => (getCmd$a1$copy) => (getCmd$a2$copy) => (getCmd$a3$copy) => {
    let getCmd$a0 = getCmd$a0$copy, getCmd$a1 = getCmd$a1$copy, getCmd$a2 = getCmd$a2$copy, getCmd$a3 = getCmd$a3$copy, getCmd$c = true, getCmd$r;
    while (getCmd$c) {
      const cmd = getCmd$a0, desc = getCmd$a1, help = getCmd$a2, v1 = getCmd$a3;
      if (v1.tag === "Nil") {
        getCmd$c = false;
        getCmd$r = { cmd, desc, help };
        continue;
      }
      if (v1.tag === "Cons") {
        if (v1._1.tag === "HelpCommand") {
          getCmd$a0 = $List("Cons", v1._1._1, cmd);
          getCmd$a1 = (() => {
            if (desc.tag === "Nothing") {
              return $Maybe("Just", v1._1._2);
            }
            return desc;
          })();
          getCmd$a2 = (() => {
            if (help.tag === "Nothing") {
              return $Maybe("Just", v1._1._3);
            }
            return help;
          })();
          getCmd$a3 = v1._2;
          continue;
        }
        if (v1._1.tag === "HelpFlag") {
          getCmd$a0 = $List("Cons", v1._1._1, cmd);
          getCmd$a1 = Nothing;
          getCmd$a2 = $Maybe("Just", $ArgHelp("HelpFlag", v1._1._1, v1._1._2));
          getCmd$a3 = v1._2;
          continue;
        }
        if (v1._1.tag === "HelpAny") {
          getCmd$a0 = cmd;
          getCmd$a1 = Nothing;
          getCmd$a2 = $Maybe("Just", $ArgHelp("HelpAny", v1._1._1));
          getCmd$a3 = v1._2;
          continue;
        }
        if (v1._1.tag === "HelpFormat") {
          getCmd$a0 = cmd;
          getCmd$a1 = desc;
          getCmd$a2 = help;
          getCmd$a3 = $List("Cons", v1._1._2, v1._2);
          continue;
        }
        getCmd$a0 = cmd;
        getCmd$a1 = desc;
        getCmd$a2 = help;
        getCmd$a3 = v1._2;
        continue;
      }
      fail();
    }
    ;
    return getCmd$r;
  };
  const printArgError$p = (err) => {
    const v1 = getCmd(Nil)(Nothing)(Nothing)(v._1);
    return $HelpFmt(
      "Lines",
      [
        $HelpFmt(
          "Text",
          (() => {
            const go = (go$a0$copy) => (go$a1$copy) => {
              let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
              while (go$c) {
                const b = go$a0, v$1 = go$a1;
                if (v$1.tag === "Nil") {
                  go$c = false;
                  go$r = b;
                  continue;
                }
                if (v$1.tag === "Cons") {
                  go$a0 = (() => {
                    if (b.init) {
                      return { init: false, acc: v$1._1 };
                    }
                    return { init: false, acc: b.acc + (" " + v$1._1) };
                  })();
                  go$a1 = v$1._2;
                  continue;
                }
                fail();
              }
              ;
              return go$r;
            };
            return go({ init: true, acc: "" })(listMap(intercalate(","))(v1.cmd)).acc;
          })()
        ),
        $HelpFmt(
          "Indent",
          $HelpFmt(
            "Paras",
            [
              err,
              (() => {
                if (v1.desc.tag === "Nothing") {
                  return $HelpFmt("Lines", []);
                }
                if (v1.desc.tag === "Just") {
                  return $HelpFmt("Text", v1.desc._1);
                }
                fail();
              })(),
              (() => {
                if (v1.help.tag === "Nothing") {
                  return $HelpFmt("Lines", []);
                }
                if (v1.help.tag === "Just") {
                  return printHelp$p(v._1)(v1.help._1);
                }
                fail();
              })()
            ]
          )
        )
      ]
    );
  };
  return renderDoc((() => {
    if (v._2.tag === "ExpectedFlag") {
      return printArgError$p($HelpFmt("Text", "Expected flag."));
    }
    if (v._2.tag === "ExpectedArgValue") {
      if (v._1.tag === "Cons") {
        if (v._1._1.tag === "HelpFormat") {
          return printArgError$p($HelpFmt("Text", "Expected " + (v._1._1._1 + ".")));
        }
        return printArgError$p($HelpFmt("Text", "Expected argument value."));
      }
      return printArgError$p($HelpFmt("Text", "Expected argument value."));
    }
    if (v._2.tag === "ExpectedArg") {
      if (v._1.tag === "Cons") {
        if (v._1._1.tag === "HelpFormat") {
          return printArgError$p($HelpFmt("Text", "Expected " + (v._1._1._1 + ".")));
        }
        if (v._1._1.tag === "HelpChoose") {
          return printArgError$p($HelpFmt("Text", "Expected " + (v._1._1._1 + ".")));
        }
        return printArgError$p($HelpFmt("Text", "Expected argument."));
      }
      return printArgError$p($HelpFmt("Text", "Expected argument."));
    }
    if (v._2.tag === "ExpectedRest") {
      return printArgError$p($HelpFmt("Text", "Expected rest arguments."));
    }
    if (v._2.tag === "DuplicateArg") {
      if (v._1.tag === "Cons") {
        if (v._1._1.tag === "HelpChoose") {
          return printArgError$p($HelpFmt("Text", "Duplicate " + (v._1._1._1 + ".")));
        }
        return printArgError$p($HelpFmt("Text", "Duplicate argument."));
      }
      return printArgError$p($HelpFmt("Text", "Duplicate argument."));
    }
    if (v._2.tag === "UnformatFailed") {
      return printArgError$p($HelpFmt("Text", v._2._1));
    }
    if (v._2.tag === "ShowHelp") {
      return printArgError$p($HelpFmt("Lines", []));
    }
    if (v._2.tag === "ShowInfo") {
      return $HelpFmt("Text", v._2._1);
    }
    if (v._2.tag === "UnknownArg") {
      return printArgError$p($HelpFmt("Lines", [$HelpFmt("Text", "Unexpected argument:"), $HelpFmt("Indent", $HelpFmt("Text", v._2._1))]));
    }
    fail();
  })());
};
var $$default = (value) => (v) => $ArgParser(
  v._1,
  {
    step: v._2.step,
    done: (x) => {
      const $3 = v._2.done(x);
      if ($3.tag === "Left") {
        return $Either("Right", value);
      }
      if ($3.tag === "Right") {
        return $Either("Right", $3._1);
      }
      fail();
    },
    saturated: true
  }
);
var choose = (name2) => (parsers) => {
  const help = $ArgHelp("HelpChoose", name2, arrayMap(parserHelp)(parsers));
  const go2 = (stk) => (args) => (acc) => (v) => {
    if (v.tag === "Cons") {
      const v1 = v._1.step(stk)(args);
      if (v1.tag === "ArgHalt") {
        return $ArgResult("ArgHalt", v1._1);
      }
      if (v1.tag === "ArgFail") {
        return go2(stk)(args)($List("Cons", v._1, acc))(v._2);
      }
      if (v1.tag === "ArgMatch") {
        if (v1._1.saturated) {
          return $ArgResult(
            "ArgMatch",
            failDup(help)(DuplicateArg)({
              step: go1(foldableList.foldr(Cons)($List("Cons", v1._1, v._2))(acc)),
              done: v1._1.done,
              saturated: true
            }),
            v1._2
          );
        }
        return $ArgResult(
          "ArgMatch",
          { step: (stk$p) => (args$p$p) => go2(stk$p)(args$p$p)(acc)($List("Cons", v1._1, v._2)), done: v1._1.done, saturated: false },
          v1._2
        );
      }
      fail();
    }
    if (v.tag === "Nil") {
      return ArgFail;
    }
    fail();
  };
  const go1 = (parsers$p) => (stk) => (args) => go2(stk)(args)(Nil)(parsers$p);
  return $ArgParser(
    help,
    {
      step: go1(fromFoldable(arrayMap((v) => v._2)(parsers))),
      done: (stk) => $Either("Left", $ArgError($List("Cons", help, stk), ExpectedArg)),
      saturated: false
    }
  );
};
var fromRecord = () => (dictBuildRecordArgs) => {
  const $2 = dictBuildRecordArgs.buildRecordArgs($$Proxy);
  return (x) => {
    const $4 = $2(x);
    return $ArgParser($4._1, functorArgFold.map(buildFromScratch)($4._2));
  };
};
var argument$p = (stk) => (names) => (v) => {
  if (v.tag === "Cons") {
    const $3 = findMap((x) => stripPrefix(x)(v._1))(names);
    if ($3.tag === "Just") {
      if (take(1)($3._1) === "=") {
        return $ArgResult("ArgMatch", drop2(1)($3._1), v._2);
      }
      if ($3._1 === "") {
        if (v._2.tag === "Cons") {
          return $ArgResult("ArgMatch", v._2._1, v._2._2);
        }
        return $ArgResult("ArgHalt", $ArgError(stk, ExpectedArgValue));
      }
      return ArgFail;
    }
    return ArgFail;
  }
  return ArgFail;
};
var argument = (name2) => (doc) => {
  const step = (stk) => {
    const $4 = functorArgResult.map((value) => failDup($ArgHelp("HelpFlag", name2, doc))(DuplicateArg)({ step, done: (v) => $Either("Right", value), saturated: true }));
    return (x) => $4(argument$p($List("Cons", $ArgHelp("HelpFlag", name2, doc), stk))(name2)(x));
  };
  return $ArgParser(
    $ArgHelp("HelpFlag", name2, doc),
    { step, done: (stk) => $Either("Left", $ArgError($List("Cons", $ArgHelp("HelpFlag", name2, doc), stk), ExpectedArg)), saturated: false }
  );
};
var applyArgFold = {
  apply: (v) => (v1) => ({
    step: (stk) => (args) => {
      const v2 = v.step(stk)(args);
      if (v2.tag === "ArgHalt") {
        return $ArgResult("ArgHalt", v2._1);
      }
      if (v2.tag === "ArgMatch") {
        return $ArgResult("ArgMatch", applyArgFold.apply(v2._1)(v1), v2._2);
      }
      if (v2.tag === "ArgFail") {
        const v3 = v1.step(stk)(args);
        if (v3.tag === "ArgHalt") {
          return $ArgResult("ArgHalt", v3._1);
        }
        if (v3.tag === "ArgMatch") {
          return $ArgResult("ArgMatch", applyArgFold.apply(v)(v3._1), v3._2);
        }
        if (v3.tag === "ArgFail") {
          return ArgFail;
        }
        fail();
      }
      fail();
    },
    done: (stk) => applyEither.apply(v.done(stk))(v1.done(stk)),
    saturated: v.saturated && v1.saturated
  }),
  Functor0: () => functorArgFold
};
var applyParser = { apply: (v) => (v1) => $ArgParser(semigroupHelp.append(v._1)(v1._1), applyArgFold.apply(v._2)(v1._2)), Functor0: () => functorArgParser };
var buildArgsCons = (dictIsSymbol) => () => () => () => (dictBuildRecordArgs) => ({
  buildRecordArgs: (v) => (rs) => applyParser.apply((() => {
    const $7 = unsafeGet(dictIsSymbol.reflectSymbol($$Proxy))(rs);
    return $ArgParser($7._1, functorArgFold.map((a) => (b) => (x) => b(unsafeInsert(dictIsSymbol.reflectSymbol($$Proxy))(a)(x)))($7._2));
  })())(dictBuildRecordArgs.buildRecordArgs($$Proxy)(rs))
});
var buildRecordArgsNil = {
  buildRecordArgs: (v) => (v1) => $ArgParser($ArgHelp("HelpArgs", []), { step: (v$1) => (v1$1) => ArgFail, done: (v$1) => $Either("Right", identity9), saturated: true })
};
var command = (name2) => (doc) => (v) => $ArgParser(
  $ArgHelp("HelpCommand", name2, doc, v._1),
  {
    step: (stk) => (args) => {
      const v2 = flag$p(name2)(args);
      if (v2.tag === "ArgHalt") {
        return $ArgResult("ArgHalt", v2._1);
      }
      if (v2.tag === "ArgFail") {
        return ArgFail;
      }
      if (v2.tag === "ArgMatch") {
        const v3 = parseArgs$p(v._2)($List("Cons", $ArgHelp("HelpCommand", name2, doc, v._1), stk))(v2._2);
        if (v3.tag === "Left") {
          return $ArgResult("ArgHalt", v3._1);
        }
        if (v3.tag === "Right") {
          return $ArgResult("ArgMatch", { step: (v$1) => (v1) => ArgFail, done: (v$1) => $Either("Right", v3._1), saturated: true }, Nil);
        }
        fail();
      }
      fail();
    },
    done: v._2.done,
    saturated: false
  }
);
var any2 = (name2) => (doc) => (k) => $ArgParser(
  $ArgHelp("HelpFormat", name2, $ArgHelp("HelpAny", doc)),
  {
    step: (v) => (v1) => {
      if (v1.tag === "Cons") {
        const $5 = k(v1._1);
        if ($5.tag === "Just") {
          return $ArgResult("ArgMatch", { step: (v$1) => (v1$1) => ArgFail, done: (v$1) => $Either("Right", $5._1), saturated: true }, v1._2);
        }
        return ArgFail;
      }
      return ArgFail;
    },
    done: (stk) => $Either("Left", $ArgError($List("Cons", $ArgHelp("HelpFormat", name2, $ArgHelp("HelpAny", doc)), stk), ExpectedArg)),
    saturated: false
  }
);
var anyNotFlag = (name2) => (doc) => any2(name2)(doc)((str) => {
  if (guard2(take2(1)(str) !== "-").tag === "Just") {
    return $Maybe("Just", str);
  }
  return Nothing;
});

// output-es/Data.Posix.Signal/index.js
var $Signal = (tag) => ({ tag });
var SIGTERM = /* @__PURE__ */ $Signal("SIGTERM");
var toString = (s) => {
  if (s.tag === "SIGABRT") {
    return "SIGABRT";
  }
  if (s.tag === "SIGALRM") {
    return "SIGALRM";
  }
  if (s.tag === "SIGBUS") {
    return "SIGBUS";
  }
  if (s.tag === "SIGCHLD") {
    return "SIGCHLD";
  }
  if (s.tag === "SIGCLD") {
    return "SIGCLD";
  }
  if (s.tag === "SIGCONT") {
    return "SIGCONT";
  }
  if (s.tag === "SIGEMT") {
    return "SIGEMT";
  }
  if (s.tag === "SIGFPE") {
    return "SIGFPE";
  }
  if (s.tag === "SIGHUP") {
    return "SIGHUP";
  }
  if (s.tag === "SIGILL") {
    return "SIGILL";
  }
  if (s.tag === "SIGINFO") {
    return "SIGINFO";
  }
  if (s.tag === "SIGINT") {
    return "SIGINT";
  }
  if (s.tag === "SIGIO") {
    return "SIGIO";
  }
  if (s.tag === "SIGIOT") {
    return "SIGIOT";
  }
  if (s.tag === "SIGKILL") {
    return "SIGKILL";
  }
  if (s.tag === "SIGLOST") {
    return "SIGLOST";
  }
  if (s.tag === "SIGPIPE") {
    return "SIGPIPE";
  }
  if (s.tag === "SIGPOLL") {
    return "SIGPOLL";
  }
  if (s.tag === "SIGPROF") {
    return "SIGPROF";
  }
  if (s.tag === "SIGPWR") {
    return "SIGPWR";
  }
  if (s.tag === "SIGQUIT") {
    return "SIGQUIT";
  }
  if (s.tag === "SIGSEGV") {
    return "SIGSEGV";
  }
  if (s.tag === "SIGSTKFLT") {
    return "SIGSTKFLT";
  }
  if (s.tag === "SIGSTOP") {
    return "SIGSTOP";
  }
  if (s.tag === "SIGSYS") {
    return "SIGSYS";
  }
  if (s.tag === "SIGTERM") {
    return "SIGTERM";
  }
  if (s.tag === "SIGTRAP") {
    return "SIGTRAP";
  }
  if (s.tag === "SIGTSTP") {
    return "SIGTSTP";
  }
  if (s.tag === "SIGTTIN") {
    return "SIGTTIN";
  }
  if (s.tag === "SIGTTOU") {
    return "SIGTTOU";
  }
  if (s.tag === "SIGUNUSED") {
    return "SIGUNUSED";
  }
  if (s.tag === "SIGURG") {
    return "SIGURG";
  }
  if (s.tag === "SIGUSR1") {
    return "SIGUSR1";
  }
  if (s.tag === "SIGUSR2") {
    return "SIGUSR2";
  }
  if (s.tag === "SIGVTALRM") {
    return "SIGVTALRM";
  }
  if (s.tag === "SIGWINCH") {
    return "SIGWINCH";
  }
  if (s.tag === "SIGXCPU") {
    return "SIGXCPU";
  }
  if (s.tag === "SIGXFSZ") {
    return "SIGXFSZ";
  }
  fail();
};

// output-es/Debug/foreign.js
var req = typeof module === "undefined" ? void 0 : module.require;
var util = function() {
  try {
    return req === void 0 ? void 0 : req("util");
  } catch (e) {
    return void 0;
  }
}();
function _trace(x, k) {
  if (util !== void 0) {
    console.log(util.inspect(x, { depth: null, colors: true }));
  } else {
    console.log(x);
  }
  return k({});
}
var now = function() {
  var perf;
  if (typeof performance !== "undefined") {
    perf = performance;
  } else if (req) {
    try {
      perf = req("perf_hooks").performance;
    } catch (e) {
    }
  }
  return function() {
    return (perf || Date).now();
  };
}();

// output-es/Debug/index.js
var traceM = () => (dictMonad) => {
  const discard1 = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return (s) => discard1(pure(unit))(() => _trace(s, (v) => pure(unit)));
};

// output-es/Effect.Exception/foreign.js
function error(msg) {
  return new Error(msg);
}
function throwException(e) {
  return function() {
    throw e;
  };
}

// output-es/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output-es/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler(error3) {
    return new Aff2(PURE, void 0);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error3) {
      setTimeout(function() {
        throw error3;
      }, 0);
    }
  }
  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error3) {
      return left(error3);
    }
  }
  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error3) {
      k(left(error3))();
      return nonCanceler;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size4 = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size4 !== 0) {
        size4--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size4 === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size4) % limit] = cb;
        size4++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util2) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill2(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util2.isLeft(result) && util2.fromLeft(result)) {
                  setTimeout(function() {
                    throw util2.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill2(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error3) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util2, supervisor, aff) {
    var runTick = 0;
    var status = SUSPENDED;
    var step = aff;
    var fail2 = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run2(localRunTick) {
      var tmp, result, attempt;
      while (true) {
        tmp = null;
        result = null;
        attempt = null;
        switch (status) {
          case STEP_BIND:
            status = CONTINUE;
            try {
              step = bhead(step);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status = RETURN;
              fail2 = util2.left(e);
              step = null;
            }
            break;
          case STEP_RESULT:
            if (util2.isLeft(step)) {
              status = RETURN;
              fail2 = step;
              step = null;
            } else if (bhead === null) {
              status = RETURN;
            } else {
              status = STEP_BIND;
              step = util2.fromRight(step);
            }
            break;
          case CONTINUE:
            switch (step.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step._2;
                status = CONTINUE;
                step = step._1;
                break;
              case PURE:
                if (bhead === null) {
                  status = RETURN;
                  step = util2.right(step._1);
                } else {
                  status = STEP_BIND;
                  step = step._1;
                }
                break;
              case SYNC:
                status = STEP_RESULT;
                step = runSync(util2.left, util2.right, step._1);
                break;
              case ASYNC:
                status = PENDING;
                step = runAsync(util2.left, step._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status = STEP_RESULT;
                      step = result2;
                      run2(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status = RETURN;
                fail2 = util2.left(step._1);
                step = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case FORK:
                status = STEP_RESULT;
                tmp = Fiber(util2, supervisor, step._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step._1) {
                  tmp.run();
                }
                step = util2.right(tmp);
                break;
              case SEQ:
                status = CONTINUE;
                step = sequential(util2, supervisor, step._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status = COMPLETED;
              step = interrupt || fail2 || step;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail2) {
                    status = CONTINUE;
                    step = attempt._2(util2.fromLeft(fail2));
                    fail2 = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                    status = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status = STEP_BIND;
                    step = util2.fromRight(step);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail2 === null) {
                    result = util2.fromRight(step);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt._1.killed(util2.fromLeft(interrupt))(attempt._2);
                  } else if (fail2) {
                    step = attempt._1.failed(util2.fromLeft(fail2))(attempt._2);
                  } else {
                    step = attempt._1.completed(util2.fromRight(step))(attempt._2);
                  }
                  fail2 = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  step = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step = attempt._1;
                  fail2 = attempt._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step));
              }
            }
            joins = null;
            if (interrupt && fail2) {
              setTimeout(function() {
                throw util2.fromLeft(fail2);
              }, 0);
            } else if (util2.isLeft(step) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util2.fromLeft(step);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join2) {
      return function() {
        if (status === COMPLETED) {
          rethrow = rethrow && join2.rethrow;
          join2.handler(step)();
          return function() {
          };
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join2;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill2(error3, cb) {
      return function() {
        if (status === COMPLETED) {
          cb(util2.right(void 0))();
          return function() {
          };
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util2.right(void 0));
          }
        })();
        switch (status) {
          case SUSPENDED:
            interrupt = util2.left(error3);
            status = COMPLETED;
            step = interrupt;
            run2(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util2.left(error3);
            }
            if (bracketCount === 0) {
              if (status === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error3)), attempts, interrupt);
              }
              status = RETURN;
              step = null;
              fail2 = null;
              run2(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util2.left(error3);
            }
            if (bracketCount === 0) {
              status = RETURN;
              step = null;
              fail2 = null;
            }
        }
        return canceler;
      };
    }
    function join(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status === SUSPENDED) {
          run2(runTick);
        }
        return canceler;
      };
    }
    return {
      kill: kill2,
      join,
      onComplete,
      isSuspended: function() {
        return status === SUSPENDED;
      },
      run: function() {
        if (status === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run2(runTick);
            });
          } else {
            run2(runTick);
          }
        }
      }
    };
  }
  function runPar(util2, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill2(error3, par2, cb2) {
      var step = par2;
      var head = null;
      var tail = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step.tag) {
            case FORKED:
              if (step._3 === EMPTY) {
                tmp = fibers[step._1];
                kills2[count++] = tmp.kill(error3, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head === null) {
                break loop;
              }
              step = head._2;
              if (tail === null) {
                head = null;
              } else {
                head = tail._1;
                tail = tail._2;
              }
              break;
            case MAP:
              step = step._2;
              break;
            case APPLY:
            case ALT:
              if (head) {
                tail = new Aff2(CONS, head, tail);
              }
              head = step;
              step = step._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util2.right(void 0))();
      } else {
        kid = 0;
        tmp = count;
        for (; kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join(result, head, tail) {
      var fail2, step, lhs, rhs, tmp, kid;
      if (util2.isLeft(result)) {
        fail2 = result;
        step = null;
      } else {
        step = result;
        fail2 = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head === null) {
            cb(fail2 || step)();
            return;
          }
          if (head._3 !== EMPTY) {
            return;
          }
          switch (head.tag) {
            case MAP:
              if (fail2 === null) {
                head._3 = util2.right(head._1(util2.fromRight(step)));
                step = head._3;
              } else {
                head._3 = fail2;
              }
              break;
            case APPLY:
              lhs = head._1._3;
              rhs = head._2._3;
              if (fail2) {
                head._3 = fail2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill2(early, fail2 === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join(fail2, null, null);
                    } else {
                      join(fail2, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step = util2.right(util2.fromRight(lhs)(util2.fromRight(rhs)));
                head._3 = step;
              }
              break;
            case ALT:
              lhs = head._1._3;
              rhs = head._2._3;
              if (lhs === EMPTY && util2.isLeft(rhs) || rhs === EMPTY && util2.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util2.isLeft(lhs) && rhs !== EMPTY && util2.isLeft(rhs)) {
                fail2 = step === lhs ? rhs : lhs;
                step = null;
                head._3 = fail2;
              } else {
                head._3 = step;
                tmp = true;
                kid = killId++;
                kills[kid] = kill2(early, step === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join(step, null, null);
                    } else {
                      join(step, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail === null) {
            head = null;
          } else {
            head = tail._1;
            tail = tail._2;
          }
        }
    }
    function resolve2(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run2() {
      var status = CONTINUE;
      var step = par;
      var head = null;
      var tail = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step.tag) {
                case MAP:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(MAP, step._1, EMPTY, EMPTY);
                  step = step._2;
                  break;
                case APPLY:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                case ALT:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(ALT, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step;
                  step = new Aff2(FORKED, fid, new Aff2(CONS, head, tail), EMPTY);
                  tmp = Fiber(util2, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve2(step)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head === null) {
                break loop;
              }
              if (head._1 === EMPTY) {
                head._1 = step;
                status = CONTINUE;
                step = head._2;
                head._2 = EMPTY;
              } else {
                head._2 = step;
                step = head;
                if (tail === null) {
                  head = null;
                } else {
                  head = tail._1;
                  tail = tail._2;
                }
              }
          }
        }
      root = step;
      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error3, cb2) {
      interrupt = util2.left(error3);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill2(error3, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler;
          };
        });
      };
    }
    run2();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential(util2, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util2, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
function _map(f) {
  return function(aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function(value) {
        return Aff.Pure(f(value));
      });
    }
  };
}
function _bind(aff) {
  return function(k) {
    return Aff.Bind(aff, k);
  };
}
var _liftEffect = Aff.Sync;
var makeAff = Aff.Async;
function _makeFiber(util2, aff) {
  return function() {
    return Aff.Fiber(util2, null, aff);
  };
}
var _delay = function() {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }
  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }
  return function(right, ms) {
    return Aff.Async(function(cb) {
      return function() {
        var timer = setDelay(ms, cb(right()));
        return function() {
          return Aff.Sync(function() {
            return right(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();
var _sequential = Aff.Seq;

// output-es/Effect.Aff/index.js
var functorAff = { map: _map };
var ffiUtil = {
  isLeft: (v) => {
    if (v.tag === "Left") {
      return true;
    }
    if (v.tag === "Right") {
      return false;
    }
    fail();
  },
  fromLeft: (v) => {
    if (v.tag === "Left") {
      return v._1;
    }
    if (v.tag === "Right") {
      return _crashWith("unsafeFromLeft: Right");
    }
    fail();
  },
  fromRight: (v) => {
    if (v.tag === "Right") {
      return v._1;
    }
    if (v.tag === "Left") {
      return _crashWith("unsafeFromRight: Left");
    }
    fail();
  },
  left: Left,
  right: Right
};
var monadAff = { Applicative0: () => applicativeAff, Bind1: () => bindAff };
var bindAff = { bind: _bind, Apply0: () => applyAff };
var applyAff = { apply: (f) => (a) => _bind(f)((f$p) => _bind(a)((a$p) => applicativeAff.pure(f$p(a$p)))), Functor0: () => functorAff };
var applicativeAff = { pure: _pure, Apply0: () => applyAff };

// output-es/Effect.Console/foreign.js
var log2 = function(s) {
  return function() {
    console.log(s);
  };
};

// output-es/Node.Path/foreign.js
import path from "path";
var normalize = path.normalize;
function dirname(p) {
  return path.normalize(path.dirname(p));
}
var basename = path.basename;
var extname = path.extname;
var sep = path.sep;
var delimiter = path.delimiter;
var parse = path.parse;
var isAbsolute = path.isAbsolute;

// output-es/Foreign.Object/foreign.js
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// output-es/Node.Process/foreign.js
import process from "process";
function exit(code) {
  return () => {
    process.exit(code);
  };
}
function copyArray(xs) {
  return () => xs.slice();
}

// output-es/Node.Process/index.js
var argv = /* @__PURE__ */ (() => copyArray(process.argv))();

// output-es/Node.Buffer.Immutable/foreign.js
function create(size4) {
  return Buffer.alloc(size4);
}
function fromArray(octets) {
  return Buffer.from(octets);
}
function size2(buff) {
  return buff.length;
}
function toArray(buff) {
  var json = buff.toJSON();
  return json.data || json;
}
function toArrayBuffer(buff) {
  return buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength);
}
function fromArrayBuffer(ab) {
  return Buffer.from(ab);
}
function fromStringImpl2(str) {
  return (encoding) => {
    return Buffer.from(str, encoding);
  };
}
function readImpl(ty) {
  return (offset) => {
    return (buf) => {
      return buf["read" + ty](offset);
    };
  };
}
function readStringImpl(enc) {
  return (start) => {
    return (end) => {
      return (buff) => {
        return buff.toString(enc, start, end);
      };
    };
  };
}
function getAtOffsetImpl(just) {
  return (nothing) => {
    return (offset) => {
      return (buff) => {
        var octet = buff[offset];
        return octet == null ? nothing : just(octet);
      };
    };
  };
}
function toStringImpl(enc) {
  return (buff) => {
    return buff.toString(enc);
  };
}
function slice3(start) {
  return (end) => {
    return (buff) => {
      return buff.slice(start, end);
    };
  };
}
function concat3(buffs) {
  return Buffer.concat(buffs);
}
function concatToLength(buffs) {
  return (totalLength) => {
    return Buffer.concat(buffs, totalLength);
  };
}

// output-es/Node.Buffer.Immutable/index.js
var toString2 = (x) => toStringImpl((() => {
  if (x.tag === "ASCII") {
    return "ascii";
  }
  if (x.tag === "UTF8") {
    return "utf8";
  }
  if (x.tag === "UTF16LE") {
    return "utf16le";
  }
  if (x.tag === "UCS2") {
    return "ucs2";
  }
  if (x.tag === "Base64") {
    return "base64";
  }
  if (x.tag === "Latin1") {
    return "latin1";
  }
  if (x.tag === "Binary") {
    return "binary";
  }
  if (x.tag === "Hex") {
    return "hex";
  }
  fail();
})());
var readString = (x) => readStringImpl((() => {
  if (x.tag === "ASCII") {
    return "ascii";
  }
  if (x.tag === "UTF8") {
    return "utf8";
  }
  if (x.tag === "UTF16LE") {
    return "utf16le";
  }
  if (x.tag === "UCS2") {
    return "ucs2";
  }
  if (x.tag === "Base64") {
    return "base64";
  }
  if (x.tag === "Latin1") {
    return "latin1";
  }
  if (x.tag === "Binary") {
    return "binary";
  }
  if (x.tag === "Hex") {
    return "hex";
  }
  fail();
})());
var read3 = (x) => readImpl((() => {
  if (x.tag === "UInt8") {
    return "UInt8";
  }
  if (x.tag === "UInt16LE") {
    return "UInt16LE";
  }
  if (x.tag === "UInt16BE") {
    return "UInt16BE";
  }
  if (x.tag === "UInt32LE") {
    return "UInt32LE";
  }
  if (x.tag === "UInt32BE") {
    return "UInt32BE";
  }
  if (x.tag === "Int8") {
    return "Int8";
  }
  if (x.tag === "Int16LE") {
    return "Int16LE";
  }
  if (x.tag === "Int16BE") {
    return "Int16BE";
  }
  if (x.tag === "Int32LE") {
    return "Int32LE";
  }
  if (x.tag === "Int32BE") {
    return "Int32BE";
  }
  if (x.tag === "FloatLE") {
    return "FloatLE";
  }
  if (x.tag === "FloatBE") {
    return "FloatBE";
  }
  if (x.tag === "DoubleLE") {
    return "DoubleLE";
  }
  if (x.tag === "DoubleBE") {
    return "DoubleBE";
  }
  fail();
})());
var getAtOffset = /* @__PURE__ */ getAtOffsetImpl(Just)(Nothing);
var fromString3 = (str) => {
  const $1 = fromStringImpl2(str);
  return (x) => $1((() => {
    if (x.tag === "ASCII") {
      return "ascii";
    }
    if (x.tag === "UTF8") {
      return "utf8";
    }
    if (x.tag === "UTF16LE") {
      return "utf16le";
    }
    if (x.tag === "UCS2") {
      return "ucs2";
    }
    if (x.tag === "Base64") {
      return "base64";
    }
    if (x.tag === "Latin1") {
      return "latin1";
    }
    if (x.tag === "Binary") {
      return "binary";
    }
    if (x.tag === "Hex") {
      return "hex";
    }
    fail();
  })());
};

// output-es/Node.Buffer.Internal/foreign.js
function copyAll(a) {
  return () => {
    return Buffer.from(a);
  };
}
function writeInternal(ty) {
  return (value) => {
    return (offset) => {
      return (buf) => {
        return () => {
          buf["write" + ty](value, offset);
        };
      };
    };
  };
}
function writeStringInternal(encoding) {
  return (offset) => {
    return (length3) => {
      return (value) => {
        return (buff) => {
          return () => {
            return buff.write(value, offset, length3, encoding);
          };
        };
      };
    };
  };
}
function setAtOffset(value) {
  return (offset) => {
    return (buff) => {
      return () => {
        buff[offset] = value;
      };
    };
  };
}
function copy(srcStart) {
  return (srcEnd) => {
    return (src) => {
      return (targStart) => {
        return (targ) => {
          return () => {
            return src.copy(targ, targStart, srcStart, srcEnd);
          };
        };
      };
    };
  };
}
function fill(octet) {
  return (start) => {
    return (end) => {
      return (buf) => {
        return () => {
          buf.fill(octet, start, end);
        };
      };
    };
  };
}

// output-es/Node.Buffer.Internal/index.js
var writeString = (dictMonad) => (x) => writeStringInternal((() => {
  if (x.tag === "ASCII") {
    return "ascii";
  }
  if (x.tag === "UTF8") {
    return "utf8";
  }
  if (x.tag === "UTF16LE") {
    return "utf16le";
  }
  if (x.tag === "UCS2") {
    return "ucs2";
  }
  if (x.tag === "Base64") {
    return "base64";
  }
  if (x.tag === "Latin1") {
    return "latin1";
  }
  if (x.tag === "Binary") {
    return "binary";
  }
  if (x.tag === "Hex") {
    return "hex";
  }
  fail();
})());
var write3 = (dictMonad) => (x) => writeInternal((() => {
  if (x.tag === "UInt8") {
    return "UInt8";
  }
  if (x.tag === "UInt16LE") {
    return "UInt16LE";
  }
  if (x.tag === "UInt16BE") {
    return "UInt16BE";
  }
  if (x.tag === "UInt32LE") {
    return "UInt32LE";
  }
  if (x.tag === "UInt32BE") {
    return "UInt32BE";
  }
  if (x.tag === "Int8") {
    return "Int8";
  }
  if (x.tag === "Int16LE") {
    return "Int16LE";
  }
  if (x.tag === "Int16BE") {
    return "Int16BE";
  }
  if (x.tag === "Int32LE") {
    return "Int32LE";
  }
  if (x.tag === "Int32BE") {
    return "Int32BE";
  }
  if (x.tag === "FloatLE") {
    return "FloatLE";
  }
  if (x.tag === "FloatBE") {
    return "FloatBE";
  }
  if (x.tag === "DoubleLE") {
    return "DoubleLE";
  }
  if (x.tag === "DoubleBE") {
    return "DoubleBE";
  }
  fail();
})());
var toString3 = (dictMonad) => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return (m) => {
    const $4 = toString2(m);
    return (buf) => map($4)(unsafeFreeze1(buf));
  };
};
var toArrayBuffer2 = (dictMonad) => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return (buf) => map(toArrayBuffer)(unsafeFreeze1(buf));
};
var toArray2 = (dictMonad) => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return (buf) => map(toArray)(unsafeFreeze1(buf));
};
var size3 = (dictMonad) => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return (buf) => map(size2)(unsafeFreeze1(buf));
};
var readString2 = (dictMonad) => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return (m) => (o) => (o$p) => {
    const $6 = readString(m)(o)(o$p);
    return (buf) => map($6)(unsafeFreeze1(buf));
  };
};
var read4 = (dictMonad) => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return (t) => (o) => {
    const $5 = read3(t)(o);
    return (buf) => map($5)(unsafeFreeze1(buf));
  };
};
var getAtOffset2 = (dictMonad) => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return (o) => {
    const $4 = getAtOffset(o);
    return (buf) => map($4)(unsafeFreeze1(buf));
  };
};
var fromString4 = (dictMonad) => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return (s) => {
    const $3 = fromString3(s);
    return (x) => unsafeThaw1($3(x));
  };
};
var fromArrayBuffer2 = (dictMonad) => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return (x) => unsafeThaw1(fromArrayBuffer(x));
};
var fromArray2 = (dictMonad) => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return (x) => unsafeThaw1(fromArray(x));
};
var create2 = (dictMonad) => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return (x) => unsafeThaw1(create(x));
};
var concat$p = (dictMonad) => (arrs) => (n) => (v) => concatToLength(arrs)(n);
var concat4 = (arrs) => (v) => concat3(arrs);

// output-es/Node.Buffer/index.js
var mutableBufferEffect = {
  create: /* @__PURE__ */ create2(monadEffect),
  freeze: copyAll,
  unsafeFreeze: pureE,
  thaw: copyAll,
  unsafeThaw: pureE,
  fromArray: /* @__PURE__ */ fromArray2(monadEffect),
  fromString: /* @__PURE__ */ fromString4(monadEffect),
  fromArrayBuffer: /* @__PURE__ */ fromArrayBuffer2(monadEffect),
  toArrayBuffer: /* @__PURE__ */ toArrayBuffer2(monadEffect),
  read: /* @__PURE__ */ read4(monadEffect),
  readString: /* @__PURE__ */ readString2(monadEffect),
  toString: /* @__PURE__ */ toString3(monadEffect),
  write: /* @__PURE__ */ write3(monadEffect),
  writeString: /* @__PURE__ */ writeString(monadEffect),
  toArray: /* @__PURE__ */ toArray2(monadEffect),
  getAtOffset: /* @__PURE__ */ getAtOffset2(monadEffect),
  setAtOffset,
  slice: slice3,
  size: /* @__PURE__ */ size3(monadEffect),
  concat: concat4,
  "concat'": /* @__PURE__ */ concat$p(monadEffect),
  copy,
  fill,
  Monad0: () => monadEffect
};

// output-es/Data.Nullable/foreign.js
function nullable(a, r, f) {
  return a == null ? r : f(a);
}

// output-es/Node.ChildProcess/foreign.js
import { spawn, exec, execFile, execSync, execFileSync, fork as cp_fork } from "child_process";
function execImpl(command2) {
  return (opts) => (callback) => () => exec(
    command2,
    opts,
    (err, stdout2, stderr2) => {
      callback(err)(stdout2)(stderr2)();
    }
  );
}
function onError(cp) {
  return (cb) => () => {
    cp.on("error", (err) => {
      cb(err)();
    });
  };
}
var _undefined = void 0;

// output-es/Node.ChildProcess/index.js
var $Exit = (tag, _1) => ({ tag, _1 });
var kill = (sig) => (v) => (v1) => v.kill(toString(sig));
var defaultExecOptions = {
  cwd: Nothing,
  env: Nothing,
  encoding: Nothing,
  shell: Nothing,
  timeout: Nothing,
  maxBuffer: Nothing,
  killSignal: Nothing,
  uid: Nothing,
  gid: Nothing
};
var convertExecOptions = (opts) => ({
  cwd: (() => {
    if (opts.cwd.tag === "Nothing") {
      return _undefined;
    }
    if (opts.cwd.tag === "Just") {
      return opts.cwd._1;
    }
    fail();
  })(),
  env: (() => {
    if (opts.env.tag === "Nothing") {
      return _undefined;
    }
    if (opts.env.tag === "Just") {
      return opts.env._1;
    }
    fail();
  })(),
  encoding: (() => {
    if (opts.encoding.tag === "Nothing") {
      return _undefined;
    }
    if (opts.encoding.tag === "Just") {
      if (opts.encoding._1.tag === "ASCII") {
        return "ascii";
      }
      if (opts.encoding._1.tag === "UTF8") {
        return "utf8";
      }
      if (opts.encoding._1.tag === "UTF16LE") {
        return "utf16le";
      }
      if (opts.encoding._1.tag === "UCS2") {
        return "ucs2";
      }
      if (opts.encoding._1.tag === "Base64") {
        return "base64";
      }
      if (opts.encoding._1.tag === "Latin1") {
        return "latin1";
      }
      if (opts.encoding._1.tag === "Binary") {
        return "binary";
      }
      if (opts.encoding._1.tag === "Hex") {
        return "hex";
      }
      fail();
    }
    fail();
  })(),
  shell: (() => {
    if (opts.shell.tag === "Nothing") {
      return _undefined;
    }
    if (opts.shell.tag === "Just") {
      return opts.shell._1;
    }
    fail();
  })(),
  timeout: (() => {
    if (opts.timeout.tag === "Nothing") {
      return _undefined;
    }
    if (opts.timeout.tag === "Just") {
      return opts.timeout._1;
    }
    fail();
  })(),
  maxBuffer: (() => {
    if (opts.maxBuffer.tag === "Nothing") {
      return _undefined;
    }
    if (opts.maxBuffer.tag === "Just") {
      return opts.maxBuffer._1;
    }
    fail();
  })(),
  killSignal: (() => {
    if (opts.killSignal.tag === "Nothing") {
      return _undefined;
    }
    if (opts.killSignal.tag === "Just") {
      return opts.killSignal._1;
    }
    fail();
  })(),
  uid: (() => {
    if (opts.uid.tag === "Nothing") {
      return _undefined;
    }
    if (opts.uid.tag === "Just") {
      return opts.uid._1;
    }
    fail();
  })(),
  gid: (() => {
    if (opts.gid.tag === "Nothing") {
      return _undefined;
    }
    if (opts.gid.tag === "Just") {
      return opts.gid._1;
    }
    fail();
  })()
});
var exec2 = (cmd) => (opts) => (callback) => execImpl(cmd)(convertExecOptions(opts))((err) => (stdout$p) => (stderr$p) => callback({
  error: nullable(err, Nothing, Just),
  stdout: stdout$p,
  stderr: stderr$p
}));

// output-es/Node.Encoding/index.js
var $Encoding = (tag) => ({ tag });
var UTF8 = /* @__PURE__ */ $Encoding("UTF8");

// output-es/TIL.Process/index.js
var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
var exec3 = (command2) => (modifyOptions) => makeAff((k) => {
  const options = modifyOptions(defaultExecOptions);
  const killSignal = (() => {
    if (options.killSignal.tag === "Nothing") {
      return SIGTERM;
    }
    if (options.killSignal.tag === "Just") {
      return options.killSignal._1;
    }
    fail();
  })();
  const encoding = (() => {
    if (options.encoding.tag === "Nothing") {
      return UTF8;
    }
    if (options.encoding.tag === "Just") {
      return options.encoding._1;
    }
    fail();
  })();
  const $6 = exec2(command2)(options)((v) => {
    const $7 = for_2(v.error)((x) => k($Either("Left", x)));
    return () => {
      $7();
      const stderr$p = mutableBufferEffect.toString(encoding)(v.stderr)();
      const stdout$p = mutableBufferEffect.toString(encoding)(v.stdout)();
      return k($Either("Right", { stderr: stderr$p, stdout: stdout$p, exit: $Exit("Normally", 0) }))();
    };
  });
  return () => {
    const childProcess = $6();
    onError(childProcess)((x) => k($Either("Left", x)))();
    const $9 = _liftEffect(kill(killSignal)(childProcess));
    return (v) => $9;
  };
});

// output-es/Main/foreign.js
import * as url from "url";
var importMetaPath = () => url.fileURLToPath(import.meta.url);

// output-es/Main/index.js
var $Command = (tag, _1) => ({ tag, _1 });
var identity11 = (x) => x;
var parseArgs2 = /* @__PURE__ */ parseArgs(foldableArray);
var traceM2 = /* @__PURE__ */ traceM()(monadAff);
var Build = /* @__PURE__ */ $Command("Build");
var Sync = /* @__PURE__ */ $Command("Sync");
var Edit = (value0) => $Command("Edit", value0);
var parser = /* @__PURE__ */ (() => {
  const $0 = choose("command")([
    (() => {
      const $02 = flag(["build"])("Build all documents to HTML files for distribution");
      return $ArgParser($02._1, functorArgFold.map((v) => Build)($02._2));
    })(),
    (() => {
      const $02 = flag(["sync"])("Ensure the local environment has all known changes");
      return $ArgParser($02._1, functorArgFold.map((v) => Sync)($02._2));
    })(),
    command(["edit"])("Edit and publish a new document")((() => {
      const $02 = fromRecord()(buildArgsCons({ reflectSymbol: () => "mediaFilePaths" })()()()(buildArgsCons({
        reflectSymbol: () => "title"
      })()()()(buildRecordArgsNil)))({
        title: (() => {
          const $03 = unfolded(unfoldableArray)(anyNotFlag("TITLE")("Title"));
          return $ArgParser($03._1, functorArgFold.map(joinWith(" "))($03._2));
        })(),
        mediaFilePaths: separated("FILE")(",")(argument(["--files", "-f"])("Paths to media files"))
      });
      const $1 = $$default(Nothing)($ArgParser($02._1, functorArgFold.map(Just)($02._2)));
      return applyParser.apply($ArgParser(
        $1._1,
        functorArgFold.map($$const)(functorArgFold.map(Edit)($1._2))
      ))(flagHelp);
    })())
  ]);
  return applyParser.apply($ArgParser($0._1, functorArgFold.map($$const)($0._2)))(flagHelp);
})();
var handleSync = (tilPath) => _bind(exec3(joinWith(" ")(["git", "-C", tilPath, "status", "--porcelain"]))(identity11))((gitStatusResult) => _bind((() => {
  if (gitStatusResult.exit.tag === "Normally") {
    if (gitStatusResult.exit._1 === 1) {
      return _pure(unit);
    }
    if (gitStatusResult.exit._1 === 0) {
      return _bind(_liftEffect(log2("Dirty repo, stash or commit changes?\n")))(() => _bind(_liftEffect(log2(gitStatusResult.stdout)))(() => _liftEffect(exit(1))));
    }
    return _bind(_liftEffect(log2("Exiting with code: " + showIntImpl(gitStatusResult.exit._1))))(() => _liftEffect(exit(gitStatusResult.exit._1)));
  }
  if (gitStatusResult.exit.tag === "BySignal") {
    return _liftEffect(throwException(error("Killed by signal: " + toString(gitStatusResult.exit._1))));
  }
  fail();
})())(() => _bind(exec3(joinWith(" ")(["git -C", tilPath, "fetch origin main -q", "&&", "git -C", tilPath, "rebase -q"]))((v) => ({
  cwd: v.cwd,
  env: v.env,
  encoding: v.encoding,
  shell: v.shell,
  timeout: $Maybe("Just", 5e3),
  maxBuffer: v.maxBuffer,
  killSignal: v.killSignal,
  uid: v.uid,
  gid: v.gid
})))((gitFetchAndRebaseResult) => {
  if (gitFetchAndRebaseResult.exit.tag === "Normally") {
    if (gitFetchAndRebaseResult.exit._1 === 0) {
      return _pure(unit);
    }
    return _bind(_liftEffect(log2("Exiting with code: " + showIntImpl(gitFetchAndRebaseResult.exit._1))))(() => _liftEffect(exit(gitFetchAndRebaseResult.exit._1)));
  }
  if (gitFetchAndRebaseResult.exit.tag === "BySignal") {
    return _liftEffect(throwException(error("Killed by signal: " + toString(gitFetchAndRebaseResult.exit._1))));
  }
  fail();
})));
var main = /* @__PURE__ */ (() => {
  const $0 = _makeFiber(
    ffiUtil,
    _bind(_map(drop(2))(_liftEffect(argv)))((args) => {
      const parsedCommand = parseArgs2("til")("Publish short articles from the command line.")(parser)(args);
      return _bind((() => {
        if (parsedCommand.tag === "Left") {
          return _bind(_liftEffect(log2(printArgError(parsedCommand._1))))(() => _liftEffect((() => {
            if (parsedCommand._1._2.tag === "ShowHelp") {
              return exit(0);
            }
            if (parsedCommand._1._2.tag === "ShowInfo") {
              return exit(0);
            }
            return exit(1);
          })()));
        }
        if (parsedCommand.tag === "Right") {
          return _bind(_liftEffect(() => {
            const a$p = importMetaPath();
            return dirname(dirname(a$p));
          }))((tilPath) => {
            if (parsedCommand._1.tag === "Build") {
              return _pure(unit);
            }
            if (parsedCommand._1.tag === "Sync") {
              return handleSync(tilPath);
            }
            if (parsedCommand._1.tag === "Edit") {
              if (parsedCommand._1._1.tag === "Nothing") {
                return _pure(unit);
              }
              if (parsedCommand._1._1.tag === "Just") {
                return _bind(traceM2(parsedCommand._1._1._1))(() => _pure(unit));
              }
              fail();
            }
            fail();
          });
        }
        fail();
      })())(() => _pure(unit));
    })
  );
  return () => {
    const fiber = $0();
    fiber.run();
    return unit;
  };
})();

// <stdin>
main();

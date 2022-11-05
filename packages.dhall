let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.4-20221018/packages.dhall
        sha256:b1db2e4a17260ace8d17858602f8c56f460982d6e404818d7f6cb9f053324bb1

in  upstream
  with node-fs =
      { dependencies =
          [ "datetime"
          , "effect"
          , "either"
          , "enums"
          , "exceptions"
          , "functions"
          , "integers"
          , "js-date"
          , "maybe"
          , "node-buffer"
          , "node-path"
          , "node-streams"
          , "nullable"
          , "partial"
          , "prelude"
          , "strings"
          , "unsafe-coerce"
          ]
      , repo =
          "https://github.com/purescript-node/purescript-node-fs.git"
      , version =
          "v8.1.1"
      }
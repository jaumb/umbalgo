[
  {
    "code": "public static void sink(Comparable[] a, int k, int N) {",
    "impl": "(function(that) {\n  sink(a, k) {\n})"
  },
  {
    "code": "  while (2 * k <= N) {",
    "impl": "(function(that) {\n    if (2 * that.args[\"k\"] <= that.args[\"N\"]) {\n      that.nextLineNumber = 3;\n    } else {\n      that.nextLineNumber = undefined;\n    }\n})"
  },
  {
    "code": "    int j = 2 * k;",
    "impl": "(function(that) {\n    that.locals[\"j\"] = 2 * that.args[\"k\"];\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "    if (j < N && less(a, j, j + 1)) {",
    "impl": "(function(that) {\n    if (that.args[\"k\"] < that.args[\"N\"]) {\n      that.vm.invokeFunc(\n        \"less\",\n        function(result) {\n          if (result) {\n            that.nextLineNumber = 5;\n          } else {\n            that.nextLineNumber = 7;\n          }\n        },\n        that.args[\"a\"],\n        that.locals[\"j\"],\n        that.locals[\"j\"] + 1);\n    } else {\n      that.nextLineNumber = 7;\n    }\n})"
  },
  {
    "code": "      j++;",
    "impl": "(function(that) {\n    that.locals[\"j\"]++;\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 7;\n})"
  },
  {
    "code": "    if (!less(a, k, j)) {",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"less\",\n      function(result) {\n        if (!result) {\n          that.nextLineNumber = 8;\n        } else {\n          that.nextLineNumber = 10;\n        }\n      },\n      that.args[\"a\"],\n      that.args[\"k\"],\n      that.locals[\"j\"]);\n})"
  },
  {
    "code": "      break;",
    "impl": "(function(that) {\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 10;\n})"
  },
  {
    "code": "    exch(a, k, j);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"k\"],\n      that.locals[\"j\"],\n      that.args[\"N\"]--);\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "    k = j;",
    "impl": "(function(that) {\n    that.args[\"k\"] = that.locals[\"j\"];\n    that.nextLineNumber = 12;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

[
  {
    "code": "public static void sort(Comparable[] a) {",
    "impl": "(function(that) {\n  sort(a) {\n})"
  },
  {
    "code": "  int N = a.length;",
    "impl": "(function(that) {\n    that.locals[\"N\"] = that.args[\"a\"].length;\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  for (int k = N / 2; k >= 1; k--) {",
    "impl": "(function(that) {\n    if (that.cache[\"3__firstIteration\"] === undefined) {\n      that.locals[\"k\"] = Math.floor(that.locals[\"N\"] / 2);\n      that.cache[\"3__firstIteration\"] = false;\n    } else {\n      that.locals[\"k\"]--;\n    }\n    if (that.locals[\"k\"] >= 1) {\n      that.nextLineNumber = 4;\n    } else {\n      that.nextLineNumber = 6;\n      that.locals[\"k\"] = undefined;\n      that.cache[\"3__firstIteration\"] = undefined;\n    }\n})"
  },
  {
    "code": "    sink(a, k, N);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"sink\",\n      undefined,\n      that.args[\"a\"],\n      that.locals[\"k\"],\n      that.locals[\"N\"]);\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  while (N > 1) {",
    "impl": "(function(that) {\n    if (that.locals[\"N\"] > 1) {\n      that.nextLineNumber = 7;\n    } else {\n      that.nextLineNumber = undefined;\n    }\n})"
  },
  {
    "code": "    exch(a, 1, N--);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"a\"],\n      1,\n      that.locals[\"N\"]--);\n    that.nextLineNumber = 8;\n})"
  },
  {
    "code": "    sink(a, 1, N);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"sink\",\n      undefined,\n      that.args[\"a\"],\n      1,\n      that.locals[\"N\"]);\n    that.nextLineNumber = 9;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

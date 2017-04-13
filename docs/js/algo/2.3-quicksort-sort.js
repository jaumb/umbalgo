[
  {
    "code": "private static void sort(Comparable[] a, int lo, int hi) {",
    "impl": "(function(that) {\n  sort(a, lo, hi) {\n})"
  },
  {
    "code": "  if (hi <= lo) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"hi\"] <= that.args[\"lo\"] ? 3 : 5;\n})"
  },
  {
    "code": "    return;",
    "impl": "(function(that) {\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  int j = partition(a, lo, hi);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"partition\",\n      function(result) {\n        that.locals[\"j\"] = result;\n        that.nextLineNumber = 6;\n      },\n      that.args[\"a\"],\n      that.args[\"lo\"],\n      that.args[\"hi\"]);\n})"
  },
  {
    "code": "  sort(a, lo, j - 1);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"sort\",\n      undefined,\n      that.args[\"a\"],\n      that.args[\"lo\"],\n      that.locals[\"j\"] - 1);\n    that.nextLineNumber = 7;\n})"
  },
  {
    "code": "  sort(a, j + 1, hi);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"sort\",\n      undefined,\n      that.args[\"a\"],\n      that.locals[\"j\"] + 1,\n      that.args[\"hi\"]);\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

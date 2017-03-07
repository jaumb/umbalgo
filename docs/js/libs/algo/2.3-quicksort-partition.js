[
  {
    "code": "private static int partition(Comparable[] a, int lo, int hi) {",
    "impl": "(function(that) {\n  partition(a, lo, hi) {\n})"
  },
  {
    "code": "  int i = lo;",
    "impl": "(function(that) {\n    that.locals[\"i\"] = that.args[\"lo\"];\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  int j = hi + 1;",
    "impl": "(function(that) {\n    that.locals[\"j\"] = that.args[\"hi\"] + 1;\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  Comparable v = a[lo];",
    "impl": "(function(that) {\n    that.locals[\"v\"] = that.args[\"a\"][that.args[\"lo\"]];\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  while (true) {",
    "impl": "(function(that) {\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "    while (less(a[++i], v)) {",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"less\",\n      function(result) { that.nextLineNumber = result ? 7 : 11; },\n      that.args[\"a\"][++that.locals[\"i\"]],\n      that.locals[\"v\"]);\n})"
  },
  {
    "code": "      if (i == hi) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"i\"] === that.args[\"hi\"] ? 8 : 10;\n})"
  },
  {
    "code": "        break;",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "      }",
    "impl": "(function(that) {\n    that.nextLineNumber = 10;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "    while (less(v, a[--j])) {",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"less\",\n      function(result) { that.nextLineNumber = result ? 12 : 16; },\n      that.locals[\"v\"],\n      that.args[\"a\"][--that.locals[\"j\"]]);\n})"
  },
  {
    "code": "      if (j == lo) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"j\"] === that.args[\"lo\"] ? 13 : 16;\n})"
  },
  {
    "code": "        break;",
    "impl": "(function(that) {\n    that.nextLineNumber = 16;\n})"
  },
  {
    "code": "      }",
    "impl": "(function(that) {\n    that.nextLineNumber = 15;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "    if (i >= j) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"i\"] >= that.locals[\"j\"] ? 17 : 19;\n})"
  },
  {
    "code": "      break;",
    "impl": "(function(that) {\n    that.nextLineNumber = 21;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 21;\n})"
  },
  {
    "code": "    exch(a, i, j);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"a\"],\n      that.locals[\"i\"],\n      that.locals[\"j\"]);\n    that.nextLineNumber = 22;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  exch(a, lo, j);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"a\"],\n      that.args[\"lo\"],\n      that.locals[\"j\"]);\n    that.nextLineNumber = 22;\n})"
  },
  {
    "code": "  return j;",
    "impl": "(function(that) {\n    that.result = that.locals[\"j\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

[
  {
    "code": "private static void exch(Comparable[] a, int i, int j) {",
    "impl": "(function(that) {\n  exch(a, i, j) {\n})"
  },
  {
    "code": "  Comparable t = a[i];",
    "impl": "(function(that) {\n    that.locals[\"t\"] = that.args[\"a\"][that.args[\"i\"]];\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  a[i] = a[j];",
    "impl": "(function(that) {\n    that.args[\"a\"][that.args[\"i\"]] = that.args[\"a\"][that.args[\"j\"]];\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  a[j] = t;",
    "impl": "(function(that) {\n    that.args[\"a\"][that.args[\"j\"]] = that.locals[\"t\"];\n    console.log(that.args[\"a\"]);\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

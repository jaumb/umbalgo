[
  {
    "code": "private void resize(int max) {",
    "impl": "(function(that) {\n  resize(max) {\n})"
  },
  {
    "code": "  Item[] temp = (Item[]) new Object[max];",
    "impl": "(function(that) {\n    that.locals[\"temp\"] = new Array(max);\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  for (int i = 0; i < N; i++) {",
    "impl": "(function(that) {\n    if (that.cache[\"3__firstIteration\"] === undefined) {\n      that.locals[\"i\"] = 0;\n      that.cache[\"3__firstIteration\"] = false;\n    } else {\n      that.locals[\"i\"]++;\n    }\n    if (that.locals[\"i\"] < that.globals[\"N\"]) {\n      that.nextLineNumber = 4;\n    } else {\n      that.nextLineNumber = 6;\n      that.locals[\"i\"] = undefined;\n      that.cache[\"3__firstIteration\"] = undefined;\n    }\n})"
  },
  {
    "code": "    temp[i] = a[i];",
    "impl": "(function(that) {\n    that.locals[\"temp\"][that.locals[\"i\"]] = that.globals[\"a\"][that.locals[\"i\"]];\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  a = temp;",
    "impl": "(function(that) {\n    that.globals[\"a\"] = that.locals[\"temp\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

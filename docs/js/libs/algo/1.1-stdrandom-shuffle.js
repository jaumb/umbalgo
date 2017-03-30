[
  {
    "code": "public static void shuffle(double[] a) {",
    "impl": "(function(that) {\n  shuffle(a) {\n})"
  },
  {
    "code": "  int N = a.length;",
    "impl": "(function(that) {\n    that.locals[\"N\"] = a.length;\n})"
  },
  {
    "code": "  for (int i = 0; i < N; i++) {",
    "impl": "(function(that) {\n    if (that.cache[\"3__firstIteration\"] === undefined) {\n      that.locals[\"i\"] = 0;\n      that.cache[\"3__firstIteration\"] = false;\n    } else {\n      that.locals[\"i\"]++;\n    }\n    if (that.locals[\"i\"] < that.locals[\"N\"]) {\n      that.nextLineNumber = 4;\n    } else {\n      that.nextLineNumber = undefined;\n      that.locals[\"i\"] = undefined;\n      that.cache[\"3__firstIteration\"] = undefined;\n    }\n})"
  },
  {
    "code": "    int r = i + StdRandom.uniform(N-i);",
    "impl": "(function(that) {\n    that.locals[\"r\"] = that.locals[\"i\"] + Math.floor(Math.random() * (that.locals[\"N\"] - that.locals[\"i\"]));\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "    double temp = a[i];",
    "impl": "(function(that) {\n    that.locals[\"temp\"] = that.args[\"a\"][that.locals[\"i\"]];\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "    a[i] = a[r];",
    "impl": "(function(that) {\n    that.args[\"a\"][that.locals[\"i\"]] = that.locals[\"r\"];\n    that.nextLineNumber = 7;\n})"
  },
  {
    "code": "    a[r] = temp;",
    "impl": "(function(that) {\n    that.args[\"a\"][that.locals[\"r\"]] = that.locals[\"temp\"]\n    that.nextLineNumber = 8;\n})"
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

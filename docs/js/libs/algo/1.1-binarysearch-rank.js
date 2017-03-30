[
  {
    "code": "public static int rank(int key, int[] a) {",
    "impl": "(function(that) {\n  rank(key, a) {\n})"
  },
  {
    "code": "  int lo  = 0;",
    "impl": "(function(that) {\n    locals[\"lo\"] = 0;\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  int hi = a.length - 1;",
    "impl": "(function(that) {\n    locals[\"hi\"] = that.args[\"a\"].length - 1;\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  while (lo <= hi) {",
    "impl": "(function(that) {\n    if (that.locals[\"lo\"] <= that.locals[\"hi\"]) {\n      that.nextLineNumber = 5;\n    } else {\n      that.nextLineNumber = 14;\n    }\n})"
  },
  {
    "code": "    int mid = lo + (hi - lo) / 2;",
    "impl": "(function(that) {\n    that.locals[\"mid\"] = that.locals[\"lo\"] + (that.locals[\"hi\"] - that.locals[\"lo\"]) / 2;\n})"
  },
  {
    "code": "    if (key < a[mid]) {",
    "impl": "(function(that) {\n    if (that.args[\"key\"] < that.args[\"a\"][that.locals[\"mid\"]]) {\n      that.nextLineNumber = 7;\n    } else {\n      that.nextLineNumber = 8;\n    }\n})"
  },
  {
    "code": "      hi = mid - 1;",
    "impl": "(function(that) {\n    that.locals[\"hi\"] = that.locals[\"mid\"] - 1;\n    that.nextLineNumber = 13;\n})"
  },
  {
    "code": "    } else if (key > a[mid]) {",
    "impl": "(function(that) {\n    if (that.args[\"key\"] > that.args[\"a\"][that.locals[\"mid\"]]) {\n      that.nextLineNumber = 9;\n    } else {\n      that.nextLineNumber = 11;\n    }\n})"
  },
  {
    "code": "      lo = mid + 1;",
    "impl": "(function(that) {\n    that.locals[\"lo\"] = that.locals[\"mid\"] + 1;\n    that.nextLineNumber = 13;\n})"
  },
  {
    "code": "    } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "      return mid;",
    "impl": "(function(that) {\n    that.result = that.locals[\"mid\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 13;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  return -1;",
    "impl": "(function(that) {\n    that.result = -1;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

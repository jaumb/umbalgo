[
  {
    "code": "public static void swim(Comparable[] a, int k) {",
    "impl": "(function(that) {\n  swim(a, k) {\n})"
  },
  {
    "code": "  while (k > 1 && less(a, k / 2, k)) {",
    "impl": "(function(that) {\n    if (that.args[\"k\"] > 1) {\n      that.vm.invokeFunc(\n        \"less\",\n        function(result) {\n          if (result) {\n            that.nextLineNumber = 3;\n          } else {\n            that.nextLineNumber = undefined;\n          }\n        },\n        that.args[\"a\"],\n        that.args[\"k\"] / 2,\n        that.args[\"k\"]);\n      that.nextLineNumber = 3;\n    } else {\n      that.nextLineNumber = undefined;\n    }\n})"
  },
  {
    "code": "    exch(a, k / 2, k);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"a\"],\n      that.args[\"k\"] / 2,\n      that.args[\"k\"]);\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "    k = k / 2;",
    "impl": "(function(that) {\n    that.locals[\"k\"] = that.locals[\"k\"] / 2;\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 2;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

[
    {
        "Java": "public static void sort(Comparable[] a) {",
        "JavaScript": "(function(that) {\n  sort(a) {\n})"
    },
    {
        "Java": "  int N = a.length;",
        "JavaScript": "(function(that) {\n    that.locals[\"N\"] = that.args[\"a\"].length;\n    that.nextLineNumber = 3;\n})"
    },
    {
        "Java": "  for (int i = 1; i < N; i++) {",
        "JavaScript": "(function(that) {\n    if (that.cache[\"3__firstIteration\"] === undefined) {\n      that.locals[\"i\"] = 1;\n      that.cache[\"3__firstIteration\"] = false;\n    } else {\n      that.locals[\"i\"]++;\n    }\n    if (that.locals[\"i\"] < that.locals[\"N\"]) {\n      that.nextLineNumber = 6;\n    } else {\n      that.nextLineNumber = undefined;\n      that.locals[\"i\"] = undefined;\n      that.cache[\"3__firstIteration\"] = undefined;\n    }\n})"
    },
    {
        "Java": "    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {",
        "JavaScript": "(function(that) {\n    if (that.cache[\"4__firstIteration\"] === undefined) {\n      that.locals[\"j\"] = that.locals[\"i\"];\n      that.cache[\"4__firstIteration\"] = false;\n    } else {\n      that.locals[\"j\"]--;\n    }\n    if (that.locals[\"j\"] > 0) {\n      that.vm.visualization.highlight([that.locals[\"j\"] - 1, that.locals[\"j\"]]);\n      that.vm.visualization.stepall();\n      that.vm.invokeFunc(\n        \"less\",\n        function(result) {\n          if (result) {\n            that.nextLineNumber = 5;\n          } else {\n            that.vm.visualization.unhighlight([that.locals[\"j\"] - 1, that.locals[\"j\"]]);\n            that.vm.visualization.stepall();\n            that.nextLineNumber = 7;\n            that.locals[\"j\"] = undefined;\n            that.cache[\"4__firstIteration\"] = undefined;\n          }\n        },\n        that.args[\"a\"][that.locals[\"j\"]],\n        that.args[\"a\"][that.locals[\"j\"] - 1]);\n    } else {\n      that.vm.visualization.updateBoundary(that.locals[\"i\"]);\n      that.vm.visualization.stepall();\n      that.nextLineNumber = 7;\n      that.locals[\"j\"] = undefined;\n      that.cache[\"4__firstIteration\"] = undefined;\n    }\n})"
    },
    {
        "Java": "      exch(a, j, j - 1);",
        "JavaScript": "(function(that) {\n    that.vm.visualization.swap(that.locals[\"j\"] - 1, that.locals[\"j\"]);\n    that.vm.visualization.unhighlight([that.locals[\"j\"] - 1, that.locals[\"j\"]]);\n    that.vm.visualization.stepall();\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"a\"],\n      that.locals[\"j\"],\n      that.locals[\"j\"] - 1);\n    that.nextLineNumber = 6;\n})"
    },
    {
        "Java": "    }",
        "JavaScript": "(function(that) {\n    that.nextLineNumber = 4;\n})"
    },
    {
        "Java": "  }",
        "JavaScript": "(function(that) {\n    that.nextLineNumber = 3;\n})"
    },
    {
        "Java": "}",
        "JavaScript": "(function(that) {\n  }\n  \n})"
    }
]

[
<<<<<<< Updated upstream
    {
        "Java": "private static boolean less(Comparable v, Comparable w) {",
        "JavaScript": "(function(that) {\n  less(v, w) {\n})"
    },
    {
        "Java": "  return v.compareTo(w) < 0;",
        "JavaScript": "(function(that) {\n    that.helpers[that.currentLineNumber - 1][\"v_lt_w\"] = (v < w);\n    that.nextLineNumber++;\n})"
    },
    {
        "Java": "}",
        "JavaScript": "(function(that) {\n    // This is the last line of the function, so set nextLineNumber undefined to\n    // indicate this to the runner.\n    that.nextLineNumber = undefined;\n    // Return through the result callback\n    that.runner.resultcb(that.helpers[that.currentLineNumber - 1][\"v_lt_w\"]);\n  }\n  \n})"
    }
=======
  {
    "Java": "private static boolean less(Comparable v, Comparable w) {",
    "JavaScript": "(function(that) {\n  less(v, w) {\n})"
  },
  {
    "Java": "  return v.compareTo(w) < 0;",
    "JavaScript": "(function(that) {\n    vm.setResult(that.args[\"v\"] < that.args[\"w\"]);\n    that.nextLine = undefined;\n})"
  },
  {
    "Java": "}",
    "JavaScript": "(function(that) {\n  }\n  \n})"
  }
>>>>>>> Stashed changes
]

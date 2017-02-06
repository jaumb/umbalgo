[
<<<<<<< Updated upstream
    {
        "Java": "private static void exch(Comparable[] a, int i, int j) {",
        "JavaScript": "(function(that) {\n  exch(a, i, j) {\n})"
    },
    {
        "Java": "  Comparable t = a[i];",
        "JavaScript": "(function(that) {\n    that.locals[\"t\"] = params[\"a\"][i];\n    that.nextLineNumber++;\n})"
    },
    {
        "Java": "  a[i] = a[j];",
        "JavaScript": "(function(that) {\n    params[\"a\"][i] = params[\"a\"][j];\n    that.nextLineNumber++;\n})"
    },
    {
        "Java": "  a[j] = t;",
        "JavaScript": "(function(that) {\n    params[\"a\"][j] = that.locals[\"t\"];\n    that.nextLineNumber++;\n})"
    },
    {
        "Java": "}",
        "JavaScript": "(function(that) {\n    // This is the last line of the function, so set nextLineNumber undefined to\n    // indicate this to the runner.\n    that.nextLineNumber = undefined;\n    // If this wasn't a void function, we would return a value through the provided\n    // resultcb callback. See less() for an example.\n  }\n  \n})"
    }
=======
  {
    "Java": "private static void exch(Comparable[] a, int i, int j) {",
    "JavaScript": "(function(that) {\n  exch(a, i, j) {\n})"
  },
  {
    "Java": "  Comparable t = a[i];",
    "JavaScript": "(function(that) {\n    that.locals[\"t\"] = that.args[\"a\"][that.args[\"i\"]];\n    that.nextLine = that.funcModel.getLine(3);\n})"
  },
  {
    "Java": "  a[i] = a[j];",
    "JavaScript": "(function(that) {\n    that.args[\"a\"][that.args[\"i\"]] = that.args[\"a\"][that.args[\"j\"]];\n    that.nextLine = that.funcModel.getLine(4);\n})"
  },
  {
    "Java": "  a[j] = t;",
    "JavaScript": "(function(that) {\n    that.args[\"a\"][that.args[\"j\"]] = that.locals[\"t\"];\n    console.log(a);\n    that.nextLine = undefined;\n})"
  },
  {
    "Java": "}",
    "JavaScript": "(function(that) {\n  }\n  \n})"
  }
>>>>>>> Stashed changes
]

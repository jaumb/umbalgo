[
<<<<<<< Updated upstream
    {
        "Java": "public static void sort(Comparable[] a) {",
        "JavaScript": "(function(that) {\n  sort(a) {\n})"
    },
    {
        "Java": "  int N = a.length;",
        "JavaScript": "(function(that) {\n    that.locals[\"N\"] = that.args[\"a\"].length;\n    // This tells the Runner what line to execute next.\n    that.nextLineNumber++;\n})"
    },
    {
        "Java": "  for (int i = 1; i < N; i++) {",
        "JavaScript": "(function(that) {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (that.helpers[that.currentLineNumber - 1][\"firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      that.locals[\"i\"] = 1;\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      that.helpers[that.currentLineNumber - 1][\"firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      that.locals[\"i\"]++;\n    }\n    // Check if the condition is true\n    if (that.locals[\"i\"] < that.locals[\"N\"]) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      that.nextLineNumber++;\n    } else {\n      // Otherwise, jump to past the loop body\n      that.nextLineNumber = 8;\n      // Cleanup helper map entried in case this is a nested loop and they get\n      // used again.\n      that.locals[\"i\"] = undefined;\n      that.helpers[2][\"firstIteration\"] = undefined;\n    }\n})"
    },
    {
        "Java": "    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {",
        "JavaScript": "(function(that) {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (that.helpers[3][\"firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      that.locals[\"j\"] = that.locals[\"i\"];\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      that.helpers[3][\"firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      that.locals[\"j\"]--;\n    }\n    // Check if the condition is true\n    if (that.locals[\"j\"] > 0\n        && that.runner.invoke(\"less\",\n                              undefined,\n                              (that.args[\"a\"][that.locals[\"j\"]],\n                               that.args[\"a\"][that.locals[\"j\"] - 1]))) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      that.nextLineNumber = 5;\n    } else {\n      // Otherwise, jump to past the loop body\n      that.nextLineNumber = 7;\n      // Cleanup helper map entried in case this is a nested loop and they get\n      // used again.\n      that.locals[\"j\"] = undefined;\n      that.helpers[2][\"firstIteration\"] = undefined;\n    }\n})"
    },
    {
        "Java": "      exch(a, j, j - 1);",
        "JavaScript": "(function(that) {\n    // Invoke exch. exch() is a function that was registered with the runner\n    // and is looked up by it's name as a string (the first argument to invoke()).\n    // The other arguments are the arguments to exch. exch is then invoked with\n    // said arguments and pushed on the call stack. Execution will then continue\n    // there until it returns the result through resultcb(x). Here, no callback\n    // is provided as exch() is a void function.\n    that.runner.invoke(\"exch\",\n                       undefined,\n                       that.args[\"a\"],\n                       that.locals[\"j\"],\n                       that.locals[\"j\"] - 1);\n    that.nextLineNumber = 6;\n})"
    },
    {
        "Java": "    }",
        "JavaScript": "(function(that) {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and nothing else.\n    that.nextLineNumber = 4;\n})"
    },
    {
        "Java": "  }",
        "JavaScript": "(function(that) {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and nothing else.\n    that.nextLineNumber = 3;\n})"
    },
    {
        "Java": "}",
        "JavaScript": "(function(that) {\n    // This is the last line of the function, so set nextLineNumber undefined to\n    // indicate this to the runner.\n    that.nextLineNumber = undefined;\n    // If this wasn't a void function, we would return a value through the provided\n    // resultcb callback. See less() for an example.\n  }\n  \n})"
    }
=======
  {
    "Java": "public static void sort(Comparable[] a) {",
    "JavaScript": "(function(that) {\n  sort(a) {\n})"
  },
  {
    "Java": "  int N = a.length;",
    "JavaScript": "(function(that) {\n    that.locals[\"N\"] = that.args[\"a\"].length;\n    // Tell the Runner which line should be executed next. If this were a\n    // conditional construct of some sort, we may need to jump over a block or\n    // back to the top of a loop. This was a simple assignment statement, so we\n    // just want to proceed to the next line.\n    that.nextLine = that.funcModel.getLine(3)\n})"
  },
  {
    "Java": "  for (int i = 0; i < N; i++) {",
    "JavaScript": "(function(that) {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (that.cache[\"3__firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      that.locals[\"i\"] = 0;\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      that.cache[\"3__firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      that.locals[\"i\"]++;\n    }\n    // Check if the condition is true\n    if (that.locals[\"i\"] < that.locals[\"N\"]) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      that.nextLine = that.funcModel.getLine(4);\n    } else {\n      // Otherwise, jump past the loop body\n      that.nextLine = undefined;\n      // Cleanup helper map entries in case this is a nested loop and they get\n      // used again.\n      that.locals[\"i\"] = undefined;\n      that.cache[\"3__firstIteration\"] = undefined;\n    }\n})"
  },
  {
    "Java": "    int min = i;",
    "JavaScript": "(function(that) {\n    that.locals[\"min\"] = that.locals[\"i\"];\n    that.nextLine = that.funcModel.getLine(5);\n})"
  },
  {
    "Java": "    for (int j = i + 1; j < N; j++) {",
    "JavaScript": "(function(that) {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (that.cache[\"5__firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      that.locals[\"j\"] = that.locals[\"i\"] + 1;\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      that.cache[\"5__firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      that.locals[\"j\"]++;\n    }\n    // Check if the condition is true\n    if (that.locals[\"j\"] < that.locals[\"N\"]) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      that.nextLine = that.funcModel.getLine(6);\n    } else {\n      // Otherwise, jump to past the loop body\n      that.nextLine = that.funcModel.getLine(9);\n      // Cleanup helper map entries in case this is a nested loop and they get\n      // used again.\n      that.locals[\"j\"] = undefined;\n      that.cache[\"5__firstIteration\"] = undefined;\n    }\n})"
  },
  {
    "Java": "      if (less(a[j], a[min]))",
    "JavaScript": "(function(that) {\n    // Invoke less() and store the result in the helpers map. The first argument\n    // to invoke() is the function name, followed by a callback that takes a\n    // single argument to recieve the return value. Any following arguments are\n    // passed on as parameters to the function being invoked.\n    that.vm.invokeFunc(\n      \"less\",\n      function(result) {\n        if(result === true) {\n          console.log('result=true');\n          that.nextLine = that.funcModel.getLine(7);\n        } else {\n          console.log('result=false');\n          that.nextLine = that.funcModel.getLine(8);\n        }\n        // Perhaps set a flag here to disable next() until the result callback\n        // has been triggered (that would be a race, though one that the human\n        // would likely lose...)?\n      },\n      that.args[\"a\"][that.locals[\"j\"]],\n      that.args[\"a\"][that.locals[\"min\"]]);\n})"
  },
  {
    "Java": "        min = j;",
    "JavaScript": "(function(that) {\n    // This is a simple assignment.\n    that.locals[\"min\"] = that.locals[\"j\"];\n    // Then advance to the next line.\n    that.nextLine = that.funcModel.getLine(8);\n})"
  },
  {
    "Java": "    }",
    "JavaScript": "(function(that) {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and do nothing else.\n    that.nextLine = that.funcModel.getLine(5);\n})"
  },
  {
    "Java": "    exch(a, i, min);",
    "JavaScript": "(function(that) {\n    // Invoke exch. exch() is a function that was registered with the runner\n    // and is looked up by it's name as a string (the first argument to invoke()).\n    // The other arguments are the arguments to exch. exch is then invoked with\n    // said arguments and pushed on the call stack. Execution will then continue\n    // there until it returns the result through resultcb(x). Here, no callback\n    // is provided as exch() is a void function.\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"a\"],\n      that.locals[\"i\"],\n      that.locals[\"min\"]);\n  \n    that.nextLine = that.funcModel.getLine(10);\n})"
  },
  {
    "Java": "  }",
    "JavaScript": "(function(that) {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and do nothing else.\n    that.nextLine = that.funcModel.getLine(3);\n})"
  },
  {
    "Java": "}",
    "JavaScript": "(function(that) {\n  }\n  \n})"
  }
>>>>>>> Stashed changes
]

[
    {
        "Java": "public static void sort(Comparable[] a) {",
        "JavaScript": "function() {\n  sort(a) {\n}"
    },
    {
        "Java": "  int N = a.length;",
        "JavaScript": "function() {\n    this.locals[\"N\"] = this.args[\"a\"].length;\n    // This tells the Runner what line to execute next.\n    this.nextLineNumber++;\n}"
    },
    {
        "Java": "  for (int i = 1; i < N; i++) {",
        "JavaScript": "function() {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (this.helpers[this.currentLineNumber - 1][\"firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      this.locals[\"i\"] = 1;\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      this.helpers[this.currentLineNumber - 1][\"firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      this.locals[\"i\"]++;\n    }\n    // Check if the condition is true\n    if (this.locals[\"i\"] < this.locals[\"N\"]) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      this.nextLineNumber++;\n    } else {\n      // Otherwise, jump to past the loop body\n      this.nextLineNumber = 8;\n      // Cleanup helper map entried in case this is a nested loop and they get\n      // used again.\n      this.locals[\"i\"] = undefined;\n      this.helpers[2][\"firstIteration\"] = undefined;\n    }\n}"
    },
    {
        "Java": "    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {",
        "JavaScript": "function() {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (this.helpers[3][\"firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      this.locals[\"j\"] = this.locals[\"i\"];\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      this.helpers[3][\"firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      this.locals[\"j\"]--;\n    }\n    // Check if the condition is true\n    if (this.locals[\"j\"] > 0\n        && this.runner.invoke(\"less\",\n                              undefined,\n                              (this.args[\"a\"][this.locals[\"j\"]],\n                               this.args[\"a\"][this.locals[\"j\"] - 1]))) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      this.nextLineNumber = 5;\n    } else {\n      // Otherwise, jump to past the loop body\n      this.nextLineNumber = 7;\n      // Cleanup helper map entried in case this is a nested loop and they get\n      // used again.\n      this.locals[\"j\"] = undefined;\n      this.helpers[2][\"firstIteration\"] = undefined;\n    }\n}"
    },
    {
        "Java": "      exch(a, j, j - 1);",
        "JavaScript": "function() {\n    // Invoke exch. exch() is a function that was registered with the runner\n    // and is looked up by it's name as a string (the first argument to invoke()).\n    // The other arguments are the arguments to exch. exch is then invoked with\n    // said arguments and pushed on the call stack. Execution will then continue\n    // there until it returns the result through resultcb(x). Here, no callback\n    // is provided as exch() is a void function.\n    this.runner.invoke(\"exch\",\n                       undefined,\n                       this.args[\"a\"],\n                       this.locals[\"j\"],\n                       this.locals[\"j\"] - 1);\n    this.nextLineNumber = 6;\n}"
    },
    {
        "Java": "    }",
        "JavaScript": "function() {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and nothing else.\n    this.nextLineNumber = 4;\n}"
    },
    {
        "Java": "  }",
        "JavaScript": "function() {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and nothing else.\n    this.nextLineNumber = 3;\n}"
    },
    {
        "Java": "}",
        "JavaScript": "function() {\n    // This is the last line of the function, so set nextLineNumber undefined to\n    // indicate this to the runner.\n    this.nextLineNumber = undefined;\n    // If this wasn't a void function, we would return a value through the provided\n    // resultcb callback. See less() for an example.\n  }\n  \n}"
    }
]

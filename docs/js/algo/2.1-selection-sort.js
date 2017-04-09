[
  {
    "code": "public static void sort(Comparable[] a) {",
    "impl": "(function(that) {\n  sort(a) {\n})"
  },
  {
    "code": "  int N = a.length;",
    "impl": "(function(that) {\n    that.locals[\"N\"] = that.args[\"a\"].length;\n    // Tell the Runner which line should be executed next. If this were a\n    // conditional construct of some sort, we may need to jump over a block or\n    // back to the top of a loop. This was a simple assignment statement, so we\n    // just want to proceed to the next line.\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  for (int i = 0; i < N; i++) {",
    "impl": "(function(that) {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (that.cache[\"3__firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      that.locals[\"i\"] = 0;\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      that.cache[\"3__firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      that.locals[\"i\"]++;\n    }\n    // Check if the condition is true\n    if (that.locals[\"i\"] < that.locals[\"N\"]) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      that.nextLineNumber = 4;\n    } else {\n      // Otherwise, jump past the loop body\n      that.nextLineNumber = undefined;\n      // Cleanup helper map entries in case this is a nested loop and they get\n      // used again.\n      that.locals[\"i\"] = undefined;\n      that.cache[\"3__firstIteration\"] = undefined;\n    }\n})"
  },
  {
    "code": "    int min = i;",
    "impl": "(function(that) {\n    that.locals[\"min\"] = that.locals[\"i\"];\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "    for (int j = i + 1; j < N; j++) {",
    "impl": "(function(that) {\n    // Check if this is the first iteration of this loop. If it isn't, there'd be\n    // an entry in this line's helpers map to indicate so.\n    if (that.cache[\"5__firstIteration\"] === undefined) {\n      // This is the first iteration, so perform the initialization.\n      that.locals[\"j\"] = that.locals[\"i\"] + 1;\n      // Add entry to helpers map so that next time we know not to reinitialize.\n      that.cache[\"5__firstIteration\"] = false;\n    } else {\n      // This isn't the first iteration, so perform the update instead.\n      that.locals[\"j\"]++;\n    }\n    // Check if the condition is true\n    if (that.locals[\"j\"] < that.locals[\"N\"]) {\n      // If so, proceed to the next line, which is the first line of the body of\n      // the loop.\n      that.nextLineNumber = 6;\n    } else {\n      // Otherwise, jump to past the loop body\n      that.nextLineNumber = 9;\n      // Cleanup helper map entries in case this is a nested loop and they get\n      // used again.\n      that.locals[\"j\"] = undefined;\n      that.cache[\"5__firstIteration\"] = undefined;\n    }\n})"
  },
  {
    "code": "      if (less(a[j], a[min]))",
    "impl": "(function(that) {\n    // Invoke less() and store the result in the helpers map. The first argument\n    // to invoke() is the function name, followed by a callback that takes a\n    // single argument to recieve the return value. Any following arguments are\n    // passed on as parameters to the function being invoked.\n    that.vm.invokeFunc(\n      \"less\",\n      function(result) { that.nextLineNumber = result ? 7 : 8 },\n      that.args[\"a\"][that.locals[\"j\"]],\n      that.args[\"a\"][that.locals[\"min\"]]);\n})"
  },
  {
    "code": "        min = j;",
    "impl": "(function(that) {\n    // This is a simple assignment.\n    that.locals[\"min\"] = that.locals[\"j\"];\n    // Then advance to the next line.\n    that.nextLineNumber = 8;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and do nothing else.\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "    exch(a, i, min);",
    "impl": "(function(that) {\n    // Invoke exch. exch() is a function that was registered with the runner\n    // and is looked up by it's name as a string (the first argument to invoke()).\n    // The other arguments are the arguments to exch. exch is then invoked with\n    // said arguments and pushed on the call stack. Execution will then continue\n    // there until it returns the result through resultcb(x). Here, no callback\n    // is provided as exch() is a void function.\n    that.vm.invokeFunc(\n      \"exch\",\n      undefined,\n      that.args[\"a\"],\n      that.locals[\"i\"],\n      that.locals[\"min\"]);\n  \n    that.nextLineNumber = 10;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    // The closing bracket of a for loop should always jump back to the top of the\n    // loop and do nothing else.\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

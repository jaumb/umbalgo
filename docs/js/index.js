const exch = [
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
];

////////////////////////////////////////////////////////////////////////////////

const less = [
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
];

////////////////////////////////////////////////////////////////////////////////

const sort = [
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
];

////////////////////////////////////////////////////////////////////////////////

const runner = new Runner();

runner.register("exch", function() {
  return new ForeignFunction(runner, function(result) { alert(result); }, exch);
});

runner.register("less", function() {
  return new ForeignFunction(runner, function(result) { alert(result); }, less);
});

runner.register("sort", function() {
  return new ForeignFunction(runner, function(result) { alert(result); }, sort);
});

const onInvokeSort = function() {
  let a = [86, 71, 10, 75, 73, 64, 87, 23, 41];
  console.log(a);
  runner.invoke("sort", function(result) { alert(result); }, a);
};

const onStep = function() {
  runner.next();
};

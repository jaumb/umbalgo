[
    {
        "Java": "private static void exch(Comparable[] a, int i, int j) {",
        "JavaScript": "function() {\n  exch(a, i, j) {\n}"
    },
    {
        "Java": "  Comparable t = a[i];",
        "JavaScript": "function() {\n    this.locals[\"t\"] = params[\"a\"][i];\n    this.nextLineNumber++;\n}"
    },
    {
        "Java": "  a[i] = a[j];",
        "JavaScript": "function() {\n    params[\"a\"][i] = params[\"a\"][j];\n    this.nextLineNumber++;\n}"
    },
    {
        "Java": "  a[j] = t;",
        "JavaScript": "function() {\n    params[\"a\"][j] = this.locals[\"t\"];\n    this.nextLineNumber++;\n}"
    },
    {
        "Java": "}",
        "JavaScript": "function() {\n    // This is the last line of the function, so set nextLineNumber undefined to\n    // indicate this to the runner.\n    this.nextLineNumber = undefined;\n    // If this wasn't a void function, we would return a value through the provided\n    // resultcb callback. See less() for an example.\n  }\n  \n}"
    }
]

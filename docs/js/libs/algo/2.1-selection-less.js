[
    {
        "Java": "private static boolean less(Comparable v, Comparable w) {",
        "JavaScript": "function() {\n  less(v, w) {\n}"
    },
    {
        "Java": "  return v.compareTo(w) < 0;",
        "JavaScript": "function() {\n    this.helpers[this.currentLineNumber - 1][\"v_lt_w\"] = (v < w);\n    this.nextLineNumber++;\n}"
    },
    {
        "Java": "}",
        "JavaScript": "function() {\n    // This is the last line of the function, so set nextLineNumber undefined to\n    // indicate this to the runner.\n    this.nextLineNumber = undefined;\n    // Return through the result callback\n    this.runner.resultcb(this.helpers[this.currentLineNumber - 1][\"v_lt_w\"]);\n  }\n  \n}"
    }
]

[
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
        "JavaScript": "(function(that) {\n    that.args[\"a\"][that.args[\"j\"]] = that.locals[\"t\"];\n    console.log(that.args[\"a\"]);\n    that.nextLine = undefined;\n})"
    },
    {
        "Java": "}",
        "JavaScript": "(function(that) {\n  }\n  \n})"
    }
]

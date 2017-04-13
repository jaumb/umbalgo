[
  {
    "code": "private Value get(Node x, Key key) {",
    "impl": "(function(that) {\n  get(x, key) {\n})"
  },
  {
    "code": "  if (x == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"] === null ? 3 : 5;\n})"
  },
  {
    "code": "    return null;",
    "impl": "(function(that) {\n    that.result = null;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  int cmp = key.compareTo(x.key);",
    "impl": "(function(that) {\n    if (that.args[\"key\"] < that.args[\"x\"].key) {\n      that.locals[\"cmp\"] = 1;\n    } else if (that.args[\"key\"] > that.args[\"x\"].key) {\n      that.locals[\"cmp\"] = -1;\n    } else {\n      that.locals[\"cmp\"] = 0;\n    }\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "  if (cmp < 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmp\"] < 0 ? 7 : 8;\n})"
  },
  {
    "code": "    return get(x.left, key);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"get\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = undefined;\n      },\n      that.args[\"x\"].left,\n      that.args[\"key\"]);\n})"
  },
  {
    "code": "  } else if (cmp > 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmp\"] > 0 ? 9 : 11;\n})"
  },
  {
    "code": "    return get(x.right, key);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"get\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = undefined;\n      },\n      that.args[\"x\"].right,\n      that.args[\"key\"]);\n})"
  },
  {
    "code": "  } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n    // Code:    return x.val;\n    that.result = that.args[\"x\"].val;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n  \n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  \n})"
  }
]

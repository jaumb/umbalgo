[
  {
    "code": "private Node floor(Node x, Key key) {",
    "impl": "(function(that) {\n  floor(x, key) {\n})"
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
    "impl": "(function(that) {\n  if (that.args[\"key\"] < that.args[\"x\"].key) {\n      that.locals[\"cmp\"] = 1;\n    } else if (that.args[\"key\"] > that.args[\"x\"].key) {\n      that.locals[\"cmp\"] = -1;\n    } else {\n      that.locals[\"cmp\"] = 0;\n    }\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "  if (cmp == 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmp\"] === 0 ? 7 : 9;\n})"
  },
  {
    "code": "    return x;",
    "impl": "(function(that) {\n    that.result = that.args[\"x\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 9;\n})"
  },
  {
    "code": "  if (cmp < 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmp\"] < 0 ? 10 : 12;\n})"
  },
  {
    "code": "    return floor(x.left, key);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"floor\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = undefined;\n      },\n      that.args[\"x\"].left,\n      that.args[\"key\"]);\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 12;\n})"
  },
  {
    "code": "  Node t = floor(x.right, key);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"floor\",\n      function(result) {\n        that.locals[\"t\"] = result;\n        that.nextLineNumber = 13;\n      },\n      that.args[\"x\"].right,\n      that.args[\"key\"]);\n})"
  },
  {
    "code": "  if (t != null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"t\"] !== null ? 14 : 16;\n})"
  },
  {
    "code": "    return t;",
    "impl": "(function(that) {\n    that.result = that.locals[\"t\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 16;\n})"
  },
  {
    "code": "    return x;",
    "impl": "(function(that) {\n    that.result = that.args[\"x\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  \n})"
  }
]

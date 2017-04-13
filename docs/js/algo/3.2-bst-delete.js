[
  {
    "code": "private Node delete(Node x, Key key) {",
    "impl": "(function(that) {\n  delete_(x, key) {\n})"
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
    "code": "    x.left  = delete(x.left,  key);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"delete_\",\n      function(result) {\n        that.args[\"x\"].left = result;\n        that.nextLineNumber = 8;\n      },\n      that.args[\"x\"].left,\n      that.args[\"key\"]);\n})"
  },
  {
    "code": "  } else if (cmp > 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmp\"] > 0 ? 9 : 11;\n})"
  },
  {
    "code": "    x.right = delete(x.right, key);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"delete_\",\n      function(result) {\n        that.args[\"x\"].right = result;\n        that.nextLineNumber = 11;\n      },\n      that.args[\"x\"].right,\n      that.args[\"key\"]);\n})"
  },
  {
    "code": "  } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "    if (x.right == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"].right === null ? 12 : 14;\n})"
  },
  {
    "code": "      return x.left;",
    "impl": "(function(that) {\n    that.result = that.args[\"x\"].left;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 14;\n})"
  },
  {
    "code": "    if (x.left == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"].left === null ? 15 : 17;\n})"
  },
  {
    "code": "      return x.right;",
    "impl": "(function(that) {\n    that.results = that.args[\"x\"].right;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "    }",
    "impl": "(function(that) {\n    that.nextLineNumber = 17;\n})"
  },
  {
    "code": "    Node t = x;",
    "impl": "(function(that) {\n    that.locals[\"t\"] = x;\n    that.nextLineNumber = 18;\n})"
  },
  {
    "code": "    x = min(t.right);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"min\",\n      function(result) {\n        that.args[\"x\"] = result;\n        that.nextLineNumber = 19;\n      },\n      that.locals[\"t\"].right);\n})"
  },
  {
    "code": "    x.right = deleteMin(t.right);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"deleteMin\",\n      function(result) {\n        that.args[\"x\"].right = result;\n        that.nextLineNumber = 20;\n      },\n    that.locals[\"t\"].right);\n})"
  },
  {
    "code": "    x.left = t.left;",
    "impl": "(function(that) {\n    that.args[\"x\"].left = that.locals[\"t\"].left;\n    that.nextLineNumber = 21;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 22;\n})"
  },
  {
    "code": "  x.N = size(x.left) + size(x.right) + 1;",
    "impl": "(function(that) {\n    that.args[\"x\"].N = (that.args[\"x\"].left === null ? 0 : that.args[\"x\"].left.N)\n      + (that.args[\"x\"].right === null ? 0 : that.args[\"x\"].right.N) + 1;\n    that.nextLineNumber = 23;\n})"
  },
  {
    "code": "  return x;",
    "impl": "(function(that) {\n    that.result = that.args[\"x\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  \n})"
  }
]

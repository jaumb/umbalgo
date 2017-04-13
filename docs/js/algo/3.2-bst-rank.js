[
  {
    "code": "private int rank(Key key, Node x) {",
    "impl": "(function(that) {\n  rank(key, x) {\n})"
  },
  {
    "code": "  if (x == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"] === null\n})"
  },
  {
    "code": "    return 0;",
    "impl": "(function(that) {\n    that.result = 0;\n    that.nextLineNumber = undefined;\n})"
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
    "code": "    return rank(key, x.left);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"rank\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = undefined;\n      },\n    that.args[\"key\"],\n    that.args[\"x\"].left);\n})"
  },
  {
    "code": "  } else if (cmp > 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmp\"] > 0 ? 9 : 11;\n})"
  },
  {
    "code": "    return 1 + size(x.left) + rank(key, x.right);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"rank\",\n      function(result) {\n        that.result = 1 + (that.args[\"x\"].left === null ? 0 : that.args[\"x\"].left.N) + result;\n        that.nextLineNumber = undefined;\n      },\n    that.args[\"key\"],\n    that.args[\"x\"].right);\n})"
  },
  {
    "code": "  } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "    return size(x.left);",
    "impl": "(function(that) {\n    that.result = that.args[\"x\"].left === null ? 0 : that.args[\"x\"].left.N;\n    that.nextLineNumber = undefined;\n})"
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

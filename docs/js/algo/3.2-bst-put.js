[
  {
    "code": "private Node put(Node x, Key key, Value val) {",
    "impl": "(function(that) {\n  put(x, key, val) {\n})"
  },
  {
    "code": "  if (x == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"] === null ? 3 : 5;\n})"
  },
  {
    "code": "    return new Node(key, val, 1);",
    "impl": "(function(that) {\n    that.result = {\n      \"key\": that.args[\"key\"],\n      \"value\": that.args[\"val\"],\n      \"N\": 1\n    };\n    that.nextLineNumber = undefined;\n})"
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
    "code": "    x.left = put(x.left,  key, val);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"put\",\n      function(result) {\n        that.args[\"x\"].left = result;\n        that.nextLineNumber = 8;\n      },\n      that.args[\"x\"].left,\n      that.args[\"key\"],\n      that.args[\"val\"]);\n})"
  },
  {
    "code": "  } else if (cmp > 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmp\"] > 0 ? 9 : 11;\n})"
  },
  {
    "code": "    x.right = put(x.right, key, val);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"put\",\n      function(result) {\n        that.args[\"x\"].right = result;\n        that.nextLineNumber = 11;\n      },\n      that.args[\"x\"].right,\n      that.args[\"key\"],\n      that.args[\"val\"]);\n})"
  },
  {
    "code": "  } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "    x.val = val;",
    "impl": "(function(that) {\n    that.args[\"x\"].val = that.args[\"val\"];\n    that.nextLineNumber = 13;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 13;\n})"
  },
  {
    "code": "  x.N = size(x.left) + size(x.right) + 1;",
    "impl": "(function(that) {\n    that.args[\"x\"].N = (that.args[\"x\"].left === null ? 0 : that.args[\"x\"].left.N)\n      + (that.args[\"x\"].right === null ? 0 : that.args[\"x\"].right.N) + 1;\n    that.nextLineNumber = 14;\n})"
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

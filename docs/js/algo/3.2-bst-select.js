[
  {
    "code": "private Node select(Node x, int k) {",
    "impl": "(function(that) {\n  select(x, k) {\n})"
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
    "code": "  int t = size(x.left);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"size\",\n      function(result) {\n        that.locals[\"t\"] = result;\n        that.nextLineNumber = 6;\n      },\n      that.args[\"x\"].left);\n})"
  },
  {
    "code": "  if (t > k) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"t\"] > that.args[\"k\"]  ? 7 : 8;\n})"
  },
  {
    "code": "    return select(x.left, k);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"select\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = 8;\n      },\n      that.args[\"x\"].left,\n      that.args[\"k\"]);\n})"
  },
  {
    "code": "  } else if (t < k) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"t\"] < that.args[\"k\"]  ? 9 : 11;\n})"
  },
  {
    "code": "    return select(x.right, k-t-1);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"select\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = 11;\n      },\n      that.args[\"x\"].right,\n      that.args[\"k\"] - that.locals[\"t\"] - 1);\n})"
  },
  {
    "code": "  } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
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
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

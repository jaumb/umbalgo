[
  {
    "code": "private Node deleteMax(Node x) {",
    "impl": "(function(that) {\n  deleteMax(x) {\n})"
  },
  {
    "code": "  if (x.left == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"].left === null ? 3 : 5;\n})"
  },
  {
    "code": "    return x.left;",
    "impl": "(function(that) {\n    that.result = that.args[\"x\"].left;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  x.left = deleteMin(x.left);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"deleteMin\",\n      function(result) {\n        that.args[\"x\"].left = result;\n        that.nextLineNumber = 6;\n      },\n      that.locals[\"x\"].left);\n})"
  },
  {
    "code": "  x.N = size(x.left) + size(x.left) + 1;",
    "impl": "(function(that) {\n    that.args[\"x\"].N = (that.args[\"x\"].left === null ? 0 : that.args[\"x\"].left.N)\n      + (that.args[\"x\"].left === null ? 0 : that.args[\"x\"].left.N) + 1;\n    that.nextLineNumber = 7;\n})"
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
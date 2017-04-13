[
  {
    "code": "private Node min(Node x) {",
    "impl": "(function(that) {\n  min(x) {\n})"
  },
  {
    "code": "  if (x.left == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"].left === null ? 3 : 5;\n})"
  },
  {
    "code": "    return x;",
    "impl": "(function(that) {\n    that.result = that.args[\"x\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  return min(x.left);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"min\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = undefined;\n      },\n      that.locals[\"x\"].left);\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

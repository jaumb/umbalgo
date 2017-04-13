[
  {
    "code": "private Node max(Node x) {",
    "impl": "(function(that) {\n  max(x) {\n})"
  },
  {
    "code": "  if (x.right == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"].right === null ? 3 : 5;\n})"
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
    "code": "  return min(x.right);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"min\",\n      function(result) {\n        that.result = result;\n        that.nextLineNumber = undefined;\n      },\n      that.locals[\"x\"].right);\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

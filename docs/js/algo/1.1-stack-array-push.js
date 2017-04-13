[
  {
    "code": "public void push(Item item) {",
    "impl": "(function(that) {\n  push(item) {\n})"
  },
  {
    "code": "  if (N == a.length) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.globals[\"N\"] == that.globals[\"a\"] ? 3 : 5;\n})"
  },
  {
    "code": "    resize(2 * a.length);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"resize\",\n      undefined,\n      2 * that.globals[\"a\"].length);\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  a[N++] = item;",
    "impl": "(function(that) {\n    that.globals[\"a\"][that.globals[\"N\"]++] = that.locals[\"item\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

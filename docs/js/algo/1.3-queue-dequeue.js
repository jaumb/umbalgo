[
  {
    "code": "public void dequeue(Item item) {",
    "impl": "(function(that) {\n  dequeue(item) {\n})"
  },
  {
    "code": "  Item item = first.item;",
    "impl": "(function(that) {\n    that.locals[\"item\"] = that.globals[\"first\"].item;\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  first = first.next;",
    "impl": "(function(that) {\n    that.globals[\"first\"] = that.globals[\"first\"].next;\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  if (isEmpty()) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.globals[\"first\"] == null ? 5 : 7;\n})"
  },
  {
    "code": "    last = null;",
    "impl": "(function(that) {\n    that.locals[\"last\"] = null;\n    that.nextLineNumber = 7;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 7;\n})"
  },
  {
    "code": "  N--;",
    "impl": "(function(that) {\n    that.globals[\"N\"]--;\n    that.nextLineNumber = 8;\n})"
  },
  {
    "code": "  return item;",
    "impl": "(function(that) {\n    that.result = item;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

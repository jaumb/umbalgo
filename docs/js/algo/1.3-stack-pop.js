[
  {
    "code": "public Item pop() {",
    "impl": "(function(that) {\n  pop() {\n})"
  },
  {
    "code": "  Item item = first.item;",
    "impl": "(function(that) {\n    that.locals[\"item\"] = that.vm.globals[\"first\"][\"item\"];\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  first = first.next;",
    "impl": "(function(that) {\n    that.vm.globals[\"first\"] = that.vm.globals[\"first\"][\"next\"];\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  N--;",
    "impl": "(function(that) {\n    that.vm.globals[\"N\"]--;\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  return item;",
    "impl": "(function(that) {\n    that.result = that.locals[\"item\"];\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

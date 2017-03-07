[
  {
    "code": "public void push(Item item) {",
    "impl": "(function(that) {\n  push(item) {\n})"
  },
  {
    "code": "  Node oldfirst = first;",
    "impl": "(function(that) {\n    that.locals[\"oldfirst\"] = that.vm.globals[\"first\"];\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  first = new Node();",
    "impl": "(function(that) {\n    that.vm.globals[\"first\"] = {\n      \"item\": null,\n      \"next\": null\n    };\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  first.item = item;",
    "impl": "(function(that) {\n    that.vm.globals[\"first\"][\"item\"] = that.args[\"item\"];\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  first.next = oldfirst;",
    "impl": "(function(that) {\n    that.vm.globals[\"first\"][\"next\"] = that.locals[\"oldfirst\"];\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "  N++;",
    "impl": "(function(that) {\n    that.vm.globals[\"N\"]++;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

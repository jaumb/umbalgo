[
  {
    "code": "public void enqueue(Item item) {",
    "impl": "(function(that) {\n  enqueue(item) {\n})"
  },
  {
    "code": "  Node oldlast = last;",
    "impl": "(function(that) {\n    that.locals[\"oldlast\"] = that.globals[\"last\"];\n    that.nextLineNumber = 3;\n})"
  },
  {
    "code": "  last = new Node();",
    "impl": "(function(that) {\n    that.locals[\"last\"] = {\n      \"item\": null,\n      \"next\": null\n    };\n    that.nextLineNumber = 4;\n})"
  },
  {
    "code": "  last.item = item;",
    "impl": "(function(that) {\n    that.locals[\"last\"].item = item;\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  last.next = null;",
    "impl": "(function(that) {\n    that.locals[\"last\"].next = next;\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "  if (isEmpty()) {",
    "impl": "(function(that) {\n    if (!that.globals[\"first\"]) {\n      that.nextLineNumber = 7;\n    } else {\n      that.nextLineNumber = 9;\n    }\n})"
  },
  {
    "code": "    first = last;",
    "impl": "(function(that) {\n    that.globals[\"first\"] = that.globals[\"last\"];\n})"
  },
  {
    "code": "  } else {",
    "impl": "(function(that) {\n    that.nextLineNumber = 9;\n})"
  },
  {
    "code": "    oldlast.next = last;",
    "impl": "(function(that) {\n    that.locals[\"oldlast\"].next = last;\n    that.nextLineNumber = 10;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 11;\n})"
  },
  {
    "code": "  N++;",
    "impl": "(function(that) {\n    that.globals[\"N\"]++;\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  }\n  \n})"
  }
]

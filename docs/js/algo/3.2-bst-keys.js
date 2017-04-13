[
  {
    "code": "private void keys(Node x, Queue<Key> queue, Key lo, Key hi) {",
    "impl": "(function(that) {\n  keys(x, queue, lo, hi) {\n})"
  },
  {
    "code": "  if (x == null) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.args[\"x\"] == null ? 3 : 5;\n})"
  },
  {
    "code": "    return;",
    "impl": "(function(that) {\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 5;\n})"
  },
  {
    "code": "  int cmplo = lo.compareTo(x.key);",
    "impl": "(function(that) {\n    if (that.args[\"lo\"] < that.args[\"x\"].key) {\n      that.locals[\"cmplo\"] = 1;\n    } else if (that.args[\"lo\"] > that.args[\"x\"].key) {\n      that.locals[\"cmplo\"] = -1;\n    } else {\n      that.locals[\"cmplo\"] = 0;\n    }\n    that.nextLineNumber = 6;\n})"
  },
  {
    "code": "  int cmphi = hi.compareTo(x.key);",
    "impl": "(function(that) {\n    if (that.args[\"hi\"] < that.args[\"x\"].key) {\n      that.locals[\"cmphi\"] = 1;\n    } else if (that.args[\"hi\"] > that.args[\"x\"].key) {\n      that.locals[\"cmphi\"] = -1;\n    } else {\n      that.locals[\"cmphi\"] = 0;\n    }\n    that.nextLineNumber = 7;\n})"
  },
  {
    "code": "  if (cmplo < 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmplo\"] < 0 ? 8 : 10;\n})"
  },
  {
    "code": "    keys(x.left, queue, lo, hi);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"keys\",\n      function(result) {\n        that.nextLineNumber = 10;\n      },\n      that.args[\"x\"].left,\n      that.args[\"queue\"],\n      that.args[\"lo\"],\n      that.args[\"hi\"]);\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 10;\n})"
  },
  {
    "code": "  if (cmplo <= 0 && cmphi >= 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmplo\"] <= 0 && that.locals[\"cmphi\"] >= 0 ? 11 : 13;\n})"
  },
  {
    "code": "    queue.enqueue(x.key);",
    "impl": "(function(that) {\n    that.args[\"queue\"].push(that.args[\"x\"].key);\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = 13;\n})"
  },
  {
    "code": "  if (cmphi > 0) {",
    "impl": "(function(that) {\n    that.nextLineNumber = that.locals[\"cmphi\"] > 0 ? 14 : undefined;\n})"
  },
  {
    "code": "    keys(x.right, queue, lo, hi);",
    "impl": "(function(that) {\n    that.vm.invokeFunc(\n      \"keys\",\n      function(result) {\n        that.nextLineNumber = undefined;\n      },\n      that.args[\"x\"].right,\n      that.args[\"queue\"],\n      that.args[\"lo\"],\n      that.args[\"hi\"]);\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "  }",
    "impl": "(function(that) {\n    that.nextLineNumber = undefined;\n})"
  },
  {
    "code": "}",
    "impl": "(function(that) {\n  \n})"
  }
]

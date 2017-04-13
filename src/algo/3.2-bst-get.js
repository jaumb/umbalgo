// Code:private Value get(Node x, Key key) {
get(x, key) {
// Code:  if (x == null) {
  that.nextLineNumber = that.args["x"] === null ? 3 : 5;
// Code:    return null;
  that.result = null;
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  int cmp = key.compareTo(x.key);
  if (that.args["key"] < that.args["x"].key) {
    that.locals["cmp"] = 1;
  } else if (that.args["key"] > that.args["x"].key) {
    that.locals["cmp"] = -1;
  } else {
    that.locals["cmp"] = 0;
  }
  that.nextLineNumber = 6;
// Code:  if (cmp < 0) {
  that.nextLineNumber = that.locals["cmp"] < 0 ? 7 : 8;
// Code:    return get(x.left, key);
  that.vm.invokeFunc(
    "get",
    function(result) {
      that.result = result;
      that.nextLineNumber = undefined;
    },
    that.args["x"].left,
    that.args["key"]);
// Code:  } else if (cmp > 0) {
  that.nextLineNumber = that.locals["cmp"] > 0 ? 9 : 11;
// Code:    return get(x.right, key);
  that.vm.invokeFunc(
    "get",
    function(result) {
      that.result = result;
      that.nextLineNumber = undefined;
    },
    that.args["x"].right,
    that.args["key"]);
// Code:  } else {
  that.nextLineNumber = 11;
  // Code:    return x.val;
  that.result = that.args["x"].val;
  that.nextLineNumber = undefined;
// Code:  }

// Code:}

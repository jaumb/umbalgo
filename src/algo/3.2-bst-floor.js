// Code:private Node floor(Node x, Key key) {
floor(x, key) {
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
// Code:  if (cmp == 0) {
  that.nextLineNumber = that.locals["cmp"] === 0 ? 7 : 9;
// Code:    return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 9;
// Code:  if (cmp < 0) {
  that.nextLineNumber = that.locals["cmp"] < 0 ? 10 : 12;
// Code:    return floor(x.left, key);
  that.vm.invokeFunc(
    "floor",
    function(result) {
      that.result = result;
      that.nextLineNumber = undefined;
    },
    that.args["x"].left,
    that.args["key"]);
// Code:  }
  that.nextLineNumber = 12;
// Code:  Node t = floor(x.right, key);
  that.vm.invokeFunc(
    "floor",
    function(result) {
      that.locals["t"] = result;
      that.nextLineNumber = 13;
    },
    that.args["x"].right,
    that.args["key"]);
// Code:  if (t != null) {
  that.nextLineNumber = that.locals["t"] !== null ? 14 : 16;
// Code:    return t;
  that.result = that.locals["t"];
  that.nextLineNumber = undefined;
// Code:  } else {
  that.nextLineNumber = 16;
// Code:    return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = undefined;
// Code:}

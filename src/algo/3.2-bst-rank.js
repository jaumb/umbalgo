// Code:private int rank(Key key, Node x) {
rank(key, x) {
// Code:  if (x == null) {
  that.nextLineNumber = that.args["x"] === null
// Code:    return 0;
  that.result = 0;
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
// Code:    return rank(key, x.left);
  that.vm.invokeFunc(
    "rank",
    function(result) {
      that.result = result;
      that.nextLineNumber = undefined;
    },
  that.args["key"],
  that.args["x"].left);
// Code:  } else if (cmp > 0) {
  that.nextLineNumber = that.locals["cmp"] > 0 ? 9 : 11;
// Code:    return 1 + size(x.left) + rank(key, x.right);
  that.vm.invokeFunc(
    "rank",
    function(result) {
      that.result = 1 + (that.args["x"].left === null ? 0 : that.args["x"].left.N) + result;
      that.nextLineNumber = undefined;
    },
  that.args["key"],
  that.args["x"].right);
// Code:  } else {
  that.nextLineNumber = 11;
// Code:    return size(x.left);
  that.result = that.args["x"].left === null ? 0 : that.args["x"].left.N;
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = undefined;
// Code:}

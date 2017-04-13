// Code:private Node delete(Node x, Key key) {
delete_(x, key) {
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
// Code:    x.left  = delete(x.left,  key);
  that.vm.invokeFunc(
    "delete_",
    function(result) {
      that.args["x"].left = result;
      that.nextLineNumber = 8;
    },
    that.args["x"].left,
    that.args["key"]);
// Code:  } else if (cmp > 0) {
  that.nextLineNumber = that.locals["cmp"] > 0 ? 9 : 11;
// Code:    x.right = delete(x.right, key);
  that.vm.invokeFunc(
    "delete_",
    function(result) {
      that.args["x"].right = result;
      that.nextLineNumber = 11;
    },
    that.args["x"].right,
    that.args["key"]);
// Code:  } else {
  that.nextLineNumber = 11;
// Code:    if (x.right == null) {
  that.nextLineNumber = that.args["x"].right === null ? 12 : 14;
// Code:      return x.left;
  that.result = that.args["x"].left;
  that.nextLineNumber = undefined;
// Code:    }
  that.nextLineNumber = 14;
// Code:    if (x.left == null) {
  that.nextLineNumber = that.args["x"].left === null ? 15 : 17;
// Code:      return x.right;
  that.results = that.args["x"].right;
  that.nextLineNumber = undefined;
// Code:    }
  that.nextLineNumber = 17;
// Code:    Node t = x;
  that.locals["t"] = x;
  that.nextLineNumber = 18;
// Code:    x = min(t.right);
  that.vm.invokeFunc(
    "min",
    function(result) {
      that.args["x"] = result;
      that.nextLineNumber = 19;
    },
    that.locals["t"].right);
// Code:    x.right = deleteMin(t.right);
  that.vm.invokeFunc(
    "deleteMin",
    function(result) {
      that.args["x"].right = result;
      that.nextLineNumber = 20;
    },
  that.locals["t"].right);
// Code:    x.left = t.left;
  that.args["x"].left = that.locals["t"].left;
  that.nextLineNumber = 21;
// Code:  }
  that.nextLineNumber = 22;
// Code:  x.N = size(x.left) + size(x.right) + 1;
  that.args["x"].N = (that.args["x"].left === null ? 0 : that.args["x"].left.N)
    + (that.args["x"].right === null ? 0 : that.args["x"].right.N) + 1;
  that.nextLineNumber = 23;
// Code:  return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:}

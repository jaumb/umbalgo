// Code:private Node select(Node x, int k) {
select(x, k) {
// Code:  if (x == null) {
  that.nextLineNumber = that.args["x"] === null ? 3 : 5;
// Code:    return null;
  that.result = null;
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  int t = size(x.left);
  that.vm.invokeFunc(
    "size",
    function(result) {
      that.locals["t"] = result;
      that.nextLineNumber = 6;
    },
    that.args["x"].left);
// Code:  if (t > k) {
  that.nextLineNumber = that.locals["t"] > that.args["k"]  ? 7 : 8;
// Code:    return select(x.left, k);
  that.vm.invokeFunc(
    "select",
    function(result) {
      that.result = result;
      that.nextLineNumber = 8;
    },
    that.args["x"].left,
    that.args["k"]);
// Code:  } else if (t < k) {
  that.nextLineNumber = that.locals["t"] < that.args["k"]  ? 9 : 11;
// Code:    return select(x.right, k-t-1);
  that.vm.invokeFunc(
    "select",
    function(result) {
      that.result = result;
      that.nextLineNumber = 11;
    },
    that.args["x"].right,
    that.args["k"] - that.locals["t"] - 1);
// Code:  } else {
  that.nextLineNumber = 11;
// Code:    return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = undefined;
// Code:}
}

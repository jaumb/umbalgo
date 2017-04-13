// Code:private Node min(Node x) {
min(x) {
// Code:  if (x.left == null) {
  that.nextLineNumber = that.args["x"].left === null ? 3 : 5;
// Code:    return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  return min(x.left);
  that.vm.invokeFunc(
    "min",
    function(result) {
      that.result = result;
      that.nextLineNumber = undefined;
    },
    that.locals["x"].left);
// Code:}
}

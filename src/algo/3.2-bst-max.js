// Code:private Node max(Node x) {
max(x) {
// Code:  if (x.right == null) {
  that.nextLineNumber = that.args["x"].right === null ? 3 : 5;
// Code:    return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  return min(x.right);
  that.vm.invokeFunc(
    "min",
    function(result) {
      that.result = result;
      that.nextLineNumber = undefined;
    },
    that.locals["x"].right);
// Code:}
}

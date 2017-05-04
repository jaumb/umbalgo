// Code:private Node deleteMin(Node x) {
deleteMin(x) {
// Code:  if (x.left == null) {
  that.nextLineNumber = !(that.args["x"].left) ? 3 : 5;
// Code:    return x.right;
  that.vm.viz.setFillAndUpdate([that.args["x"]], colors.GREEN, that.vm.dur);
  that.vm.viz.deemphasize([that.args["x"]]);
  that.vm.viz.setFillAndUpdate([that.args["x"]], colors.BACKGROUND, that.vm.dur);
  that.vm.viz.playpause();
  that.result = that.args["x"].right;
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  x.left = deleteMin(x.left);
  that.vm.viz.compareNodesAndUpdate(that.args["x"], that.args["x"],
                                    that.vm.dur);
  that.vm.viz.moveEmphasisAndUpdate(that.args["x"], that.args["x"].lChild(),
                                     -1, that.vm.dur);
  that.vm.viz.playpause();
  that.vm.invokeFunc(
    "deleteMin",
    function(result) {
      that.args["x"].left = result;
      that.nextLineNumber = 6;
    },
    that.locals["x"].left);
// Code:  x.N = size(x.left) + size(x.right) + 1;
  that.args["x"].N = (that.args["x"].left === null ? 0 : that.args["x"].left.N)
    + (that.args["x"].right === null ? 0 : that.args["x"].right.N) + 1;
  that.nextLineNumber = 7;
// Code:  return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:}

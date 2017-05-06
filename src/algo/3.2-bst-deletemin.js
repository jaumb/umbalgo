// Code:private Node deleteMin(Node x) {
deleteMin(x) {
// Code:  if (x.left == null) {
  that.nextLineNumber = !(that.args["x"].lChild()) ? 3 : 5;
// Code:    return x.right;
  that.vm.viz.setFillAndUpdate([that.args["x"]], colors.GREEN, that.vm.dur);
  that.vm.viz.step();
  that.vm.viz.deemphasize([that.args["x"]]);
  that.vm.viz.setFillAndUpdate([that.args["x"]], colors.BACKGROUND, that.vm.dur);
  that.vm.viz.step();
  that.result = that.args["x"].rChild();
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  x.left = deleteMin(x.left);
  that.vm.viz.compareNodes(that.args["x"], that.args["x"]);
  that.vm.viz.moveEmphasisAndUpdate(that.args["x"], that.args["x"].lChild(),
                                     -1, that.vm.dur);
  that.vm.viz.step();
  that.vm.invokeFunc(
    "deleteMin",
    function(result) {
      that.args["x"].setLChild(result);
      that.nextLineNumber = 6;
    }, that.args["x"].lChild());
// Code:  x.N = size(x.left) + size(x.right) + 1;
  that.args["x"].setN((!(that.args["x"].lChild()) ? 0 : that.args["x"].lChild().n())
    + (!(that.args["x"].rChild()) ? 0 : that.args["x"].rChild().n()) + 1);
  that.nextLineNumber = 7;
// Code:  return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:}

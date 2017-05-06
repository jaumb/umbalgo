// Code:private Node delete(Node x, Key key) {
delete_(x, key) {
// Code:  if (x == null) {
  that.nextLineNumber = !(that.args["x"]) ? 3 : 5;
// Code:    return null;
  that.result = null;
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  int cmp = key.compareTo(x.key);
  that.vm.viz.setFillAndUpdate([that.args["x"]], colors.COMPARE, that.vm.dur);
  that.vm.viz.setFillAndUpdate([that.args["x"]], colors.BACKGROUND, that.vm.dur);
  that.vm.viz.play();
  if (that.args["key"] < that.args["x"].val()) {
    that.locals["cmp"] = -1;
  } else if (that.args["key"] > that.args["x"].val()) {
    that.locals["cmp"] = 1;
  } else {
    that.locals["cmp"] = 0;
  }
  that.nextLineNumber = 6;
// Code:  if (cmp < 0) {
  that.nextLineNumber = that.locals["cmp"] < 0 ? 7 : 8;
// Code:    x.left  = delete(x.left,  key);
  that.vm.viz.moveEmphasisAndUpdate(that.args["x"], that.args["x"].lChild(), -1, that.vm.dur);
  that.vm.viz.step();
  that.vm.invokeFunc(
    "delete_",
    function(result) {
      that.args["x"].setLChild(result);
      that.nextLineNumber = 8;
    },
    that.args["x"].lChild(),
    that.args["key"]);
// Code:  } else if (cmp > 0) {
  that.nextLineNumber = that.locals["cmp"] > 0 ? 9 : 11;
// Code:    x.right = delete(x.right, key);
  that.vm.viz.moveEmphasisAndUpdate(that.args["x"], that.args["x"].rChild(), 1, that.vm.dur);
  that.vm.viz.step();
  that.vm.invokeFunc(
    "delete_",
    function(result) {
      that.args["x"].setRChild(result);
      that.nextLineNumber = 11;
    },
    that.args["x"].rChild(),
    that.args["key"]);
// Code:  } else {
  that.nextLineNumber = 11;
// Code:    if (x.right == null) {
  that.vm.viz.setFillAndUpdate([that.args["x"]], colors.GREEN, that.vm.dur);
  that.vm.viz.step();
  if (!that.args["x"].rChild()) {
    that.vm.viz.setFill([that.args["x"]], colors.WHITE);
    that.vm.viz.setOutline([that.args["x"]], colors.WHITE);
    that.vm.viz.setLabelFill([that.args["x"]], colors.WHITE);
    that.vm.viz.deemphasizeAndUpdate([that.args["x"]], that.vm.dur);
    that.vm.viz.play();
  }
  that.nextLineNumber = !(that.args["x"].rChild()) ? 12 : 14;
// Code:      return x.left;
  that.result = that.args["x"].lChild();
  that.nextLineNumber = undefined;
// Code:    }
  that.nextLineNumber = 14;
// Code:    if (x.left == null) {
  if (!that.args["x"].lChild()) {
    that.vm.viz.setFill([that.args["x"]], colors.WHITE);
    that.vm.viz.setOutline([that.args["x"]], colors.WHITE);
    that.vm.viz.setLabelFill([that.args["x"]], colors.WHITE);
    that.vm.viz.deemphasizeAndUpdate([that.args["x"]], that.vm.dur);
    that.vm.viz.play();
  }
  that.nextLineNumber = !(that.args["x"].lChild()) ? 15 : 17;
// Code:      return x.right;
  that.results = that.args["x"].rChild();
  that.nextLineNumber = undefined;
// Code:    }
  that.nextLineNumber = 17;
// Code:    Node t = x;
  that.locals["t"] = that.args["x"];
  that.nextLineNumber = 18;
// Code:    x = min(t.right);
  that.vm.invokeFunc(
    "min",
    function(result) {
      that.args["x"] = result;
      that.nextLineNumber = 19;
    },
    that.locals["t"].rChild());
// Code:    x.right = deleteMin(t.right);
  if (that.locals["t"].rChild()) {
    that.vm.viz.emphasizeAndUpdate([that.locals["t"].rChild()], that.vm.dur);
    that.vm.viz.step();
  }
  that.vm.invokeFunc(
    "deleteMin",
    function(result) {
      that.args["x"].setRChild(result);
      that.nextLineNumber = 20;
    },
    that.locals["t"].rChild());
// Code:    x.left = t.left;
  that.args["x"].setLChild(that.locals["t"].lChild());
  that.vm.viz.setFill([that.locals["t"]], colors.WHITE);
  that.vm.viz.setOutline([that.locals["t"]], colors.WHITE);
  that.vm.viz.setLabelFill([that.locals["t"]], colors.WHITE);
  that.vm.viz.deemphasizeAndUpdate([that.locals["t"]], that.vm.dur);
  that.vm.viz.play();
  that.nextLineNumber = 21;
// Code:  }
  that.nextLineNumber = 22;
// Code:  x.N = size(x.left) + size(x.right) + 1;
  that.args["x"].setN((!(that.args["x"].lChild()) ? 0 : that.args["x"].lChild().n())
    + (!(that.args["x"].rChild()) ? 0 : that.args["x"].rChild().n()) + 1);
  that.nextLineNumber = 23;
// Code:  return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:}

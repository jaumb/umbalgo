// Code:private Node put(Node x, Key key, Value val) {
put(x, key, newNode) {
// Code:  if (x == null) {
  that.nextLineNumber = that.args["x"] === null ? 3 : 5;
// Code:    return new Node(key, val, 1);
  that.result = that.args["newNode"];
  that.vm.globals["nodes"][that.args["key"]] = that.args["newNode"];
  that.vm.globals["root"] = that.args["newNode"];
  //vm.viz.buildTreeAndUpdate(vm.globals["root"], vm.dur);
  //vm.viz.step();
  //that.vm.viz.clearEmphasesAndUpdate(that.vm.dur);
  //that.vm.viz.step();
  that.nextLineNumber = undefined;
// Code:  }
  that.vm.viz.compareNodesAndUpdate(that.args["x"], that.args["newNode"],
                                    that.vm.dur);
  that.vm.viz.step();
  that.nextLineNumber = 5;
// Code:  int cmp = key.compareTo(x.key);
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
// Code:    x.left = put(x.left,  key, val);
  that.vm.viz.moveEmphasisAndUpdate(that.args["x"], that.args["x"].lChild(),
                                     -1, that.vm.dur);
  that.vm.viz.step();
  that.vm.invokeFunc(
    "put",
    function(result) {
      that.args["x"].setLChild(result);
      that.nextLineNumber = 13;
    },
    that.args["x"].lChild(),
    that.args["key"],
    that.args["newNode"]);
// Code:  } else if (cmp > 0) {
  that.nextLineNumber = that.locals["cmp"] > 0 ? 9 : 11;
// Code:    x.right = put(x.right, key, val);
  that.vm.viz.moveEmphasisAndUpdate(that.args["x"], that.args["x"].rChild(),
                                     1, that.vm.dur);
  that.vm.viz.step();
  that.vm.invokeFunc(
    "put",
    function(result) {
      that.args["x"].setRChild(result);
      that.nextLineNumber = 13;
    },
    that.args["x"].rChild(),
    that.args["key"],
    that.args["newNode"]);
// Code:  } else {
  that.nextLineNumber = 11;
// Code:    x.val = val;
  // We're only using keys, so we don't have to do anything here.
  that.nextLineNumber = 13;
// Code:  }
  that.nextLineNumber = 13;
// Code:  x.N = size(x.left) + size(x.right) + 1;
  that.args["x"].setN(
    (that.args["x"].lChild() === null ? 0 : that.args["x"].lChild().n())
      + (that.args["x"].rChild() === null ? 0 : that.args["x"].rChild().n())
      + 1);
  that.nextLineNumber = 14;
// Code:  return x;
  that.result = that.args["x"];
  that.vm.viz.buildTreeAndUpdate(that.args["x"], vm.dur);
  that.vm.viz.step();
  that.nextLineNumber = undefined;
// Code:}

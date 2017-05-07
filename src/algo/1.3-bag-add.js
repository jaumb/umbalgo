// Note:The add method has been called with a value to be added as the argument "item".
// Code:public void add(Item item) {
add(item) {
// Code:  Node oldfirst = first;
// Note:oldfirst is pointed at the node first currently points to.
  that.locals["oldfirst"] = that.vm.globals["first"];
  that.nextLineNumber = 3;

  // fade in oldfirst ref
  that.vm.viz.showOldFirst();
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  // point oldfirst at first
  that.vm.viz.pointOldFirstAtFirst();
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
// Code:  first = new Node();
// Note: A new node is instantiated and the first is pointed at this new node.
  that.vm.globals["first"] = linkedNode_factory.getNode(that.args["item"], null);

  // add a node to front, resize elements, show node box (label hidden),
  // point first ref's arrow at new node
  if (that.locals["oldfirst"] !== null) {
    that.vm.viz.shiftRight();
    that.vm.viz.pointOldFirstAtFirst();
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
  } else {
    that.vm.viz.shiftRight();
    that.vm.viz.pointFirstAt(null);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
  }

  that.vm.viz.addNodeLeft(that.vm.globals["first"]);
  that.vm.viz.setFill([that.vm.globals["first"].getID()], colors.COMPARE);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.showNodeBox(that.vm.globals["first"].getID());
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.pointFirstAt(that.vm.globals["first"].getID());
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.nextLineNumber = 4;
// Code:  first.item = item;
// Node:The item field of the node pointed to by first is assigned the value of the item argument.
  that.vm.globals["first"].item = that.args["item"];
  that.vm.viz.showNodeLabel(that.vm.globals["first"].getID());
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 5;
// Code:  first.next = oldfirst;
// Note:The next field of the node pointed to by first is set to point at the node oldfirst points to.
  that.vm.globals["first"].next = that.locals["oldfirst"];

  that.vm.viz.pointNodeAtOldfirst(that.vm.globals["first"].getID());
  that.vm.viz.showNodeArrow(that.vm.globals["first"].getID());
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.setFill([that.vm.globals["first"].getID()], colors.FINISHED);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.nextLineNumber = 6;
// Code:  n++;
// Note:The n field of this instance of the LinkedBag class is incremented to reflect the node that's been added.
  that.vm.globals["N"]++;

  that.vm.viz.hideNLabel();
  that.vm.viz.setNFill(colors.ACTIVE);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.updateN();
  that.vm.viz.showNLabel();
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.setNFill(colors.BACKGROUND);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.hideOldFirst();
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.pointOldFirstAt(null);
  that.vm.viz.updateCanvas(0);
  that.vm.updateViz();

  that.nextLineNumber = undefined;
// Code:}
}

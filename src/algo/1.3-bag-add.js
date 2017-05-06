// Code:public void add(Item item) {
add(item) {
// Code:  Node oldfirst = first;
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
  that.vm.globals["first"].item = that.args["item"];
  that.vm.viz.showNodeLabel(that.vm.globals["first"].getID());
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 5;
// Code:  first.next = oldfirst;
  that.vm.globals["first"].next = that.locals["oldfirst"];

  that.vm.viz.pointNodeAtOldfirst(that.vm.globals["first"].getID());
  that.vm.viz.showNodeArrow(that.vm.globals["first"].getID());
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.vm.viz.setFill([that.vm.globals["first"].getID()], colors.FINISHED);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();

  that.nextLineNumber = 6;
// Code:  N++;
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

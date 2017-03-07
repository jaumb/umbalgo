// Code:public void push(Item item) {
push(item) {
// Code:  Node oldfirst = first;
  that.locals["oldfirst"] = that.vm.globals["first"];
  that.nextLineNumber = 3;
// Code:  first = new Node();
  that.vm.globals["first"] = {
    "item": null,
    "next": null
  };
  that.nextLineNumber = 4;
// Code:  first.item = item;
  that.vm.globals["first"]["item"] = that.args["item"];
  that.nextLineNumber = 5;
// Code:  first.next = oldfirst;
  that.vm.globals["first"]["next"] = that.locals["oldfirst"];
  that.nextLineNumber = 6;
// Code:  N++;
  that.vm.globals["N"]++;
  that.nextLineNumber = undefined;
// Code:}
}

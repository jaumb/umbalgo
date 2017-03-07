// Code:public Item pop() {
pop() {
// Code:  Item item = first.item;
  that.locals["item"] = that.vm.globals["first"]["item"];
  that.nextLineNumber = 3;
// Code:  first = first.next;
  that.vm.globals["first"] = that.vm.globals["first"]["next"];
  that.nextLineNumber = 4;
// Code:  N--;
  that.vm.globals["N"]--;
  that.nextLineNumber = 5;
// Code:  return item;
  that.result = that.locals["item"];
  that.nextLineNumber = undefined;
// Code:}
}

// Code:public void dequeue(Item item) {
dequeue(item) {
// Code:  Item item = first.item;
  that.locals["item"] = that.globals["first"].item;
  that.nextLineNumber = 3;
// Code:  first = first.next;
  that.globals["first"] = that.globals["first"].next;
  that.nextLineNumber = 4;
// Code:  if (isEmpty()) {
  that.nextLineNumber = that.globals["first"] == null ? 5 : 7;
// Code:    last = null;
  that.locals["last"] = null;
  that.nextLineNumber = 7;
// Code:  }
  that.nextLineNumber = 7;
// Code:  N--;
  that.globals["N"]--;
  that.nextLineNumber = 8;
// Code:  return item;
  that.result = item;
  that.nextLineNumber = undefined;
// Code:}
}

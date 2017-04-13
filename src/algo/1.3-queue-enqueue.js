// Code:public void enqueue(Item item) {
enqueue(item) {
// Code:  Node oldlast = last;
  that.locals["oldlast"] = that.globals["last"];
  that.nextLineNumber = 3;
// Code:  last = new Node();
  that.locals["last"] = {
    "item": null,
    "next": null
  };
  that.nextLineNumber = 4;
// Code:  last.item = item;
  that.locals["last"].item = item;
  that.nextLineNumber = 5;
// Code:  last.next = null;
  that.locals["last"].next = next;
  that.nextLineNumber = 6;
// Code:  if (isEmpty()) {
  if (!that.globals["first"]) {
    that.nextLineNumber = 7;
  } else {
    that.nextLineNumber = 9;
  }
// Code:    first = last;
  that.globals["first"] = that.globals["last"];
// Code:  } else {
  that.nextLineNumber = 9;
// Code:    oldlast.next = last;
  that.locals["oldlast"].next = last;
  that.nextLineNumber = 10;
// Code:  }
  that.nextLineNumber = 11;
// Code:  N++;
  that.globals["N"]++;
  that.nextLineNumber = undefined;
// Code:}
}

// Code:public void add(Item item) {
add(item) {
// Code:  Node oldfirst = first;
  that.locals["oldfirst"] = that.globals["first"];
  that.nextLineNumber = 3;
// Code:  first = new Node();
  that.globals["first"] = {
    "item": null;
    "next": null;
  }
  that.nextLineNumber = 4;
// Code:  first.item = item;
  that.globals["first"].item = item;
  that.nextLineNumber = 5;
// Code:  first.next = oldfirst;
  that.globals["first"].next = oldfirst;
  that.nextLineNumber = 6;
// Code:  N++;
  that.globals["N"]++;
  that.nextLineNumber = undefined;
// Code:}
}

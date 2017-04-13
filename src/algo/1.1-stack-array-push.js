// Code:public void push(Item item) {
push(item) {
// Code:  if (N == a.length) {
  that.nextLineNumber = that.globals["N"] == that.globals["a"] ? 3 : 5;
// Code:    resize(2 * a.length);
  that.vm.invokeFunc(
    "resize",
    undefined,
    2 * that.globals["a"].length);
  that.nextLineNumber = 5;
// Code:  }
  that.nextLineNumber = 5;
// Code:  a[N++] = item;
  that.globals["a"][that.globals["N"]++] = that.locals["item"];
  that.nextLineNumber = undefined;
// Code:}
}

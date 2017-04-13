// Code:private void resize(int max) {
resize(max) {
// Code:  Item[] temp = (Item[]) new Object[max];
  that.locals["temp"] = new Array(max);
  that.nextLineNumber = 3;
// Code:  for (int i = 0; i < N; i++) {
  if (that.cache["3__firstIteration"] === undefined) {
    that.locals["i"] = 0;
    that.cache["3__firstIteration"] = false;
  } else {
    that.locals["i"]++;
  }
  if (that.locals["i"] < that.globals["N"]) {
    that.nextLineNumber = 4;
  } else {
    that.nextLineNumber = 6;
    that.locals["i"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
// Code:    temp[i] = a[i];
  that.locals["temp"][that.locals["i"]] = that.globals["a"][that.locals["i"]];
  that.nextLineNumber = 5;
// Code:  }
  that.nextLineNumber = 3;
// Code:  a = temp;
  that.globals["a"] = that.locals["temp"];
  that.nextLineNumber = undefined;
// Code:}
}

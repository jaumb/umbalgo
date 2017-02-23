// Java:private static void exch(Comparable[] a, int i, int j) {
exch(a, i, j) {
// Java:  Comparable t = a[i];
  that.locals["t"] = that.args["a"][that.args["i"]];
  that.nextLineNumber = 3;
// Java:  a[i] = a[j];
  that.args["a"][that.args["i"]] = that.args["a"][that.args["j"]];
  that.nextLineNumber = 4;
// Java:  a[j] = t;
  that.args["a"][that.args["j"]] = that.locals["t"];
  console.log(that.args["a"]);
  that.nextLineNumber = undefined;
// Java:}
}

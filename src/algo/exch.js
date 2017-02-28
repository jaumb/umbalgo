// Code:private static void exch(Comparable[] a, int i, int j) {
exch(a, i, j) {
// Code:  Comparable t = a[i];
  that.locals["t"] = that.args["a"][that.args["i"]];
  that.nextLineNumber = 3;
// Code:  a[i] = a[j];
  that.args["a"][that.args["i"]] = that.args["a"][that.args["j"]];
  that.nextLineNumber = 4;
// Code:  a[j] = t;
  that.args["a"][that.args["j"]] = that.locals["t"];
  console.log(that.args["a"]);
  that.nextLineNumber = undefined;
// Code:}
}

// Code:private static int partition(Comparable[] a, int lo, int hi) {
partition(a, lo, hi) {
// Code:  int i = lo;
  that.locals["i"] = that.args["lo"];
  that.nextLineNumber = 3;
// Code:  int j = hi + 1;
  that.locals["j"] = that.args["hi"] + 1;
  that.nextLineNumber = 4;
// Code:  Comparable v = a[lo];
  that.locals["v"] = that.args["a"][that.args["lo"]];
  that.nextLineNumber = 5;
// Code:  while (true) {
  that.nextLineNumber = 6;
// Code:    while (less(a[++i], v)) {
  that.vm.invokeFunc(
    "less",
    function(result) { that.nextLineNumber = result ? 7 : 11; },
    that.args["a"][++that.locals["i"]],
    that.locals["v"]);
// Code:      if (i == hi) {
  that.nextLineNumber = that.locals["i"] === that.args["hi"] ? 8 : 10;
// Code:        break;
  that.nextLineNumber = 11;
// Code:      }
  that.nextLineNumber = 10;
// Code:    }
  that.nextLineNumber = 6;
// Code:    while (less(v, a[--j])) {
  that.vm.invokeFunc(
    "less",
    function(result) { that.nextLineNumber = result ? 12 : 16; },
    that.locals["v"],
    that.args["a"][--that.locals["j"]]);
// Code:      if (j == lo) {
  that.nextLineNumber = that.locals["j"] === that.args["lo"] ? 13 : 16;
// Code:        break;
  that.nextLineNumber = 16;
// Code:      }
  that.nextLineNumber = 15;
// Code:    }
  that.nextLineNumber = 11;
// Code:    if (i >= j) {
  that.nextLineNumber = that.locals["i"] >= that.locals["j"] ? 17 : 19;
// Code:      break;
  that.nextLineNumber = 21;
// Code:    }
  that.nextLineNumber = 21;
// Code:    exch(a, i, j);
  that.vm.invokeFunc(
    "exch",
    undefined,
    that.args["a"],
    that.locals["i"],
    that.locals["j"]);
  that.nextLineNumber = 22;
// Code:  }
  that.nextLineNumber = 5;
// Code:  exch(a, lo, j);
  that.vm.invokeFunc(
    "exch",
    undefined,
    that.args["a"],
    that.args["lo"],
    that.locals["j"]);
  that.nextLineNumber = 22;
// Code:  return j;
  that.result = that.locals["j"];
  that.nextLineNumber = undefined;
// Code:}
}

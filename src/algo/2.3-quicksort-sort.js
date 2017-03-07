// Code:private static void sort(Comparable[] a, int lo, int hi) {
sort(a, lo, hi) {
// Code:  if (hi <= lo) {
  that.nextLineNumber = that.args["hi"] <= that.args["lo"] ? 3 : 5;
// Code:    return;
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  int j = partition(a, lo, hi);
  that.vm.invokeFunc(
    "partition",
    function(result) {
      that.locals["j"] = result;
      that.nextLineNumber = 6;
    },
    that.args["a"],
    that.args["lo"],
    that.args["hi"]);
// Code:  sort(a, lo, j - 1);
  that.vm.invokeFunc(
    "sort",
    undefined,
    that.args["a"],
    that.args["lo"],
    that.locals["j"] - 1);
  that.nextLineNumber = 7;
// Code:  sort(a, j + 1, hi);
  that.vm.invokeFunc(
    "sort",
    undefined,
    that.args["a"],
    that.locals["j"] + 1,
    that.args["hi"]);
  that.nextLineNumber = undefined;
// Code:}
}

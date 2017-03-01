// Code:public static void sink(Comparable[] a, int k, int N) {
sink(a, k) {
// Code:  while (2 * k <= N) {
  if (2 * that.args["k"] <= that.args["N"]) {
    that.nextLineNumber = 3;
  } else {
    that.nextLineNumber = undefined;
  }
// Code:    int j = 2 * k;
  that.locals["j"] = 2 * that.args["k"];
  that.nextLineNumber = 4;
// Code:    if (j < N && less(a, j, j + 1)) {
  if (that.args["k"] < that.args["N"]) {
    that.vm.invokeFunc(
      "less",
      function(result) {
        if (result) {
          that.nextLineNumber = 5;
        } else {
          that.nextLineNumber = 7;
        }
      },
      that.args["a"],
      that.locals["j"],
      that.locals["j"] + 1);
  } else {
    that.nextLineNumber = 7;
  }
// Code:      j++;
  that.locals["j"]++;
  that.nextLineNumber = 6;
// Code:    }
  that.nextLineNumber = 7;
// Code:    if (!less(a, k, j)) {
  that.vm.invokeFunc(
    "less",
    function(result) {
      if (!result) {
        that.nextLineNumber = 8;
      } else {
        that.nextLineNumber = 10;
      }
    },
    that.args["a"],
    that.args["k"],
    that.locals["j"]);
// Code:      break;
  that.nextLineNumber = undefined;
// Code:    }
  that.nextLineNumber = 10;
// Code:    exch(a, k, j);
  that.vm.invokeFunc(
    "exch",
    undefined,
    that.args["k"],
    that.locals["j"],
    that.args["N"]--);
  that.nextLineNumber = 11;
// Code:    k = j;
  that.args["k"] = that.locals["j"];
  that.nextLineNumber = 12;
// Code:  }
  that.nextLineNumber = 3;
// Code:}
}

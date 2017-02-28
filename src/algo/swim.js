// Code:public static void swim(Comparable[] a, int k) {
swim(a, k) {
// Code:  while (k > 1 && less(a, k / 2, k)) {
  if (that.args["k"] > 1) {
    that.vm.invokeFunc(
      "less",
      function(result) {
        if (result) {
          that.nextLineNumber = 3;
        } else {
          that.nextLineNumber = undefined;
        }
      },
      that.args["a"],
      that.args["k"] / 2,
      that.args["k"]);
    that.nextLineNumber = 3;
  } else {
    that.nextLineNumber = undefined;
  }
// Code:    exch(a, k / 2, k);
  that.vm.invokeFunc(
    "exch",
    undefined,
    that.args["a"],
    that.args["k"] / 2,
    that.args["k"]);
  that.nextLineNumber = 4;
// Code:    k = k / 2;
  that.locals["k"] = that.locals["k"] / 2;
  that.nextLineNumber = 5;
// Code:  }
  that.nextLineNumber = 2;
// Code:}
}

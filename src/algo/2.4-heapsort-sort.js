// Code:public static void sort(Comparable[] a) {
sort(a) {
// Code:  int N = a.length;
  that.locals["N"] = that.args["a"].length;
  that.nextLineNumber = 3;
// Code:  for (int k = N / 2; k >= 1; k--) {
  if (that.cache["3__firstIteration"] === undefined) {
    that.locals["k"] = Math.floor(that.locals["N"] / 2);
    that.cache["3__firstIteration"] = false;
  } else {
    that.locals["k"]--;
  }
  if (that.locals["k"] >= 1) {
    that.nextLineNumber = 4;
  } else {
    that.nextLineNumber = 6;
    that.locals["k"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
// Code:    sink(a, k, N);
  that.vm.invokeFunc(
    "sink",
    undefined,
    that.args["a"],
    that.locals["k"],
    that.locals["N"]);
  that.nextLineNumber = 5;
// Code:  }
  that.nextLineNumber = 3;
// Code:  while (N > 1) {
  if (that.locals["N"] > 1) {
    that.nextLineNumber = 7;
  } else {
    that.nextLineNumber = undefined;
  }
// Code:    exch(a, 1, N--);
  that.vm.invokeFunc(
    "exch",
    undefined,
    that.args["a"],
    1,
    that.locals["N"]--);
  that.nextLineNumber = 8;
// Code:    sink(a, 1, N);
  that.vm.invokeFunc(
    "sink",
    undefined,
    that.args["a"],
    1,
    that.locals["N"]);
  that.nextLineNumber = 9;
// Code:  }
  that.nextLineNumber = 6;
// Code:}
}

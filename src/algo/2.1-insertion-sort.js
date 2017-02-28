// Code:public static void sort(Comparable[] a) {
sort(a) {
// Code:  int N = a.length;
  that.locals["N"] = that.args["a"].length;
  that.nextLineNumber = 3;
// Code:  for (int i = 1; i < N; i++) {
  if (that.cache["3__firstIteration"] === undefined) {
    that.locals["i"] = 1;
    that.cache["3__firstIteration"] = false;
  } else {
    that.locals["i"]++;
  }
  if (that.locals["i"] < that.locals["N"]) {
    that.nextLineNumber = 6;
  } else {
    that.nextLineNumber = undefined;
    that.locals["i"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
// Code:    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
// Note:"Here's an example note that shows i=" + that.locals["i"] + "."
  if (that.cache["4__firstIteration"] === undefined) {
    that.locals["j"] = that.locals["i"];
    that.cache["4__firstIteration"] = false;
  } else {
    that.locals["j"]--;
  }
  if (that.locals["j"] > 0) {
    that.vm.visualization.highlight([that.locals["j"] - 1, that.locals["j"]]);
    that.vm.visualization.stepall();
    that.vm.invokeFunc(
      "less",
      function(result) {
        if (result) {
          that.nextLineNumber = 5;
        } else {
          that.vm.visualization.unhighlight([that.locals["j"] - 1, that.locals["j"]]);
          that.vm.visualization.stepall();
          that.nextLineNumber = 7;
          that.locals["j"] = undefined;
          that.cache["4__firstIteration"] = undefined;
        }
      },
      that.args["a"][that.locals["j"]],
      that.args["a"][that.locals["j"] - 1]);
  } else {
    that.vm.visualization.updateBoundary(that.locals["i"]);
    that.vm.visualization.stepall();
    that.nextLineNumber = 7;
    that.locals["j"] = undefined;
    that.cache["4__firstIteration"] = undefined;
  }
// Code:      exch(a, j, j - 1);
  that.vm.visualization.swap(that.locals["j"] - 1, that.locals["j"]);
  that.vm.visualization.unhighlight([that.locals["j"] - 1, that.locals["j"]]);
  that.vm.visualization.stepall();
  that.vm.invokeFunc(
    "exch",
    undefined,
    that.args["a"],
    that.locals["j"],
    that.locals["j"] - 1);
  that.nextLineNumber = 6;
// Code:    }
  that.nextLineNumber = 4;
// Code:  }
  that.nextLineNumber = 3;
// Code:}
}

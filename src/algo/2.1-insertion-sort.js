// Code:public static void sort(Comparable[] a) {
// Note:"Sort an array of Comparable items in ascending order."
sort(a) {
// Code:  int n = a.length;
// Note:"Creates a variable n and stores the number of elements in the array there."
  that.locals["N"] = that.args["a"].length;
  that.nextLineNumber = 3;
// Code:  for (int i = 1; i < n; i++) {
// Note:"If this is the first iteration of the outer loop, i is initialized to 1. On every iteration the loop condition (i < n) is checked to determine if the body will be executed."
  if (that.cache["3__firstIteration"] === undefined) {
    that.locals["i"] = 1;
    that.cache["3__firstIteration"] = false;
  } else {
    that.locals["i"]++;
  }
  if (that.locals["i"] < that.locals["N"]) {
    that.nextLineNumber = 4;
    that.vm.viz.setBoundPos(that.locals["i"] - 1);
    that.vm.viz.setI(that.locals["i"]);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
    that.vm.updateViz();
  } else {
    that.vm.viz.removeI();
    that.vm.viz.removeJ();
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
    that.vm.viz.setBoundPos(that.locals["i"] - 1);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
    that.nextLineNumber = undefined;
    that.locals["i"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
// Code:    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
// Note:"If this is the first iteration of the inner loop, j is initialized to i. On every iteration the loop condition (that j > 0 and that the value at index j is less than the value at j-1) is checked to determine if the body will be executed."
  if (that.cache["4__firstIteration"] === undefined) {
    that.locals["j"] = that.locals["i"];
    that.vm.viz.emphasize([that.locals["j"]]);
    that.vm.viz.setFill([that.locals["j"] - 1, that.locals["j"]], colors.COMPARE);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
    that.cache["4__firstIteration"] = false;
  } else {
    that.locals["j"]--;
  }
  if (that.locals["j"] > 0) {
    that.vm.viz.emphasize([that.locals["j"]]);
    that.vm.viz.setFill([that.locals["j"] - 1, that.locals["j"]], colors.COMPARE);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();

    if (that.args["a"][that.locals["j"]] < that.args["a"][that.locals["j"] - 1]) {
      that.nextLineNumber = 5;
      that.vm.viz.setJ(that.locals["j"]);
      that.vm.viz.updateCanvas(that.vm.dur);
      that.vm.updateViz();
    } else {
      that.vm.viz.setFill([that.locals["j"] - 1, that.locals["j"]], colors.BACKGROUND);
      that.vm.viz.deemphasize([that.locals["j"]]);
      that.vm.viz.updateCanvas(that.vm.dur);
      that.vm.updateViz();

      that.vm.viz.removeJ();
      that.vm.viz.updateCanvas(that.vm.dur);
      that.vm.updateViz();

      that.nextLineNumber = 7;
      that.locals["j"] = undefined;
      that.cache["4__firstIteration"] = undefined;
    }
  } else {
    that.nextLineNumber = 7;
    that.locals["j"] = undefined;
    that.cache["4__firstIteration"] = undefined;

    that.vm.viz.removeJ();
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
  }
// Code:      exch(a, j, j - 1);
// Note:"The value at index j is less than the value at index j-1, so we swap them."
  let t = that.args["a"][that.locals["j"]];
  that.args["a"][that.locals["j"]] = that.args["a"][that.locals["j"] - 1];
  that.args["a"][that.locals["j"] - 1] = t;
  that.nextLineNumber = 6;
  that.vm.viz.swap(that.locals["j"] - 1, that.locals["j"]);
  that.vm.viz.moveEmphasis(that.locals["j"], that.locals["j"] - 1);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  if (that.locals["j"] === 1) {
    that.vm.viz.deemphasize([that.locals["j"] - 1]);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
  }
// Code:    }
// Note:"Execute the inner loop update (j--) and return to the top of the inner loop to check the loop condition (j > 0 and the value at index j is less than the value at j-1.)."
  that.vm.viz.setFill([that.locals["j"] - 1, that.locals["j"]], colors.BACKGROUND);
  that.vm.viz.deemphasize([that.locals["j"]]);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 4;
// Code:  }
// Note:"Execute the outer loop update (i++) and return to the top of the outer loop to check the loop condition (i < n)."
  that.nextLineNumber = 3;
// Code:}
}

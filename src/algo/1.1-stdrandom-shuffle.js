// Code:public static void shuffle(double[] a) {
// Note:"Randomize an array of values."
shuffle(a) {
// Code:  int n = a.length;
// Note:"Creates a variable n and stores the number of elements in the array there."
  that.locals["N"] = that.args["a"].length;
  that.nextLineNumber = 3;
// Code:  for (int i = 0; i < n; i++) {
// Note:"If this is the first iteration of the loop, i is initialized to 0. On every iteration the loop condition (i < n) is checked to determine if the body will be executed."
  if (that.cache["3__firstIteration"] === undefined) {
    that.locals["i"] = 0;
    that.cache["3__firstIteration"] = false;
    that.vm.viz.emphasize([that.locals["i"]]);
  } else {
    that.locals["i"]++;
    if (that.locals["i"] < that.locals["N"]) {
      that.vm.viz.moveEmphasis(that.locals["i"] - 1, that.locals["i"]);
    }
  }
  if (that.locals["i"] < that.locals["N"]) {
    that.vm.viz.setI(that.locals["i"]);
    that.nextLineNumber = 4;
  } else {
    that.vm.viz.removeI(that.locals["i"]);
    that.vm.viz.deemphasize([that.locals["i"]]);
    that.nextLineNumber = undefined;
    that.locals["i"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
// Code:    int r = i + StdRandom.uniform(n-i);
// Note:"Use the StdRandom library to generate a random index between i and n. Assign this value to r."
  that.locals["r"] = that.locals["i"] + Math.floor(Math.random() * (that.locals["N"] - that.locals["i"]));
  that.vm.viz.setFill([that.locals["r"]], colors.COMPARE);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 5;
// Code:    double temp = a[i];
// Note:"Put the value of index i in a temporary variable (temp)."
  that.locals["temp"] = that.args["a"][that.locals["i"]];
  that.nextLineNumber = 6;
// Code:    a[i] = a[r];
// Note:"Take the value of the random index stored in r and store it at index i."
  that.args["a"][that.locals["i"]] = that.locals["r"];
  that.nextLineNumber = 7;
// Code:    a[r] = temp;
// Note:"Retrieve the previous value of index i from the temp variable and store that at the index of the value that replaced the value at index i."
  that.args["a"][that.locals["r"]] = that.locals["temp"]
  that.vm.viz.swap(that.locals["i"], that.locals["r"]);
  that.vm.viz.setFill([that.locals["r"]], colors.BACKGROUND);
  that.vm.viz.setFill([that.locals["i"]], colors.FINISHED);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 8;
// Code:  }
// Note:"Return to the loop header to test the loop condition."
  that.nextLineNumber = 3;
// Code:}
}

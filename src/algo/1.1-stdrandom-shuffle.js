// Code:public static void shuffle(double[] a) {
shuffle(a) {
// Code:  int N = a.length;
  that.locals["N"] = that.args["a"].length;
  that.nextLineNumber = 3;
// Code:  for (int i = 0; i < N; i++) {
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
// Code:    int r = i + StdRandom.uniform(N-i);
  that.locals["r"] = that.locals["i"] + Math.floor(Math.random() * (that.locals["N"] - that.locals["i"]));
  that.vm.viz.setFill([that.locals["r"]], colors.COMPARE);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 5;
// Code:    double temp = a[i];
  that.locals["temp"] = that.args["a"][that.locals["i"]];
  that.nextLineNumber = 6;
// Code:    a[i] = a[r];
  that.args["a"][that.locals["i"]] = that.locals["r"];
  that.nextLineNumber = 7;
// Code:    a[r] = temp;
  that.args["a"][that.locals["r"]] = that.locals["temp"]
  that.vm.viz.swap(that.locals["i"], that.locals["r"]);
  that.vm.viz.setFill([that.locals["r"]], colors.BACKGROUND);
  that.vm.viz.setFill([that.locals["i"]], colors.FINISHED);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 8;
// Code:  }
  that.nextLineNumber = 3;
// Code:}
}

// Code:public static void shuffle(double[] a) {
shuffle(a) {
// Code:  int N = a.length;
  that.locals["N"] = a.length;
// Code:  for (int i = 0; i < N; i++) {
  if (that.cache["3__firstIteration"] === undefined) {
    that.locals["i"] = 0;
    that.cache["3__firstIteration"] = false;
  } else {
    that.locals["i"]++;
  }
  if (that.locals["i"] < that.locals["N"]) {
    that.nextLineNumber = 4;
  } else {
    that.nextLineNumber = undefined;
    that.locals["i"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
// Code:    int r = i + StdRandom.uniform(N-i);
  that.locals["r"] = that.locals["i"] + Math.floor(Math.random() * (that.locals["N"] - that.locals["i"]));
  that.nextLineNumber = 5;
// Code:    double temp = a[i];
  that.locals["temp"] = that.args["a"][that.locals["i"]];
  that.nextLineNumber = 6;
// Code:    a[i] = a[r];
  that.args["a"][that.locals["i"]] = that.locals["r"];
  that.nextLineNumber = 7;
// Code:    a[r] = temp;
  that.args["a"][that.locals["r"]] = that.locals["temp"]
  that.nextLineNumber = 8;
// Code:  }
  that.nextLineNumber = 3;
// Code:}
}

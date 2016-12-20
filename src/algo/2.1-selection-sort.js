// Java:public static void sort(Comparable[] a) {
sort(a) {
// Java:  int N = a.length;
  that.locals["N"] = that.args["a"].length;
  // This tells the Runner what line to execute next.
  that.nextLineNumber++;
// Java:  for (int i = 1; i < N; i++) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (that.helpers[that.currentLineNumber - 1]["firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    that.locals["i"] = 1;
    // Add entry to helpers map so that next time we know not to reinitialize.
    that.helpers[that.currentLineNumber - 1]["firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    that.locals["i"]++;
  }
  // Check if the condition is true
  if (that.locals["i"] < that.locals["N"]) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    that.nextLineNumber++;
  } else {
    // Otherwise, jump to past the loop body
    that.nextLineNumber = 8;
    // Cleanup helper map entried in case this is a nested loop and they get
    // used again.
    that.locals["i"] = undefined;
    that.helpers[2]["firstIteration"] = undefined;
  }
// Java:    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (that.helpers[3]["firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    that.locals["j"] = that.locals["i"];
    // Add entry to helpers map so that next time we know not to reinitialize.
    that.helpers[3]["firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    that.locals["j"]--;
  }
  // Check if the condition is true
  if (that.locals["j"] > 0
      && that.runner.invoke("less",
                            undefined,
                            (that.args["a"][that.locals["j"]],
                             that.args["a"][that.locals["j"] - 1]))) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    that.nextLineNumber = 5;
  } else {
    // Otherwise, jump to past the loop body
    that.nextLineNumber = 7;
    // Cleanup helper map entried in case this is a nested loop and they get
    // used again.
    that.locals["j"] = undefined;
    that.helpers[2]["firstIteration"] = undefined;
  }
// Java:      exch(a, j, j - 1);
  // Invoke exch. exch() is a function that was registered with the runner
  // and is looked up by it's name as a string (the first argument to invoke()).
  // The other arguments are the arguments to exch. exch is then invoked with
  // said arguments and pushed on the call stack. Execution will then continue
  // there until it returns the result through resultcb(x). Here, no callback
  // is provided as exch() is a void function.
  that.runner.invoke("exch",
                     undefined,
                     that.args["a"],
                     that.locals["j"],
                     that.locals["j"] - 1);
  that.nextLineNumber = 6;
// Java:    }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and nothing else.
  that.nextLineNumber = 4;
// Java:  }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and nothing else.
  that.nextLineNumber = 3;
// Java:}
  // This is the last line of the function, so set nextLineNumber undefined to
  // indicate this to the runner.
  that.nextLineNumber = undefined;
  // If this wasn't a void function, we would return a value through the provided
  // resultcb callback. See less() for an example.
}

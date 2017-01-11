// Java:public static void sort(Comparable[] a) {
sort(a) {
// Java:  int N = a.length;
  that.locals["N"] = that.args["a"].length;
  // Tell the Runner which line should be executed next. If this were a
  // conditional construct of some sort, we may need to jump over a block or
  // back to the top of a loop. This was a simple assignment statement, so we
  // just want to proceed to the next line.
  that.nextLineNumber = that.currentLineNumber + 1;
// Java:  for (int i = 0; i < N; i++) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (that.helpers[that.currentLineNumber - 1]["firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    that.locals["i"] = 0;
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
    that.nextLineNumber = that.currentLineNumber + 1;
  } else {
    // Otherwise, jump past the loop body
    that.nextLineNumber = 11;
    // Cleanup helper map entries in case this is a nested loop and they get
    // used again.
    that.locals["i"] = undefined;
    that.helpers[that.currentLineNumber - 1]["firstIteration"] = undefined;
  }
// Java:    int min = i;
  that.locals["min"] = that.locals["i"];
  that.nextLineNumber = that.currentLineNumber + 1;
// Java:    for (int j = i + 1; j < N; j++) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (that.helpers[that.currentLineNumber - 1]["firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    that.locals["j"] = that.locals["i"] + 1;
    // Add entry to helpers map so that next time we know not to reinitialize.
    that.helpers[that.currentLineNumber - 1]["firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    that.locals["j"]++;
  }
  // Check if the condition is true
  if (that.locals["j"] < that.locals["N"]) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    that.nextLineNumber = that.currentLineNumber + 1;
  } else {
    // Otherwise, jump to past the loop body
    that.nextLineNumber = 9;
    // Cleanup helper map entries in case this is a nested loop and they get
    // used again.
    that.locals["j"] = undefined;
    that.helpers[that.currentLineNumber - 1]["firstIteration"] = undefined;
  }
// Java:      if (less(a[j], a[min]))
  // Invoke less() and store the result in the helpers map. The first argument
  // to invoke() is the function name, followed by a callback that takes a
  // single argument to recieve the return value. Any following arguments are
  // passed on as parameters to the function being invoked.
  that.runner.invoke(
    "less",
    function(result) {
      that.helpers[that.currentLineNumber - 1]["predicate"] = result;
    },
    that.args["a"][that.locals["j"]],
    that.args["a"][that.locals["min"]]);
  // Now that we've evaluated the predicate (a call to less()), we can use it to
  // decide whether to enter the body of the if statement, or jump over it.
  if(that.helpers[that.currentLineNumber - 1]["predicate"]) {
    that.nextLineNumber = that.currentLineNumber + 1;
  } else {
    that.nextLineNumber = that.currentLineNumber + 2;
  }
// Java:        min = j;
  // This is a simple assignment.
  that.locals["min"] = that.locals["j"];
  // Then advance to the next line.
  that.nextLineNumber = that.currentLineNumber + 1;
// Java:    }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and do nothing else.
  that.nextLineNumber = 5;
// Java:    exch(a, i, min);
  // Invoke exch. exch() is a function that was registered with the runner
  // and is looked up by it's name as a string (the first argument to invoke()).
  // The other arguments are the arguments to exch. exch is then invoked with
  // said arguments and pushed on the call stack. Execution will then continue
  // there until it returns the result through resultcb(x). Here, no callback
  // is provided as exch() is a void function.
  that.runner.invoke("exch",
                     undefined,
                     that.args["a"],
                     that.locals["i"],
                     that.locals["min"]);
  that.nextLineNumber = that.currentLineNumber + 1;
// Java:  }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and do nothing else.
  that.nextLineNumber = 3;
// Java:}
  // This is the last line of the function, so set nextLineNumber undefined to
  // indicate this to the runner.
  that.nextLineNumber = undefined;
  // If this wasn't a void function, we would return a value through the provided
  // resultcb callback. See less() for an example.
}

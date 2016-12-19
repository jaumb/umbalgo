// Java:public static void sort(Comparable[] a) {
selection(a) {
// Java:  int N = a.length;
  this.locals["N"] = this.args["a"].length;
  // This tells the Runner what line to execute next.
  this.nextLineNumber++;
// Java:  for (int i = 1; i < N; i++) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (this.helpers[this.currentLineNumber - 1]["firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    this.locals["i"] = 1;
    // Add entry to helpers map so that next time we know not to reinitialize.
    this.helpers[this.currentLineNumber - 1]["firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    this.locals["i"]++;
  }
  // Check if the condition is true
  if (this.locals["i"] < this.locals["N"]) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    this.nextLineNumber++;
  } else {
    // Otherwise, jump to past the loop body
    this.nextLineNumber = 8;
    // Cleanup helper map entried in case this is a nested loop and they get
    // used again.
    this.locals["i"] = undefined;
    this.helpers[2]["firstIteration"] = undefined;
  }
// Java:    for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (this.helpers[3]["firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    this.locals["j"] = this.locals["i"];
    // Add entry to helpers map so that next time we know not to reinitialize.
    this.helpers[3]["firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    this.locals["j"]--;
  }
  // Check if the condition is true
  if (this.locals["j"] > 0
      && less(this.args["a"][this.locals["j"]],
              this.args["a"][this.locals["j"] - 1])) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    this.frame.next = 5;
  } else {
    // Otherwise, jump to past the loop body
    this.nextLineNumber = 7;
    // Cleanup helper map entried in case this is a nested loop and they get
    // used again.
    this.locals["j"] = undefined;
    this.helpers[2]["firstIteration"] = undefined;
  }
// Java:      exch(a, j, j - 1);
  // Invoke exch. exch() is a function that was registered with the runner
  // and is looked up by it's name as a string (the first argument to invoke()).
  // The other arguments are the arguments to exch. exch is then invoked with
  // said arguments and pushed on the call stack. Execution will then continue
  // there until it returns, and, if it's not void, storing it's return value
  // in this.runner.result, where it could be retrieved by this function when
  // it resumes execution after the call to exch is popped off of the stack.
  this.runner.invoke("exch",
                     this.args["a"],
                     this.locals["j"],
                     this.locals["j"] - 1);
  this.nextLineNumber = 6;
// Java:    }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and nothing else.
  this.nextLineNumber = 4;
// Java:  }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and nothing else.
  this.nextLineNumber = 3;
// Java:}
  // This is the last line of the function, so we set the next line number
  // undefined.
  this.nextLineNumber = undefined;
  // If this wasn't a void function, we would set this.result to the return
  // value here, as below:
  this.result = undefined;
}

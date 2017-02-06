// Java:public static void sort(Comparable[] a) {
sort(a) {
// Java:  int N = a.length;
  that.locals["N"] = that.args["a"].length;
  // Tell the Runner which line should be executed next. If this were a
  // conditional construct of some sort, we may need to jump over a block or
  // back to the top of a loop. This was a simple assignment statement, so we
  // just want to proceed to the next line.
  that.nextLine = that.funcModel.getLine(3)
// Java:  for (int i = 0; i < N; i++) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (that.cache["3__firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    that.locals["i"] = 0;
    // Add entry to helpers map so that next time we know not to reinitialize.
    that.cache["3__firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    that.locals["i"]++;
  }
  // Check if the condition is true
  if (that.locals["i"] < that.locals["N"]) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    that.nextLine = that.funcModel.getLine(4);
  } else {
    // Otherwise, jump past the loop body
    that.nextLine = undefined;
    // Cleanup helper map entries in case this is a nested loop and they get
    // used again.
    that.locals["i"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
// Java:    int min = i;
  that.locals["min"] = that.locals["i"];
  that.nextLine = that.funcModel.getLine(5);
// Java:    for (int j = i + 1; j < N; j++) {
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (that.cache["5__firstIteration"] === undefined) {
    // This is the first iteration, so perform the initialization.
    that.locals["j"] = that.locals["i"] + 1;
    // Add entry to helpers map so that next time we know not to reinitialize.
    that.cache["5__firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    that.locals["j"]++;
  }
  // Check if the condition is true
  if (that.locals["j"] < that.locals["N"]) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    that.nextLine = that.funcModel.getLine(6);
  } else {
    // Otherwise, jump to past the loop body
    that.nextLine = that.funcModel.getLine(9);
    // Cleanup helper map entries in case this is a nested loop and they get
    // used again.
    that.locals["j"] = undefined;
    that.cache["5__firstIteration"] = undefined;
  }
// Java:      if (less(a[j], a[min]))
  // Invoke less() and store the result in the helpers map. The first argument
  // to invoke() is the function name, followed by a callback that takes a
  // single argument to recieve the return value. Any following arguments are
  // passed on as parameters to the function being invoked.
  that.vm.invokeFunc(
    "less",
    function(result) {
      if(result === true) {
        console.log('result=true');
        that.nextLine = that.funcModel.getLine(7);
      } else {
        console.log('result=false');
        that.nextLine = that.funcModel.getLine(8);
      }
      // Perhaps set a flag here to disable next() until the result callback
      // has been triggered (that would be a race, though one that the human
      // would likely lose...)?
    },
    that.args["a"][that.locals["j"]],
    that.args["a"][that.locals["min"]]);
// Java:        min = j;
  // This is a simple assignment.
  that.locals["min"] = that.locals["j"];
  // Then advance to the next line.
  that.nextLine = that.funcModel.getLine(8);
// Java:    }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and do nothing else.
  that.nextLine = that.funcModel.getLine(5);
// Java:    exch(a, i, min);
  // Invoke exch. exch() is a function that was registered with the runner
  // and is looked up by it's name as a string (the first argument to invoke()).
  // The other arguments are the arguments to exch. exch is then invoked with
  // said arguments and pushed on the call stack. Execution will then continue
  // there until it returns the result through resultcb(x). Here, no callback
  // is provided as exch() is a void function.
  that.vm.invokeFunc(
    "exch",
    undefined,
    that.args["a"],
    that.locals["i"],
    that.locals["min"]);

  that.nextLine = that.funcModel.getLine(10);
// Java:  }
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and do nothing else.
  that.nextLine = that.funcModel.getLine(3);
// Java:}
}

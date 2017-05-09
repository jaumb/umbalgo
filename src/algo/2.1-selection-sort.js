// Code:public static void sort(Comparable[] a) {
// Note:"Sort an array of Comparable items in ascending order."
sort(a) {
// Code:  int n = a.length;
// Note:"Creates a variable n and stores the number of elements in the array there."
  that.locals["N"] = that.args["a"].length;
  // Tell the Runner which line should be executed next. If this were a
  // conditional construct of some sort, we may need to jump over a block or
  // back to the top of a loop. This was a simple assignment statement, so we
  // just want to proceed to the next line.
  that.nextLineNumber = 3;
// Code:  for (int i = 0; i < n; i++) {
// Note:"If this is the first iteration of the outer loop, i is initialized to 0. On every iteration the loop condition (i < n) is checked to determine if the body will be executed. A red box is drawn around the element at this iteration's i."
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
    that.nextLineNumber = 4;
    that.vm.viz.emphasize([that.locals["i"]]);    // draw box around target index
    that.vm.viz.setMinPos(that.locals["i"]);      // put the min box beneath target index
    that.vm.viz.setMinFill(colors.ACTIVE); // color min red (stays red throughout)
    that.vm.viz.setI(that.locals["i"]);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
  } else {
    // Otherwise, jump past the loop body
    that.nextLineNumber = undefined;
    that.vm.viz.setMinLabel('');
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
    // Cleanup helper map entries in case this is a nested loop and they get
    // used again.
    that.locals["i"] = undefined;
    that.cache["3__firstIteration"] = undefined;
  }
// Code:    int min = i;
// Note:"min is initially set to i. The inner loop will compare min to the unsorted elements, looking for the smallest value. (The current min is colored red)."
  that.locals["min"] = that.locals["i"];
  that.nextLineNumber = 5;
  that.vm.viz.setFill([that.locals["i"]], colors.ACTIVE);
  that.vm.viz.setMinLabel(that.args["a"][that.locals["i"]]);
  that.vm.viz.updateCanvas(that.vm.dur * 2);
  that.vm.updateViz();
// Code:    for (int j = i + 1; j < n; j++) {
// Note:"If this is the first iteration of the inner loop, j is set to the first unsorted index (i + 1). On every iteration the loop condition (j < n) is checked to determine if the body will be executed."
  // Check if this is the first iteration of this loop. If it isn't, there'd be
  // an entry in this line's helpers map to indicate so.
  if (that.cache["5__firstIteration"] === undefined) {
  // This is the first iteration, so perform the initialization.
    that.locals["j"] = that.locals["i"] + 1;
    // Add entry to helpers map so that next time we know not to reinitialize.
    that.cache["5__firstIteration"] = false;
  } else {
    // This isn't the first iteration, so perform the update instead.
    that.vm.viz.setFill([that.locals["j"]], colors.BACKGROUND);
    that.vm.viz.setFill([that.locals["min"]], colors.ACTIVE);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
    that.locals["j"]++;
  }
  // Check if the condition is true
  if (that.locals["j"] < that.locals["N"]) {
    // If so, proceed to the next line, which is the first line of the body of
    // the loop.
    that.nextLineNumber = 6;
    that.vm.viz.setMinPos(that.locals["j"]);                 // move min to compare index
    that.vm.viz.setFill([that.locals["j"]], colors.COMPARE); // color compare index orange
    that.vm.viz.setJ(that.locals["j"]);
    that.vm.viz.updateCanvas(that.vm.dur);
    that.vm.updateViz();
  } else {
    // Otherwise, jump to past the loop body
    that.nextLineNumber = 9;
    // Cleanup helper map entries in case this is a nested loop and they get
    // used again.
    that.locals["j"] = undefined;
    that.cache["5__firstIteration"] = undefined;
  }
// Code:      if (less(a[j], a[min]))
// Note:"Check to see if the value of element j is less than the value of min. Element j is colored orange."
  // Invoke less() and store the result in the helpers map. The first argument
  // to invoke() is the function name, followed by a callback that takes a
  // single argument to recieve the return value. Any following arguments are
  // passed on as parameters to the function being invoked.
  that.nextLineNumber =
    that.args["a"][that.locals["j"]] < that.args["a"][that.locals["min"]]
    ? 7 : 8;
// Code:        min = j;
// Note:"j is less than min and becomes the new min."
  // This is a simple assignment.
  that.vm.viz.setFill([that.locals["min"]], colors.BACKGROUND);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.locals["min"] = that.locals["j"];
  that.vm.viz.setFill([that.locals["min"]], colors.ACTIVE);
  that.vm.viz.setMinLabel(that.args["a"][that.locals["min"]]);
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  // Then advance to the next line.
  that.nextLineNumber = 8;
// Code:    }
// Note:"Execute the loop update (j++) and return to the top of the inner loop to check the loop condition (j < n)."
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and do nothing else.
  that.vm.viz.removeJ();
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.nextLineNumber = 5;
// Code:    exch(a, i, min);
// Note:"The minimum value of the unsorted elements has been found. The min element is swapped with element i and index i is colored green to indicate it contains its sorted value."
  // Invoke exch. exch() is a function that was registered with the runner
  // and is looked up by it's name as a string (the first argument to invoke()).
  // The other arguments are the arguments to exch. exch is then invoked with
  // said arguments and pushed on the call stack. Execution will then continue
  // there until it returns the result through resultcb(x). Here, no callback
  // is provided as exch() is a void function.
  let t = that.args["a"][that.locals["i"]];
  that.args["a"][that.locals["i"]] = that.args["a"][that.locals["min"]];
  that.args["a"][that.locals["min"]] = t;
  that.nextLineNumber = 10;
  that.vm.viz.swap(that.locals["i"], that.locals["min"]);                      // swap values
  that.vm.viz.setFill([that.locals["min"]], colors.BACKGROUND); // set position where min was back to grey
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
  that.vm.viz.setFill([that.locals["i"]], colors.FINISHED);     // set target to blue as we have put min there
  that.vm.viz.deemphasize([that.locals["i"]]);                  // get rid of emphasis square square on target
  that.vm.viz.removeI();
  that.vm.viz.updateCanvas(that.vm.dur);
  that.vm.updateViz();
// Code:  }
// Note:"Execute the loop update (i++) and return to the top of the outer loop to check the loop condition (i < n)."
  // The closing bracket of a for loop should always jump back to the top of the
  // loop and do nothing else.
  that.nextLineNumber = 3;
// Code:}
// Note:"Selection sort is complete."
}

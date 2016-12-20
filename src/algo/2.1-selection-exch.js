// Java:private static void exch(Comparable[] a, int i, int j) {
exch(a, i, j) {
// Java:  Comparable t = a[i];
  that.locals["t"] = params["a"][i];
  that.nextLineNumber++;
// Java:  a[i] = a[j];
  params["a"][i] = params["a"][j];
  that.nextLineNumber++;
// Java:  a[j] = t;
  params["a"][j] = that.locals["t"];
  that.nextLineNumber++;
// Java:}
  // This is the last line of the function, so set nextLineNumber undefined to
  // indicate this to the runner.
  that.nextLineNumber = undefined;
  // If this wasn't a void function, we would return a value through the provided
  // resultcb callback. See less() for an example.
}

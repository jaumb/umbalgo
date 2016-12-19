// Java:private static void exch(Comparable[] a, int i, int j) {
exch(a, i, j) {
// Java:  Comparable t = a[i];
  this.locals["t"] = params["a"][i];
  this.nextLineNumber++;
// Java:  a[i] = a[j];
  params["a"][i] = params["a"][j];
  this.nextLineNumber++;
// Java:  a[j] = t;
  params["a"][j] = this.locals["t"];
  this.nextLineNumber++;
// Java:}
  // This is the last line of the function, so set nextLineNumber undefined to
  // indicate this to the runner.
  this.nextLineNumber = undefined;
  // If this wasn't a void function, we would return a value through the provided
  // resultcb callback. See less() for an example.
}

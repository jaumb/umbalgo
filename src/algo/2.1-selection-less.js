// Java:private static boolean less(Comparable v, Comparable w) {
less(v, w) {
// Java:  return v.compareTo(w) < 0;
  this.helpers[this.currentLineNumber - 1]["v_lt_w"] = (v < w);
  this.nextLineNumber++;
// Java:}
  // This is the last line of the function, so set nextLineNumber undefined to
  // indicate this to the runner.
  this.nextLineNumber = undefined;
  // Return through the result callback
  this.runner.resultcb(this.helpers[this.currentLineNumber - 1]["v_lt_w"]);
}

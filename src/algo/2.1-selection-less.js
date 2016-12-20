// Java:private static boolean less(Comparable v, Comparable w) {
less(v, w) {
// Java:  return v.compareTo(w) < 0;
  that.helpers[that.currentLineNumber - 1]["v_lt_w"] = (v < w);
  that.nextLineNumber++;
// Java:}
  // This is the last line of the function, so set nextLineNumber undefined to
  // indicate this to the runner.
  that.nextLineNumber = undefined;
  // Return through the result callback
  that.runner.resultcb(that.helpers[that.currentLineNumber - 1]["v_lt_w"]);
}

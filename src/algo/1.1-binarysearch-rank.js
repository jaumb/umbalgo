// Code:public static int rank(int key, int[] a) {
rank(key, a) {
// Code:  int lo  = 0;
  locals["lo"] = 0;
  that.nextLineNumber = 3;
// Code:  int hi = a.length - 1;
  locals["hi"] = that.args["a"].length - 1;
  that.nextLineNumber = 4;
// Code:  while (lo <= hi) {
  if (that.locals["lo"] <= that.locals["hi"]) {
    that.nextLineNumber = 5;
  } else {
    that.nextLineNumber = 14;
  }
// Code:    int mid = lo + (hi - lo) / 2;
  that.locals["mid"] = that.locals["lo"] + (that.locals["hi"] - that.locals["lo"]) / 2;
// Code:    if (key < a[mid]) {
  if (that.args["key"] < that.args["a"][that.locals["mid"]]) {
    that.nextLineNumber = 7;
  } else {
    that.nextLineNumber = 8;
  }
// Code:      hi = mid - 1;
  that.locals["hi"] = that.locals["mid"] - 1;
  that.nextLineNumber = 13;
// Code:    } else if (key > a[mid]) {
  if (that.args["key"] > that.args["a"][that.locals["mid"]]) {
    that.nextLineNumber = 9;
  } else {
    that.nextLineNumber = 11;
  }
// Code:      lo = mid + 1;
  that.locals["lo"] = that.locals["mid"] + 1;
  that.nextLineNumber = 13;
// Code:    } else {
  that.nextLineNumber = 11;
// Code:      return mid;
  that.result = that.locals["mid"];
  that.nextLineNumber = undefined;
// Code:    }
  that.nextLineNumber = 13;
// Code:  }
  that.nextLineNumber = 4;
// Code:  return -1;
  that.result = -1;
  that.nextLineNumber = undefined;
// Code:}
}

// Code:private void keys(Node x, Queue<Key> queue, Key lo, Key hi) {
keys(x, queue, lo, hi) {
// Code:  if (x == null) {
  that.nextLineNumber = that.args["x"] == null ? 3 : 5;
// Code:    return;
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  int cmplo = lo.compareTo(x.key);
  if (that.args["lo"] < that.args["x"].key) {
    that.locals["cmplo"] = 1;
  } else if (that.args["lo"] > that.args["x"].key) {
    that.locals["cmplo"] = -1;
  } else {
    that.locals["cmplo"] = 0;
  }
  that.nextLineNumber = 6;
// Code:  int cmphi = hi.compareTo(x.key);
  if (that.args["hi"] < that.args["x"].key) {
    that.locals["cmphi"] = 1;
  } else if (that.args["hi"] > that.args["x"].key) {
    that.locals["cmphi"] = -1;
  } else {
    that.locals["cmphi"] = 0;
  }
  that.nextLineNumber = 7;
// Code:  if (cmplo < 0) {
  that.nextLineNumber = that.locals["cmplo"] < 0 ? 8 : 10;
// Code:    keys(x.left, queue, lo, hi);
  that.vm.invokeFunc(
    "keys",
    function(result) {
      that.nextLineNumber = 10;
    },
    that.args["x"].left,
    that.args["queue"],
    that.args["lo"],
    that.args["hi"]);
// Code:  }
  that.nextLineNumber = 10;
// Code:  if (cmplo <= 0 && cmphi >= 0) {
  that.nextLineNumber = that.locals["cmplo"] <= 0 && that.locals["cmphi"] >= 0 ? 11 : 13;
// Code:    queue.enqueue(x.key);
  that.args["queue"].push(that.args["x"].key);
// Code:  }
  that.nextLineNumber = 13;
// Code:  if (cmphi > 0) {
  that.nextLineNumber = that.locals["cmphi"] > 0 ? 14 : undefined;
// Code:    keys(x.right, queue, lo, hi);
  that.vm.invokeFunc(
    "keys",
    function(result) {
      that.nextLineNumber = undefined;
    },
    that.args["x"].right,
    that.args["queue"],
    that.args["lo"],
    that.args["hi"]);
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = undefined;
// Code:}

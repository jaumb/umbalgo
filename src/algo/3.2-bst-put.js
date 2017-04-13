// Code:private Node put(Node x, Key key, Value val) {
put(x, key, val) {
// Code:  if (x == null) {
  that.nextLineNumber = that.args["x"] === null ? 3 : 5;
// Code:    return new Node(key, val, 1);
  that.result = {
    "key": that.args["key"],
    "value": that.args["val"],
    "N": 1
  };
  that.nextLineNumber = undefined;
// Code:  }
  that.nextLineNumber = 5;
// Code:  int cmp = key.compareTo(x.key);
  if (that.args["key"] < that.args["x"].key) {
    that.locals["cmp"] = 1;
  } else if (that.args["key"] > that.args["x"].key) {
    that.locals["cmp"] = -1;
  } else {
    that.locals["cmp"] = 0;
  }
  that.nextLineNumber = 6;
// Code:  if (cmp < 0) {
  that.nextLineNumber = that.locals["cmp"] < 0 ? 7 : 8;
// Code:    x.left = put(x.left,  key, val);
  that.vm.invokeFunc(
    "put",
    function(result) {
      that.args["x"].left = result;
      that.nextLineNumber = 8;
    },
    that.args["x"].left,
    that.args["key"],
    that.args["val"]);
// Code:  } else if (cmp > 0) {
  that.nextLineNumber = that.locals["cmp"] > 0 ? 9 : 11;
// Code:    x.right = put(x.right, key, val);
  that.vm.invokeFunc(
    "put",
    function(result) {
      that.args["x"].right = result;
      that.nextLineNumber = 11;
    },
    that.args["x"].right,
    that.args["key"],
    that.args["val"]);
// Code:  } else {
  that.nextLineNumber = 11;
// Code:    x.val = val;
  that.args["x"].val = that.args["val"];
  that.nextLineNumber = 13;
// Code:  }
  that.nextLineNumber = 13;
// Code:  x.N = size(x.left) + size(x.right) + 1;
  that.args["x"].N = (that.args["x"].left === null ? 0 : that.args["x"].left.N)
    + (that.args["x"].right === null ? 0 : that.args["x"].right.N) + 1;
  that.nextLineNumber = 14;
// Code:  return x;
  that.result = that.args["x"];
  that.nextLineNumber = undefined;
// Code:}

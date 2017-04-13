private Node floor(Node x, Key key) {
  if (x == null) {
    return null;
  }
  int cmp = key.compareTo(x.key);
  if (cmp == 0) {
    return x;
  }
  if (cmp < 0) {
    return floor(x.left, key);
  }
  Node t = floor(x.right, key);
  if (t != null) {
    return t;
  } else {
    return x;
  }
}

private int rank(Key key, Node x) {
  if (x == null) {
    return 0;
  }
  int cmp = key.compareTo(x.key);
  if (cmp < 0) {
    return rank(key, x.left);
  } else if (cmp > 0) {
    return 1 + size(x.left) + rank(key, x.right);
  } else {
    return size(x.left);
  }
}

private Node min(Node x) {
  if (x.left == null) {
    return x;
  }
  return min(x.left);
}

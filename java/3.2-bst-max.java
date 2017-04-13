private Node max(Node x) {
  if (x.right == null) {
    return x;
  }
  return min(x.right);
}

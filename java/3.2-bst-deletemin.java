private Node deleteMin(Node x) {
  if (x.left == null) {
    return x.right;
  }
  x.left = deleteMin(x.left);
  x.N = size(x.left) + size(x.right) + 1;
  return x;
}

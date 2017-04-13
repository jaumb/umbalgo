private Node deleteMax(Node x) {
  if (x.right == null) {
    return x.left;
  }
  x.right = deleteMin(x.right);
  x.N = size(x.right) + size(x.left) + 1;
  return x;
}

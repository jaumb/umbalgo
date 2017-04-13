private Node select(Node x, int k) {
  if (x == null) {
    return null;
  }
  int t = size(x.left);
  if (t > k) {
    return select(x.left, k);
  } else if (t < k) {
    return select(x.right, k-t-1);
  } else {
    return x;
  }
}

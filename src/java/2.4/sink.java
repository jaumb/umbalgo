// page 316
// I had to take some liberty here, as the book assumes that `N` and `a` are
// available in the class scope (`N` is equal to the size of the heap, which is
// itself equal to (a.length - 1).
public static void sink(Comparable[] a, int k) {
  int N = a.length - 1;
  while (2 * k <= N) {
    int j = 2 * k;
    if (j < N && less(a, j, j + 1)) {
      j++;
    }
    if (!less(a, k, j)) {
      break;
    }
    exch(a, k, j);
    k = j;
  }
}

// page 316
public static void swim(Comparable[] a, int k) {
  while (k > 1 && less(a, k / 2, k)) {
    exch(a, k / 2, k);
    k = k / 2;
  }
}

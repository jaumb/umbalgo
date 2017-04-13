// Algorithm 2.5.1, page 289 & 291
import edu.princeton.cs.algs4;

public class Quick {
  public static void sort(Comparable[] a) {
    StdRandom.shuffle(a);
    sort(a, 0, a.length - 1);
  }

  private static void sort(Comparable[] a, int lo, int hi) {
    if (hi <= lo)
      return;
    int i = lo;
    int j = hi + 1;
    while (true) {
      while (less(a[++i], a[lo])) {
        if (i == hi) {
          break;
        }
      }
      while (less(a[lo], a[--j])) {
        if (j == lo) {
          break;
        }
      }
      if (i >= j) {
        break;
      }
      exch(a, i, j);
    }
    exch(a, lo, j);
    sort(a, lo, j - 1);
    sort(a, j + 1, hi);
  }

  private static boolean less(Comparable v, Comparable w) {
    return v.compareTo(w) < 0;
  }

  private static void exch(Comparable[] a, int i, int j) {
    Comparable t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
}

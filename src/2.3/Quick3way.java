// Algorithm 2.5.2, page 299 & 289
import java.util.Comparable;

public class Quick {
  public static void sort(Comparable[] a) {
    StdRandom.shuffle(a);
    sort(a, 0, a.length - 1);
  }

  private static void sort(Comparable[] a, int lo, int hi) {
    if (hi <= lo)
      return;
    int lt = lo;
    int i = lo + 1;
    int gt = hi;
    Comparable v = a[lo];
    while (i <= gt) {
      int cmp = a[i].compareTo(v);
      if (cmp < 0)
        exch(a, lt++, i++);
      else if (cmp > 0)
        exch(a, i, gt--);
      else
        i++;
    }
    sort(a, lo, lt - 1);
    sort(a, gt + 1, hi);
  }

  private static void exch(Comparable[] a, int i, int j) {
    Comparable t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
}

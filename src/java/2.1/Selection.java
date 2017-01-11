// Algorithm 2.1, page 249 & 245
public class Selection {

  // The way I've written the runner depends on all loops having explicit
  // curly braces enclosing their bodies. This could be modified, but it might
  // be better to just not use implicit braces, even though it means deviating
  // from the textbooks code slightly.
  public static void sort(Comparable[] a) { // 1
    int N = a.length;                       // 2
    for (int i = 0; i < N; i++) {           // 3
      int min = i;                          // 4
      for (int j = i + 1; j < N; j++) {     // 5
        if (less(a[j], a[min]))             // 6
          min = j;                          // 7
      }                                     // 8
      exch(a, i, min);                      // 9
    }                                       // 10
  }                                         // 11

  /*
  public static void sort(Comparable[] a) { // 1
    int N = a.length;                       // 2
    for (int i = 0; i < N; i++) {           // 3
      int min = i;                          // 4
      for (int j = i + 1; j < N; j++)       // 5
        if (less(a[j], a[min]))             // 6
          min = j;                          // 7
      exch(a, i, min);                      // 8
    }                                       // 9
  }                                         // 10
  */
  private static boolean less(Comparable v, Comparable w) {
    return v.compareTo(w) < 0;
  }

  private static void exch(Comparable[] a, int i, int j) {
    Comparable t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
}

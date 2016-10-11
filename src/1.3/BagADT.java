public interface BagADT<Item> {
  void add(Item item);
  boolean isEmpty();
  int size();
}

public interface StackADT<Item> {
  void push(Item item);
  Item pop();
  boolean isEmpty();
  int size();
}

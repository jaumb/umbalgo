// page 121
public interface StackApi<Item> {
  void push(Item item);
  Item pop();
  boolean isEmpty();
  int size();
}

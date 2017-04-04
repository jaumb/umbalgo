// page 121
public interface QueueApi<Item> {
  void enqueue(Item item);
  Item dequeue();
  boolean isEmpty();
  int size();
}

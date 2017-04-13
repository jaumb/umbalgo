public Item dequeue() {
  Item item = first.item;
  first = first.next;
  if (isEmpty()) last = null;
  N--;
  return item;
}

public void enqueue(Item item) {
  Node oldlast = last;
  last = new Node();
  last.item = item;
  last.next = null;
  if (isEmpty()) {
    first = last;
  } else {
    oldlast.next = last;
  }
  N++;
}

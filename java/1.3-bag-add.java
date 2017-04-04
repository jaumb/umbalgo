public void add(Item item) {
  Node oldfirst = first;
  first = new Node();
  first.item = item;
  first.next = oldfirst;
  N++;
}

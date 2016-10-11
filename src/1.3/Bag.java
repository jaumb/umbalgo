// Algorithm 1.4 (page 155)
import java.util.Iterator;
import java.util.NoSuchElementException;

public class Bag<Item> implements BagADT<Item>, Iterable<Item> {
  private Node first;

  private class Node {
    Item item;
    Node next;
  }

  public void add(Item item) {
    Node oldfirst = first;
    first = new Node();
    first.item = item;
    first.next = oldfirst;
  }

  public boolean isEmpty() {
    return first == null;
  }

  public int size() {
    return N;
  }

  public Iterator<Item> iterator() {
    return new ListIterator();
  }

  private class ListIterator implements Iterator<Item> {
    private Node current = first;

    public boolean hasNext() {
      return current != null;
    }

    public void remove() {
      throw new UnsupportedOperationException();
    }

    public Item next() {
      Item item = current.item;
      current = current.next;
      return item;
    }
  }
}

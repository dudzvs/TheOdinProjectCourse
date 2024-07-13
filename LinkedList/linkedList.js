import { Node } from './node.js';

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insertAtBegninning(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  insertAtEnd(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  removeFromBegninning() {
    if (!this.head) return null;

    const removedNode = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.length--;
    return removedNode;
  }

  removeFromEnd() {
    if (!this.head) return null;
    const removedNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;

      while (current.next != this.tail) {
        current = current.next;
      }
      current.next = null;
      this.tail = current;
    }

    this.length--;
    return removedNode;
  }

  getLength() {
    return console.log(`Number of elements: ${this.length}`);
  }
}

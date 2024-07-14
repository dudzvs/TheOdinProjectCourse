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

  insertAt(data, index) {
    if (index < 0 && index > this.length) {
      console.log('error, insert a valid index');
      return;
    }
    if (index === 0) {
      this.insertAtBegninning(data);
      return;
    }
    if (index === this.length) {
      this.insertAtEnd(data);
      return;
    }
    const newNode = new Node(data);
    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
    }

    newNode.next = current.next;
    current.next = newNode;

    if (index === this.length - 1) {
      this.tail = newNode;
    }
    this.length++;
  }

  removeAt(index) {
    if (index < 0 || index > this.length) {
      console.log('Invalid Index');
      return;
    }

    if (index === 0) {
      this.removeFromBegninning();
    }

    if (index === this.length - 1) {
      return this.removeFromEnd();
    }

    let currentNode = this.head;
    let currentIndex = 0;
    let previous = null;

    while (currentIndex < index) {
      previous = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    previous.next = currentNode.next;
    this.length--;

    return currentNode;
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

  printList() {
    let currentNode = this.head;
    let list = '';

    while (currentNode) {
      list += `${currentNode.data} -> `;
      currentNode = currentNode.next;
    }
    list += 'null';
    console.log(list);
  }

  getLength() {
    return console.log(`Number of elements: ${this.length}`);
  }
}

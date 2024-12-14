/** 
 * @class
 * @template T
 * @name _DLLNode
*/
class _DLLNode {
    constructor(data) {
      /** @type {T} */
      this.data = data;
      /** @type {_DLLNode<T>} */
      this.next = null;
      /** @type {_DLLNode<T>} */
      this.prev = null;
    }
};

/**
 * @class
 * @template T
 * @name DoublyLinkedList<T>
 * @classdesc Doubly Linked List
 */
export class DoublyLinkedList {

  constructor() {
    /** @type {_DLLNode<T>} */
    this._head = null;
    /** @type {_DLLNode<T>} */
    this._tail = null;
    /** @type {number} */
    this._length = 0;
  }

  /** @returns {T} */
  get head() {
    return this._head.data;
  }

  /** @returns {T} */
  get tail() {
    return this._tail.data;
  }

  /** @returns {T} */
  get length() {
    return this._length;
  }

  /**
   * @method
   * @name push
   * @param {T} data
   * @returns {DoublyLinkedList<T>}
   * @description Adds item to end of list
   */
  push(data) {
    const newNode = new this.Node(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._tail.next = newNode;
      newNode.prev = this._tail;
      this._tail = newNode;
    }

    this._length++;
    return this;
  }

  /**
   * @method
   * @name pop
   * @returns {T}
   * @description Remove last item of list
   */
  pop() {
    if (!this._head) return undefined;

    const poppedNode = this._tail;
    if (this._length === 1) {
      this._head = null;
      this._tail = null;
    } else {
      this._tail = poppedNode.prev;
      this._tail.next = null;
      poppedNode.prev = null;
    }
    this._length--;
    return poppedNode;
  }

  shift() {
    if (!this._head) return undefined;

    const oldHead = this._head;
    if (this._length === 1) {
      this._head = null;
      this._tail = null;
    } else {
      this._head = oldHead.next;
      this._head.prev = null;
      oldHead.next = null;
    }
    this._length--;
    return oldHead;
  }

  unshift(data) {
    const newNode = new this.Node(data);
    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._head.prev = newNode;
      newNode.next = this._head;
      this._head = newNode;
    }
    this._length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this._length) return null;
    let count, current;
    if (index <= this._length / 2) {
      count = 0;
      current = this._head;
      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      count = this._length - 1;
      current = this._tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current.data;
  }

  set(index, val) {
    const foundNode = this.get(index);
    if (foundNode != null) {
      foundNode.data = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index < 0 || index > this._length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this._length) return !!this.push(val);

    const newNode = new this.Node(val);
    const beforeNode = this.get(index - 1);
    const afterNode = beforeNode.next;

    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;
    this._length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this._length) return undefined;
    if (index === 0) return this.shift();
    if (index === this._length - 1) return this.pop();

    const removedNode = this.get(index);
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    removedNode.next = null;
    removedNode.prev = null;
    this._length--;
    return removedNode;
  }

  print() {
    let arr = [];
    let current = this._head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    console.log(arr);
  }
}

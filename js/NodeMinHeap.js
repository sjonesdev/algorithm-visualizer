const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class NodeMinHeap {

  #priorities = [];
  #heap = [];

  constructor() {}

  get size() {
    return this.#heap.length;
  }

  isEmpty() {
    return this.size == 0;
  }

  peek() {
    return [this.#heap[top], this.#priorities[this.#heap[top].index]];
  }
  
  push(node, priority) {
    this.#heap.push(node);
    this.#priorities[node.index] = priority;
    this.#siftTopUp();
    return this.size;
  }

  pop() {
    const poppedValue = this.peek();
    this.#priorities[poppedValue[0].index] = undefined;
    const bottom = this.size - 1;
    if (bottom > top) {
      this.#swap(top, bottom);
    }
    this.#heap.pop();
    this.#siftTopDown();
    return poppedValue;
  }

  replace(node) {
    const replacedValue = this.peek();
    this.#priorities[replacedValue[0].index] = undefined; //resetting priority at previous top nodes index
    this.#heap[top] = node;
    this.#priorities[node.index] = replacedValue[1]; //giving the new node the same priority as the old
    this.#siftTopDown();
    return replacedValue;
  }

  /**
   * Checks whether heap[i] > heap[j]
   * 
   * @param {number} i The index of the first node.
   * @param {number} j The index of the second node.
   * @returns True if the priority of the node in the heap at index i is less than the priority of ... at j.
   */
  #less(i, j) {
    return this.#priorities[this.#heap[i].index] < this.#priorities[this.#heap[j].index];
  }

  /**
   * Swaps the positions of two nodes in the heap.
   * @param {number} i Index of the first node to be swapped.
   * @param {number} j Index of the second node.
   */
  #swap(i, j) {
    [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
  }

  #siftTopUp() {
    this.#siftUp(this.size - 1);
  }

  #siftUp(i) {
    let node = i;
    let parentNode = parent(node);
    while (node > top && this.#less(node, parentNode)) {
      this.#swap(node, parentNode);
      node = parentNode;
      parentNode = parent(node);
    }
  }
  
  #siftTopDown() {
    this.#siftDown(top);
  }

  #siftDown(i) {
    let node = i;
    let leftNode = left(node);
    let rightNode = right(node);
    while (
      (leftNode < this.size && this.#less(leftNode, node)) ||
      (rightNode < this.size && this.#less(rightNode, node))
    ) {
      let minChild = (rightNode < this.size && this.#less(rightNode, leftNode)) ? rightNode : leftNode;
      this.#swap(node, minChild);
      node = minChild;
      leftNode = left(node);
      rightNode = right(node);
    }
  }

  setPriority(node, priority) {
    const oldPriority = this.#priorities[node.index];
    if(oldPriority === priority) return;
    //swap node with top
    let i = this.#heap.findIndex(element => element.index === node.index);
    
    //sift down is priority increase and vice versa
    if(priority > oldPriority) {
      this.#siftDown(i);
    } else { //priority < oldPriority
      this.#siftUp(i);
    }
  }

  has(node) {
    return this.#heap.includes(node);
  }
}

export default NodeMinHeap;
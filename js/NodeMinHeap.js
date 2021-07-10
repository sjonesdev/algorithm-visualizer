const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class NodeMinHeap {

  ppriorities = [];
  psecPriorities = [];
  pheap = [];

  constructor() {}

  get size() {
    return this.pheap.length;
  }

  isEmpty() {
    return this.size == 0;
  }

  peek() {
    return [this.pheap[top], this.ppriorities[this.pheap[top].index], this.psecPriorities[this.pheap[top].index]];
  }
  
  push(node, priority, secondPriority) {
    this.pheap.push(node);
    this.ppriorities[node.index] = priority;
    this.psecPriorities[node.index] = secondPriority;
    this.psiftTopUp();
    return this.size;
  }

  pop() {
    const poppedValue = this.peek();
    this.ppriorities[poppedValue[0].index] = undefined;
    //this.psecPriorities[poppedValue[0].index] = undefined;
    const bottom = this.size - 1;
    if (bottom > top) {
      this.pswap(top, bottom);
    }
    this.pheap.pop();
    this.psiftTopDown();
    return poppedValue;
  }

  replace(node) {
    const replacedValue = this.peek();
    this.ppriorities[replacedValue[0].index] = undefined; //resetting priority at previous top nodes index
    this.pheap[top] = node;
    this.ppriorities[node.index] = replacedValue[1]; //giving the new node the same priority as the old
    this.psiftTopDown();
    return replacedValue;
  }

  /**
   * Checks whether heap[i] > heap[j]
   * 
   * @param {number} i The index of the first node.
   * @param {number} j The index of the second node.
   * @returns True if the priority of the node in the heap at index i is less than the priority of ... at j.
   */
  pless(i, j) {
    return this.ppriorities[this.pheap[i].index] < this.ppriorities[this.pheap[j].index];
  }

  psecLess(i, j) {
    return this.psecPriorities[this.pheap[i].index] < this.psecPriorities[this.pheap[j].index];
  }

  pequals(i, j) {
    return this.ppriorities[this.pheap[i].index] === this.ppriorities[this.pheap[j].index];
  }

  /**
   * Swaps the positions of two nodes in the heap.
   * @param {number} i Index of the first node to be swapped.
   * @param {number} j Index of the second node.
   */
  pswap(i, j) {
    [this.pheap[i], this.pheap[j]] = [this.pheap[j], this.pheap[i]];
  }

  psiftTopUp() {
    this.psiftUp(this.size - 1);
  }

  psiftUp(i) {
    let node = i;
    let parentNode = parent(node);
    while (node > top && this.pless(node, parentNode)) {
      this.pswap(node, parentNode);
      node = parentNode;
      parentNode = parent(node);
    }
    while(node > top && this.psecLess(node, parentNode)) {
      this.pswap(node, parentNode);
      node = parentNode;
      parentNode = parent(node);
    }
}
  
  psiftTopDown() {
    this.psiftDown(top);
  }

  psiftDown(i) {
    let node = i;
    let leftNode = left(node);
    let rightNode = right(node);
    while (
      (leftNode < this.size && this.pless(leftNode, node)) ||
      (rightNode < this.size && this.pless(rightNode, node))
    ) {
      let minChild = (rightNode < this.size && this.pless(rightNode, leftNode)) ? rightNode : leftNode;
      this.pswap(node, minChild);
      node = minChild;
      leftNode = left(node);
      rightNode = right(node);
    }
    while((leftNode < this.size && this.psecLess(leftNode, node)) ||
       (rightNode < this.size && this.psecLess(rightNode, node)))
      {
        let minChild = (rightNode < this.size && this.psecLess(rightNode, leftNode)) ? rightNode : leftNode;
        this.pswap(node, minChild);
        node = minChild;
        leftNode = left(node);
        rightNode = right(node);
      }
  }

  setPriority(node, priority) {
    const oldPriority = this.ppriorities[node.index];
    if(oldPriority === priority) return;
    this.ppriorities[node.index] = priority;
    //swap node with top
    let i = this.pheap.findIndex(element => element.index === node.index);
    
    //sift down is priority increase and vice versa
    if(priority > oldPriority) {
      this.psiftDown(i);
    } else { //priority < oldPriority
      this.psiftUp(i);
    }
  }

  setSecondPriority(node, priority) {
    const oldPriority = this.psecPriorities[node.index];
    if(oldPriority === priority) return;
    this.psecPriorities[node.index] = priority;
    //swap node with top
    let i = this.pheap.findIndex(element => element.index === node.index);
    
    //sift down is priority increase and vice versa
    if(priority > oldPriority) {
      this.psiftDown(i);
    } else { //priority < oldPriority
      this.psiftUp(i);
    }
  }

  has(node) {
    return this.pheap.includes(node);
  }

  getPriority(node) {
    return this.ppriorities[node.index];
  }

  getSecondaryPriority(node) {
    const g = this.psecPriorities[node.index];
    if(!g) return Infinity;
    return g;
  }
}

export default NodeMinHeap;
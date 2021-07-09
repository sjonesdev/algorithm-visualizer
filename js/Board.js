import Node from './Node.js';
import AnimationPlan from './AnimationPlan.js';

/**
 * A class representing a div element containing a grid of Nodes, used for demonstrating pathfinding algorithms. There should only be one board per html file.
 */
class Board {

    /** @type {HTMLElement} */
    #boardDiv;

    /** @type {number} */
    #rows;

    /** @type {number} */
    #cols;

    /** @type {Array.HTMLElement} */
    #divs = [];

    /** @type {Array.<Node>} */
    #nodes = [];

    /** @type {Node} */
    #start;

    /** @type {Node} */
    #target;

    /** @type {AnimationPlan} */
    #animation;

    /**
     * @constructor Constructs a new board of Nodes of the specified dimensions.
     * @param {number} rows The number of rows to initialize in the board.
     * @param {number} columns The number of columns to initialize in the board.
     */
    constructor(rows, columns) {
        this.#rows = rows;
        this.#cols = columns;
        const docbody = document.getElementsByTagName('body')[0];
        this.#boardDiv = document.createElement('div');
        this.#boardDiv.id = 'board';
        docbody.append(this.#boardDiv);

        for(let i = 0; i < rows; i++) {
            this.#divs[i] = [];
            this.#nodes[i] = [];
            let row = document.createElement('div');
            row.classList = 'row'
            row.id = 'row-' + i;
            this.#boardDiv.append(row);
            for(let j = 0; j < columns; j++) {
                let square = document.createElement('div');
                square.classList = 'square'
                square.id = `square-${i}-${j}`;
                this.#divs[i][j] = square;
                row.append(square);
                let index = i*columns + j;
                this.#nodes[i][j] = new Node(i, j, index, square);
            }
        }
        this.animation = new AnimationPlan();
        this.start = this.getNode(10, 10); //default start node
        this.target = this.getNode(15, 55); //default target node
    }

    /**
     * The number of rows in the board.
     */
    get rows() {
        return this.#rows;
    }

    /**
     * The number of columns in the board.
     */
    get cols() {
        return this.#cols;
    }

    /**
     * The start node of the board. 
     */
    get start() {
        return this.#start;
    }

    get animation() {
        return this.#animation;
    }

    /**
     * Node must be in the board when setting.
     */
    set start(node) {
        const compNode = this.getNode(node.row, node.col);
        if(!Object.is(compNode, node)) return;
        this.#start = node;
        node.makeStart();
    }

    /**
     * The target node of the board.
     */
    get target() {
        return this.#target;
    }

    /**
     * Node must be in the board when setting.
     */
     set target(node) {
        const compNode = this.getNode(node.row, node.col);
        if(!Object.is(compNode, node)) return;
        this.#target = node;
        node.makeTarget();
    }

    set animation(anim) {
        this.#animation = anim;
    }

    /**
     * Sets the start node to the node at a specified row and column of the board.
     * 
     * @param {number} row The row of the node to set as start. 
     * @param {number} col The column of the node to set as start.
     */
    setStartNode(row, col) {
        const node = this.getNode(row, col);
        if(!node) return;
        this.start = node;
    }

    /**
     * Sets the target node to the node at a specified row and column of the board.
     * 
     * @param {number} row The row of the node to set as target. 
     * @param {number} col The column of the node to set as target. 
     */
    setTargetNode(row, col) {
        const node = this.getNode(row, col);
        if(!node) return;
        this.target = node;
    }

    /**
     * Gets the node at the specified row and columns of the board.
     * 
     * @param {number} row The row of the node. 
     * @param {number} col The column of the node. 
     * @returns {Node|null} The node at the specified row and column if it exists, null if not.
     */
    getNode(row, col) {
        const atTop = row < 0;
        const atBottom = row >= this.#rows;
        const atLeft = col < 0;
        const atRight = col >= this.#cols; 
        if(atTop || atBottom || atLeft || atRight) return null;
        return this.#nodes[row][col];
    }
    
    /**
     * Gets a node based on its index.
     * 
     * @param {number} index The index of the node.
     * @returns {Node|null} The node at the specified index if it exists, null if not.
     */
    getNodeByIndex(index) {
        if(index >= this.#cols*this.#rows) return null;
        const col = index % this.#cols;
        const row = Math.floor(index / this.#cols);
        return this.#nodes[row][col];
    }

    /**
     * Stops animation if its running and resets it then resets all the nodes in the board to their default state.
     */
    reset() {
        this.pauseAnimation();
        this.resetAnimation();
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let node = this.getNode(i, j);
                node.reset();
            }
        }

        this.start = this.getNode(10, 10); //default start node
        this.target = this.getNode(15, 55); //default target node
    }

    pauseAnimation() {
        this.#animation.stop();
    }

    playAnimation() {
        this.#animation.run();
    }

    resetAnimation() {
        this.#animation = new AnimationPlan();
    }
}

export default Board;
import Node from './Node.js';
import PathAnimationPlan from './PathAnimationPlan.js';

/**
 * A class representing a div element containing a grid of Nodes, used for demonstrating pathfinding algorithms. There should only be one board per html file.
 */
class Board {

    /** @type {HTMLElement} */
    pboardDiv;

    /** @type {number} */
    prows;

    /** @type {number} */
    pcols;

    /** @type {Array.HTMLElement} */
    pdivs = [];

    /** @type {Array.<Node>} */
    pnodes = [];

    /** @type {Node} */
    pstart;

    /** @type {Node} */
    ptarget;

    /** @type {PathAnimationPlan} */
    panimation;

    /**
     * @constructor Constructs a new board of Nodes of the specified dimensions.
     * @param {number} rows The number of rows to initialize in the board.
     * @param {number} columns The number of columns to initialize in the board.
     */
    constructor(rows, columns) {
        this.prows = rows;
        this.pcols = columns;
        const boardContainer = document.getElementById('board-container');
        this.pboardDiv = document.createElement('div');
        this.pboardDiv.id = 'board';
        boardContainer.append(this.pboardDiv);

        for(let i = 0; i < rows; i++) {
            this.pdivs[i] = [];
            this.pnodes[i] = [];
            let row = document.createElement('div');
            row.classList = 'row'
            row.id = 'row-' + i;
            this.pboardDiv.append(row);
            for(let j = 0; j < columns; j++) {
                let square = document.createElement('div');
                square.classList = 'square'
                square.id = `square-${i}-${j}`;
                this.pdivs[i][j] = square;
                row.append(square);
                let index = i*columns + j;
                this.pnodes[i][j] = new Node(i, j, index, square);
            }
        }
        this.animation = new PathAnimationPlan();
        this.start = this.getNode(10, 10); //default start node
        this.target = this.getNode(15, 55); //default target node
    }

    /**
     * The number of rows in the board.
     */
    get rows() {
        return this.prows;
    }

    /**
     * The number of columns in the board.
     */
    get cols() {
        return this.pcols;
    }

    /**
     * The start node of the board. 
     */
    get start() {
        return this.pstart;
    }

    get animation() {
        return this.panimation;
    }

    /**
     * Node must be in the board when setting.
     */
    set start(node) {
        const compNode = this.getNode(node.row, node.col);
        if(!Object.is(compNode, node)) return;
        this.pstart = node;
        node.makeStart();
    }

    /**
     * The target node of the board.
     */
    get target() {
        return this.ptarget;
    }

    /**
     * Node must be in the board when setting.
     */
     set target(node) {
        const compNode = this.getNode(node.row, node.col);
        if(!Object.is(compNode, node)) return;
        this.ptarget = node;
        node.makeTarget();
    }

    set animation(anim) {
        this.panimation = anim;
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
        const atBottom = row >= this.prows;
        const atLeft = col < 0;
        const atRight = col >= this.pcols; 
        if(atTop || atBottom || atLeft || atRight) return null;
        return this.pnodes[row][col];
    }
    
    /**
     * Gets a node based on its index.
     * 
     * @param {number} index The index of the node.
     * @returns {Node|null} The node at the specified index if it exists, null if not.
     */
    getNodeByIndex(index) {
        if(index >= this.pcols*this.prows) return null;
        const col = index % this.pcols;
        const row = Math.floor(index / this.pcols);
        return this.pnodes[row][col];
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
        this.panimation.stop();
    }

    playAnimation() {
        this.panimation.run();
    }

    resetAnimation() {
        this.panimation = new PathAnimationPlan();
    }
}

export default Board;
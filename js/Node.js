const HEAVY_WEIGHT = 5;
const NORMAL_WEIGHT = 1;


/**
 * A single element of a grid, used for demonstrating pathfinding algorithms.
 */
class Node {
    static START = 'start';
    static TARGET = 'target';
    static WALL = 'wall';
    static WEIGHTED = 'weighted';
    static NORMAL = 'normal'
    static UNVISITED = 'unvisited';
    static VISITED = 'visited';
    static PATH = 'path'

    /** @type {number} */
    #col; 

    /** @type {number} */
    #row; 

    /** @type {number} */
    #index; 

    /** @type {boolean} */
    #weighted;

    /** @type {HTMLElement} */
    #square;

    /** @type {string} */
    #type;

    /** @type {string} */
    #state;

    /**
     * @constructor Makes a new Node object.
     * @param {number} col The column of the node. 0-indexed.
     * @param {number} row The row of the node. 0-indexed.
     * @param {string} type The type of node. (optional)
     */
    constructor(row, col, index, div=null, type=Node.NORMAL) {
        this.#col = col;
        this.#row = row;
        this.#index = index;
        this.#weighted = false;
        if(div) this.#square = div;
        else this.#square = document.getElementById(`square-${row}-${col}`);
        this.#type = type;
        if(type === Node.NORMAL)
            this.#state = Node.UNVISITED;
        else
            this.#state = null;
    }

    /**
     * @returns {number} The column of the node.
     */
    get col() {
        return this.#col;
    }

    /**
     * @returns {number} The row of the node.
     */
    get row() {
        return this.#row;
    }

    /**
     * @returns {number} The index of the node.
     */
    get index() {
        return this.#index;
    }

    /** 
     * @returns {number} The weight value of the node.
     */
    get weight() {
        return (this.#weighted ? NORMAL_WEIGHT : HEAVY_WEIGHT);
    }

    /**
     * @returns {HTMLElement} The div corresponding to the node
     */
    get square() {
        return this.#square;
    }

    /**
     * @returns {string} The type of the node (start, target, normal, or wall).
     */
    get type() {
        return this.#type;
    }

    /**
     * @returns {boolean} True if the node is weighted more heavily than normal.
     */
    get weighted() {
        return this.#weighted;
    }

    /**
     * @returns {string} The state of the node (unvisited, visited, or path).
     */
    get state() {
        return this.#state;
    }

    /**
     * @param {string} newtype The new type to set the node to. Use one of the available constants.
     */
    set type(newtype) {
        this.#type = newtype;
        this.#square.classList = `square ${newtype}` + (this.#weighted ? ' square--weighted' : '');
    }

    /**
     * @param {string} newstate The new state to set the node to. Use one of the available constants.
     */
    set state(newstate) {
        this.#square.classList.remove(this.#state);
        this.#state = newstate;
        this.#square.classList.add(newstate);
    }

    /**
     * Makes the node a start node.
     */
    makeStart() {
        this.type = Node.START;
        this.state = null;
    }

    /**
     * Makes the node a target node.
     */
    makeTarget() {
        this.type = Node.TARGET;
        this.state = null;
    }

    /**
     * Makes the node a wall node.
     */
    makeWall() {
        this.type = Node.WALL;
        this.state = null;
    }

    /**
     * Makes the node a normal node.
     */
    makeNormal() {
        this.type = Node.NORMAL;
        this.state = Node.UNVISITED;
    }

    /**
     * Increases the weight of the node if not already.
     */
    weighdown() {
        this.#weighted = true;
        this.#square.classList.add('square--weighted');
    }

    /**
     * Lightens the node to default weight if not already.
     */
    lighten() {
        this.#weighted = false;
        this.#square.classList.remove('square--weighted');
    }

    /**
     * Gives the node a visited state
     */
    visit() {
        if(this.state) this.state = Node.VISITED;
    }

    /**
     * Gives the node a path state.
     */
    travel() {
        if(this.state) this.state = Node.PATH;
    }

    /**
     * Resets the state to unvisited for normal nodes, null for other types.
     */
    resetState() {
        if(this.state) this.state = Node.UNVISITED;
        else this.state = null;
    }

    /**
     * Checks if the node is a start node.
     * 
     * @returns {boolean} True if the node's type is start.
     */
    isStart() {
        return this.type === Node.START;
    }

    /**
     * Checks if the node is a target node.
     * 
     * @returns {boolean} True if the node's type is target.
     */
    isTarget() {
        return this.type === Node.TARGET;
    }

    /**
     * Checks if the node is a wall node.
     * 
     * @returns {boolean} True if the node's type is wall.
     */
    isWall() {
        return this.type === Node.WALL;
    }

    /**
     * Checks if the node is a normal node.
     * 
     * @returns {boolean} True if the node's type is normal.
     */
    isNormal() {
        return this.type === Node.NORMAL;
    }

    /**
     * Resets the node to its default state.
     */
    reset() {
        this.makeNormal();
        this.lighten();
    }
}

export default Node;
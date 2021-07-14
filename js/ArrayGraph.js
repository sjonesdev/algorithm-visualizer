import SortAnimationPlan from './SortAnimationPlan.js';

/**
 * A class representing a div element containing a grid of Nodes, used for demonstrating pathfinding algorithms. There should only be one board per html file.
 */
class ArrayGraph {

    /** @type {HTMLElement} */
    pgraphDiv;

    /** @type {number} */
    numValues;

    /** @type {number} */
    pcols;

    /** @type {Array.HTMLElement} */
    pdivs = [];

    /** @type {Array.<number>} */
    pvalues = [];

    /** @type {PathAnimationPlan} */
    panimation;

    /**
     * @constructor Constructs a new board of Nodes of the specified dimensions.
     * @param {number} rows The number of rows to initialize in the board.
     * @param {number} columns The number of columns to initialize in the board.
     */
    constructor(numValues) {
        this.numValues = numValues;
        const docbody = document.getElementsByTagName('body')[0];
        this.pgraphDiv = document.createElement('div');
        this.pgraphDiv.id = 'graph';
        docbody.append(this.pgraphDiv);
    }

    toggleHide() {
        this.pgraphDiv.classList.toggle('hidden');
    }

}

export default ArrayGraph;
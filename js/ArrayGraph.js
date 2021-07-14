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

    /** @type {Array.<number>} */ //actual value associated with the value div in the corresponding positions in the divs array 
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
        const arrayGraphContainer = document.getElementById('arrayGraph-container');
        this.pgraphDiv = document.createElement('div');
        this.pgraphDiv.id = 'graph';
        arrayGraphContainer.append(this.pgraphDiv);

        for(let i = 0; i < numValues; i++) {
            const value = document.createElement('div');
            value.classList = 'value';
            value.id = `value-${i}`;
            //value.setAttribute('style', `height: ${10*i + 10}px`);
            this.pgraphDiv.append(value);
            this.pvalues[i] = i;
            this.pdivs[i] = value;
        }

        this.panimation = new SortAnimationPlan;
        this.shuffle();
    }

    get values() {
        return this.pvalues.slice();
    }

    get numValues() {
        return this.pvalues.length;
    }

    get animation() {
        return this.panimation;
    }

    getValueAtIndex(index) {
        return pvalue[index];
    }

    getIndexOfValue(value) {
        return this.pvalues.findIndex(element => element === value);
    }

    /**
     * Stops animation if its running and resets it then resets all the nodes in the board to their default state.
     */
    reset() {
        this.pauseAnimation();
        this.resetAnimation();
        for(let i = 0; i < this.values; i++) {
            this.pvalues[i] = i;
        }
        this.shuffle();
    }

    /**
     * Used in the shuffle function to swap Value 
     * items in the internal array and on screen.
     */
    swapValues(index1, index2) {
        const valDiv1 = this.pdivs[index1];
        const valDiv2 = this.pdivs[index2];
        const val1 = this.pvalues[index1];
        const val2 = this.pvalues[index2];
        [this.pvalues[index1], this.pvalues[index2]] = [val2, val1];
        valDiv1.setAttribute('style', `height: ${val2*10 + 10}px`);
        valDiv2.setAttribute('style', `height: ${val1*10 + 10}px`);
    }

    /**
     * Shuffles the values of the graph using the 
     * Fisher-Yates/Knuth Shuffle Algorithm.
     */
    shuffle() {
        let currentIndex = this.numValues 

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            this.swapValues(currentIndex, randomIndex);
        }
    }

    pauseAnimation() {
        this.panimation.stop();
    }

    playAnimation() {
        this.panimation.run();
    }

    resetAnimation() {
        this.panimation = new SortAnimationPlan();
    }

    //adds step to swap values i and j
    addSwapStepWithValues(i, j) {
        const iDivIndex = this.getIndexOfValue(i);
        const jDivIndex = this.getIndexOfValue(j);
        const valDiv1 = this.pdivs[iDivIndex];
        const valDiv2 = this.pdivs[jDivIndex];
        const val1 = this.pvalues[iDivIndex];
        const val2 = this.pvalues[jDivIndex];
        [this.pvalues[iDivIndex], this.pvalues[jDivIndex]] = [val2, val1];
        this.panimation.pushSwapStep(i, this.pdivs[iDivIndex], j, this.pdivs[jDivIndex]);
    }

    //adds change step to change index to newVal
    addChangeStepWithIndexAndValue(index, newVal) {
        const div = this.pdivs[index];
        this.pvalues[index] = newVal;
        this.panimation.pushChangeStep(newVal, div);
    }
}

export default ArrayGraph;
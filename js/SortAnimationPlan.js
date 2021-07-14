class SwapStep {
    constructor(val1, valDiv1, val2, valDiv2) {
        this.val1 = val1;
        this.valDiv1 = valDiv1;
        this.val2 = val2;
        this.valDiv2 = valDiv2;
    }

    swap() {
        const vd1 = this.valDiv1;
        const vd2 = this.valDiv2;
        vd1.classList = 'value';
        vd2.classList = 'value';
        window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
                vd1.classList = "value value-animation";
                vd2.classList = "value value-animation";
            });
        });
        
        this.valDiv1.setAttribute('style', `height: ${this.val2*10 + 10}px;`);
        this.valDiv2.setAttribute('style', `height: ${this.val1*10 + 10}px;`);
    }
}


/**
 * Class to store animation plans for animating pathfinding algorithms. Contains FIFO stacks for pathing & visting and the number of steps in each stack.
 */
class SortAnimationPlan {
    
    /** @type {Array.<SwapStep>} */
    pswapPlan = [];

    pid = null;

    /**
     * @type {number} The number of the steps in the visit plan.
     */
    get steps() {
        return this.pswapPlan.length;
    }

    get id() {
        return this.pid;
    }

    set id(newid) {
        clearInterval(this.id);
        this.pid = newid;
    }

    /**
     * Pushes a node to the top of the visit plan stack.
     * 
     * @param {Node} node The node to push.
     */
    pushStep(val1, valDiv1, val2, valDiv2) {
        this.pswapPlan.push(new SwapStep(val1, valDiv1, val2, valDiv2));
    }

    /**
     * Pops a node off the bottom of the path stack.
     * 
     * @returns {Node} The node popped or undefined if the stack is empty.
     */
    popStep() {
        return this.pswapPlan.shift();
    }

    reset() {
        this.pswapPlan = [];
        clearInterval(this.pid);
        this.pid = null;
    }

    /**
     * Runs the pathfinding and then path traveling animations stored in this animation plan. Empties the PathAnimationPlan instance in the process.
     */
    run() {
        this.pid = setInterval(animate, 500, this);
        //let pathInterval = null;
        //animates the visit portion of the animation then passes on to path
        function animate(animation) {
            //if no more steps
            if(!animation.steps) {
                clearInterval(animation.id);
                return;
            }
            const cur = animation.popStep();
            cur.swap();
        }
    }

    stop() {
        clearInterval(this.pid);
    }
}

export default SortAnimationPlan;
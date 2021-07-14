/**
 * Class to store animation plans for animating pathfinding algorithms. Contains FIFO stacks for pathing & visting and the number of steps in each stack.
 */
class SortAnimationPlan {
    
    /** @type {Array.<Node>} */
    pvisitplan = [];

    /** @type {Array.<Node>} */
    ppathplan = [];

    pid = null;

    /**
     * @type {number} The number of the steps in the visit plan.
     */
    get visitSteps() {
        return this.pvisitplan.length;
    }

    /**
     * @type {number} The number of steps in the path plan.
     */
    get pathSteps() {
        return this.ppathplan.length;
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
    pushVisitStep(node) {
        if(!node) return;
        this.pvisitplan.push(node);
    }

    /**
     * Pops a node off the bottom of the visit stack.
     * 
     * @returns {Node} The node popped or undefined if the stack is empty. 
     */
    popVisitStep() {
        return this.pvisitplan.shift();
    }

    /**
     * Pushes a node to the top of the path plan stack.
     * 
     * @param {Node} node The node to push.
     */
    pushPathStep(node) {
        this.ppathplan.push(node);
    }

    /**
     * Pops a node off the bottom of the path stack.
     * 
     * @returns {Node} The node popped or undefined if the stack is empty.
     */
    popPathStep() {
        return this.ppathplan.shift();
    }

    reset() {
        this.pvisitplan = [];
        this.ppathplan = [];
        clearInterval(this.pid);
        this.pid = null;
    }

    /**
     * Runs the pathfinding and then path traveling animations stored in this animation plan. Empties the PathAnimationPlan instance in the process.
     */
    run() {
        this.pid = setInterval(animateVisit, 10, this);
        //let pathInterval = null;

        //animates the visit portion of the animation then passes on to path
        function animateVisit(animation) {
            //if no more steps
            if(!animation.visitSteps) {
                clearInterval(animation.id);
                animation.id = setInterval(animatePath, 50, animation);
                return;
            }
            const cur = animation.popVisitStep();
            cur.visit();
        }
        
        //animates the path portion of the animation
        function animatePath(animation) {
            //if no more steps
            if(!animation.pathSteps) {
                clearInterval(animation.id);
                return;
            }
            const cur = animation.popPathStep();
            cur.travel();
        }
    }

    stop() {
        clearInterval(this.pid);
    }
}

export default SortAnimationPlan;
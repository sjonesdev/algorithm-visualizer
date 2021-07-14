import Node from "./Node.js"
import Board from "./Board.js";
import PathAnimationPlan from "./PathAnimationPlan.js";
import NodeMinHeap from "./NodeMinHeap.js";


/**
 * Runs dijkstra's pathfinding algorithm on the given board
 * 
 * @param {Board} board 
 * @returns {boolean} True if a path to the target was found, false if not.
 */
function dijkstra(board) {
    console.log('Running Dijkstra\'s');

    const animation = new PathAnimationPlan();

    //get start and target nodes
    const startNode = board.start;
    const targetNode = board.target;
    //cannot run algorithm without target or start
    if(!startNode || !targetNode) return;

    //intialize vector set, distance array, and previous node array
    const nodeSet = new Set();
    const dist = [];
    const prev = [];
    for(let i = 0; i < board.rows; i++) {
        for(let j = 0; j < board.cols; j++) {
            let node = board.getNode(i, j);
            nodeSet.add(node);
            dist[node.index] = Infinity;
            prev[node.index] = undefined;
        }
    }
    dist[startNode.index] = 0;

    //loop until set is empty, maximum 5000 times
    let count = 0;
    while(nodeSet.size !== 0) {
        if(count > 5000) {
            console.log('infinite loop');
            break;
        }

        //search for lowest distance node in set and visit
        let min = Infinity;
        let index;
        nodeSet.forEach(element => {
            if(dist[element.index] < min) {
                min = dist[element.index];
                index = element.index;
            }
        });
        const u = board.getNodeByIndex(index);
        nodeSet.delete(u);
        animation.pushVisitStep(u);
        //u.visit();

        //if node is target node, we are done
        if(u.index === targetNode.index) {
            console.log('Target found')
            let path = [];
            if(prev[u.index] || u.index === startNode.index) {
                let cur = u;
                while(cur) {
                    path.push(cur);
                    cur = prev[cur.index];
                }
            }
            for(let v = path.length-1; v >= 0; v--) 
                animation.pushPathStep(path[v]);
            break;
        }

        //update distance values of neighbors of current node
        const neighbors = [
            board.getNode(u.row-1, u.col), //top
            board.getNode(u.row, u.col+1), //right
            board.getNode(u.row+1, u.col), //bottom
            board.getNode(u.row, u.col-1)]; //left

        let udist = dist[u.index];
        for(let i in neighbors) {
            const v = neighbors[i];
            if(v == null) continue;
            const alt = udist + v.weight;
            if(alt < dist[v.index]) {
                dist[v.index] = alt;
                prev[v.index] = u;
            }
        }

        count++;
    }
    console.log('Finished Dijkstra\'s');
    board.animation = animation;
    if(animation.pathSteps) return true;
    return false;
}



function aStar(board) {
    console.log('Running A*');

    const animation = new PathAnimationPlan();

    //get start and target nodes
    const startNode = board.start;
    const targetNode = board.target;

    //defined heuristic function
    const h = node => Math.abs(node.col - targetNode.col) + Math.abs(node.row - targetNode.row);

    //cannot run algorithm without target or start
    if(!startNode || !targetNode) return;

    //used as both the Open Set and to store the f values
    const priorityQueue = new NodeMinHeap();
    const gArr = [];
    const prev = [];

    //initialize g-value array and f-value array
    for(let i = 0; i < board.rows; i++) {
        for(let j = 0; j < board.cols; j++) {
            let node = board.getNode(i, j);
            //priorityQueue.push(node, Infinity);
            gArr[node.index] = Infinity;
        }
    }
    //priorityQueue.setPriority(startNode, h(startNode));
    priorityQueue.push(startNode, h(startNode), 0);
    gArr[startNode.index] = 0;

    while(priorityQueue.size) {
        //get min from priorityqueue/minheap
        const [minNode, minf, minh] = priorityQueue.pop();
        animation.pushVisitStep(minNode);

        //if Object.is(min, targetNode), reconstruct path and return animation
        if(minNode.index === targetNode.index) {
            console.log('Target found')
            const path = [];
            if(prev[minNode.index] || minNode.index === startNode.index) {
                let cur = minNode;
                while(cur) {
                    path.push(cur);
                    cur = prev[cur.index];
                }
            }
            for(let v = path.length-1; v >= 0; v--) 
                animation.pushPathStep(path[v]);
            break;
        }

        //update distance values of neighbors of current node
        const neighbors = [
            board.getNode(minNode.row-1, minNode.col), //top
            board.getNode(minNode.row, minNode.col+1), //right
            board.getNode(minNode.row+1, minNode.col), //bottom
            board.getNode(minNode.row, minNode.col-1)]; //left

        for(let i in neighbors) {
            const cur = neighbors[i];
            if(!cur) continue;
            const dist = gArr[minNode.index] + cur.weight;
            if(dist < gArr[cur.index]) {
                prev[cur.index] = minNode;
                gArr[cur.index] = dist;
                const heur = h(cur)
                const newf = dist + heur;
                if(priorityQueue.has(cur)) {
                    priorityQueue.setPriority(cur, newf);
                    priorityQueue.setSecondPriority(cur, heur);
                } else {
                    priorityQueue.push(cur, newf, heur);
                }
            }
        }
    }
    console.log('Finished A*');
    board.animation = animation;
    if(animation.pathSteps) return true;
    return false;
}


function breadthFirst(board) {
    console.log('Running Bread-First Search');

    const animation = new PathAnimationPlan();

    //get start and target nodes
    const startNode = board.start;
    const targetNode = board.target;

    const queue = [];
    const explored = [];
    const prev = [];

    //initialize g-value array and f-value array
    for(let i = 0; i < board.rows; i++) {
        for(let j = 0; j < board.cols; j++) {
            let node = board.getNode(i, j);
            //priorityQueue.push(node, Infinity);
            explored[node.index] = false;
        }
    }

    explored[startNode.index] = true;
    queue.push(startNode);

    while(queue.length) {
        const cur = queue.shift();
        animation.pushVisitStep(cur);

        if(cur.index === targetNode.index) {
            console.log('Target found')
            const path = [];
            if(prev[cur.index] || cur.index === startNode.index) {
                let cur1 = cur;
                while(cur1) {
                    path.push(cur1);
                    cur1 = prev[cur1.index];
                }
            }
            for(let v = path.length-1; v >= 0; v--) 
                animation.pushPathStep(path[v]);
            break;
        }

        //add neighbors to queue if they have not already been explored
        const neighbors = [
            board.getNode(cur.row-1, cur.col), //top
            board.getNode(cur.row, cur.col+1), //right
            board.getNode(cur.row+1, cur.col), //bottom
            board.getNode(cur.row, cur.col-1)]; //left

        for(let i in neighbors) {
            const neighbor = neighbors[i];
            if(!neighbor) continue;
            if(!explored[neighbor.index]) {
                explored[neighbor.index] = true;
                prev[neighbor.index] = cur;
                queue.push(neighbor);
            }
        }
    }
    console.log('Finished Breadth-First Search');
    board.animation = animation;
    if(animation.pathSteps) return true;
    return false;
}


function depthFirst(board) {
    console.log('Running Depth-First Search');

    const animation = new PathAnimationPlan();

    //get start and target nodes
    const startNode = board.start;
    const targetNode = board.target;

    const stack = [];
    const explored = [];
    const prev = [];

    //initialize g-value array and f-value array
    for(let i = 0; i < board.rows; i++) {
        for(let j = 0; j < board.cols; j++) {
            let node = board.getNode(i, j);
            //priorityQueue.push(node, Infinity);
            explored[node.index] = false;
        }
    }

    stack.push(startNode);

    while(stack.length) {
        const cur = stack.pop();
        if(explored[cur.index]) continue;
        animation.pushVisitStep(cur);

        if(cur.index === targetNode.index) {
            console.log('Target found')
            const path = [];
            if(prev[cur.index] || cur.index === startNode.index) {
                let cur1 = cur;
                while(cur1) {
                    path.push(cur1);
                    cur1 = prev[cur1.index];
                    console.log(`cur1: ${cur1.index}`);
                }
            }
            for(let v = path.length-1; v >= 0; v--) 
                animation.pushPathStep(path[v]);
            break;
        }

        explored[cur.index] = true;

        //add neighbors to queue if they have not already been explored
        const neighbors = [
            board.getNode(cur.row-1, cur.col), //top
            board.getNode(cur.row, cur.col+1), //right
            board.getNode(cur.row+1, cur.col), //bottom
            board.getNode(cur.row, cur.col-1)]; //left

        for(let i in neighbors) {
            const neighbor = neighbors[i];
            if(!neighbor) continue;
            const prevOfCur = prev[cur.index]
            if(prevOfCur)
                if(prevOfCur.index !== neighbor.index)
                    prev[neighbor.index] = cur;
            stack.push(neighbor);
        }
    }
    console.log('Finished Depth-First Search');
    board.animation = animation;
    if(animation.pathSteps) return true;
    return false;
}


function bStar(board) {}


function greedyBestFirst(board){}


function iterDeepDepthFirst(board) {}



export { dijkstra, aStar, breadthFirst, depthFirst };
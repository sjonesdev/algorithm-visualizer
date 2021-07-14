//Note - This program is set up to support private fields when support 
//becomes more widely available with only minor refactoring. Currently,
//fields that are supposed to be private start with p instead of # or _ 

import Node from './Node.js';
import Board from './Board.js';
import { dijkstra, aStar, breadthFirst, depthFirst } from './path-algos.js';
import AnimationPlan from './AnimationPlan.js';

const cols = 75, rows = 25;
const board = new Board(rows, cols);
let boardAnimation;

const algoTypePicker = document.getElementById('algo-type');
const pathAlgoPickerDiv = document.getElementById('path-algo-picker');
const sortAlgoPickerDiv = document.getElementById('sort-algo-picker');
const pathAlgoPicker = document.getElementById('path-algo');
const sortAlgoPicker = document.getElementById('sort-algo');

algoTypePicker.addEventListener('input', (e) => {
    pathAlgoPickerDiv.classList.toggle('hidden');
    sortAlgoPickerDiv.classList.toggle('hidden');
});

const runBtn = document.getElementById('run-btn');
const countParagraph = document.getElementById('count');
runBtn.addEventListener('click', () => {
    const algoType = algoTypePicker.value;
    let success;
    switch(algoType) {
        case 'pathfinding':
            success = runPathAlgorithm(pathAlgoPicker.value);
            break;
        case 'sorting':
            break;
    }
    countParagraph.innerText = `Squares Explored: ${board.animation.visitSteps}`;
    board.playAnimation();
});

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    board.reset();
});

function runPathAlgorithm(algo) {
    let success;
    switch(algo) {
        case 'dijkstra':
            success = dijkstra(board);
            break;
        case 'astar':
            success = aStar(board);
            break;
        case 'breadth-first':
            success = breadthFirst(board);
            break;
        case 'depth-first':
            success = depthFirst(board);
            break;
        default:
            success = false;
            break;
    }
    return success;
}
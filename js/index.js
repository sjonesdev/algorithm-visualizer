//Note - This program is set up to support private fields when support 
//becomes more widely available with only minor refactoring. Currently,
//fields that are supposed to be private start with p instead of # or _ 

import Node from './Node.js';
import Board from './Board.js';
import ArrayGraph from './ArrayGraph.js';
import { dijkstra, aStar, breadthFirst, depthFirst } from './path-algos.js';
import { selectionSort, bubbleSort, insertionSort, mergeSort } from './sort-algos.js';
import PathAnimationPlan from './PathAnimationPlan.js';

const cols = 75, rows = 25;
const board = new Board(rows, cols);

const numValues = 30;
const arrGraph = new ArrayGraph(numValues);

const algoTypePicker = document.getElementById('algo-type');
const pathAlgoPickerDiv = document.getElementById('path-algo-picker');
const sortAlgoPickerDiv = document.getElementById('sort-algo-picker');
const pathAlgoPicker = document.getElementById('path-algo');
const sortAlgoPicker = document.getElementById('sort-algo');
const boardContainer = document.getElementById('board-container');
const arrayGraphContainer = document.getElementById('arrayGraph-container');

showSelectedAlgoStuff();
algoTypePicker.addEventListener('input', (e) => {
    showSelectedAlgoStuff();
});

const runBtn = document.getElementById('run-btn');
const countParagraph = document.getElementById('count');
runBtn.addEventListener('click', () => {
    setTimeout(() => { //delay 500ms so that any ongoing animations can finish
        // board.reset();
        // arrGraph.reset();
        const algoType = algoTypePicker.value;
        let success;
        switch(algoType) {
            case 'pathfinding':
                success = runPathAlgorithm(pathAlgoPicker.value);
                countParagraph.innerText = `Squares Explored: ${board.animation.visitSteps}`;
                board.playAnimation();
                break;
            case 'sorting':
                success = runSortAlgorithm(sortAlgoPicker.value);
                countParagraph.innerText = `Swaps Performed: ${arrGraph.animation.steps}`;
                arrGraph.playAnimation();
                break;
        }
    }, 500);
});

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    board.reset();
    arrGraph.reset();
});

function showSelectedAlgoStuff() {
    const type = algoTypePicker.value;
    switch(type) {
        case 'pathfinding':
            pathAlgoPickerDiv.classList.remove('hidden');
            boardContainer.classList.remove('hidden');
            sortAlgoPickerDiv.classList.add('hidden');
            arrayGraphContainer.classList.add('hidden');
            break;
        case 'sorting':
            pathAlgoPickerDiv.classList.add('hidden');
            boardContainer.classList.add('hidden');
            sortAlgoPickerDiv.classList.remove('hidden');
            arrayGraphContainer.classList.remove('hidden');
            break;
    }
}

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

function runSortAlgorithm(algo) {
    let success;
    switch(algo) {
        case 'selection':
            success = selectionSort(arrGraph);
            break;
        case 'bubble':
            success = bubbleSort(arrGraph);
            break;
        case 'insertion':
            success = insertionSort(arrGraph);
            break;
        case 'merge':
            success = mergeSort(arrGraph);
            break;
        default:
            success = false;
            break;
    }
    return success;
}
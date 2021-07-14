import ArrayGraph from "./ArrayGraph.js";
import SortAnimationPlan from "./SortAnimationPlan.js";


function selectionSort(graph) {
    console.log('Running Selection Sort');

    const vals = graph.values;
    const numVals = graph.numValues;

    for(let i = 0; i < numVals-1; i++) {
        let minIndex = i;
        for(let j = i+1; j < numVals; j++) {
            if(vals[j] < vals[minIndex]) { 
                minIndex = j;
            } 
        }
        const front = vals[i];
        const min = vals[minIndex];
        [vals[i], vals[minIndex]] = [min, front];
        graph.addSwapStepWithValues(min, front);
    }

    console.log(`Sorted Values: ${vals}`);
    console.log('Finished Selection Sort');
    if(graph.animation.steps) return true;
    return false;
}


function bubbleSort(graph) {
    
}


function insertionSort(graph) {
    
}


function mergeSort(graph) {
    
}



export { selectionSort, bubbleSort, insertionSort, mergeSort };
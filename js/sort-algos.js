import ArrayGraph from "./ArrayGraph.js";
import SortAnimationPlan from "./SortAnimationPlan.js";


//O(n^2) time, O(n) space
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


//O(n^2) time, O(n) space
function bubbleSort(graph) {
    console.log('Running Bubble Sort');

    const vals = graph.values;
    const numVals = graph.numValues;

    for(let i = 0; i < numVals-1; i++) {
        for(let j = 0; j < numVals-i-1; j++) {
            if(vals[j] > vals[j+1]) {
                const val = vals[j];
                const nextVal = vals[j+1];
                [vals[j], vals[j+1]] = [nextVal, val];
                graph.addSwapStepWithValues(nextVal, val);
            }
        }
    }

    console.log(`Sorted Values: ${vals}`);
    console.log('Finished Bubble Sort');
    if(graph.animation.steps) return true;
    return false;
}


function insertionSort(graph) {
    console.log('Running Insertion Sort');

    const vals = graph.values;
    const numVals = graph.numValues;

    let j;
    console.log(vals.toString());
    for(let i = 1; i < numVals; i++) {
        const key = vals[i];
        let j;
        for(j = i-1; j >=0 && vals[j] > key; j--) {
            vals[j+1] = vals[j];
            graph.addSwapStepWithValues(vals[j+1], key);
        }
        vals[j+1] = key;
        graph.addSwapStepWithValues(vals[j+1], key);
    }

    console.log(`Sorted Values: ${vals}`);
    console.log('Finished Insertion Sort');
    if(graph.animation.steps) return true;
    return false;
}


//O(n^2) time, O(n) space
function mergeSort(graph) {
    console.log('Running Insertion Sort');

    const vals = graph.values;
    const numVals = graph.numValues;

    const merge = (arr, l, m, r) => {
        const n1 = m - l + 1;
        const n2 = r - m;
    
        // Create temp arrays
        const L = new Array(n1);
        const R = new Array(n2);
        // Copy data to temp arrays L[] and R[] change this to slice
        for (let i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (let j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];
    
        // Merge the temp arrays back into arr[l..r]
        // Initial index of first subarray
        let i = 0;
        // Initial index of second subarray
        let j = 0;
        // Initial index of merged subarray
        let k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                graph.addChangeStepWithIndexAndValue(k, L[i]);
                arr[k] = L[i];
                i++;
            } else {
                graph.addChangeStepWithIndexAndValue(k, R[j]);
                arr[k] = R[j];
                j++;
            }
            k++;
        }
    
        // Copy the remaining elements of
        // L[], if there are any
        while (i < n1) {
            graph.addChangeStepWithIndexAndValue(k, L[i]);
            arr[k] = L[i];
            i++;
            k++;
        }
        // Copy the remaining elements of
        // R[], if there are any
        while (j < n2) {
            graph.addChangeStepWithIndexAndValue(k, R[j]);
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    const sortSub = (arr, l, r) => {
        if(l>=r){
            return;//returns recursively
        }
        const m = l + parseInt((r-l)/2);
        sortSub(arr, l, m);
        sortSub(arr, m+1, r);
        merge(arr, l, m, r);
    } 

    sortSub(vals, 0, numVals-1);

    console.log(`Sorted Values: ${vals}`);
    console.log('Finished Insertion Sort');
    if(graph.animation.steps) return true;
    return false;
}



export { selectionSort, bubbleSort, insertionSort, mergeSort };
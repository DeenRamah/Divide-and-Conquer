function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Target not found
}

const sortedArray = [3, 7, 15, 23, 31, 42];
console.log(binarySearch(sortedArray, 23)); // Output: 3
console.log(binarySearch(sortedArray, 5));  // Output: -1

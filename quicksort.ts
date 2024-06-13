function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (const el of arr.slice(0, arr.length - 1)) {
        el < pivot ? left.push(el) : right.push(el);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

const array = [34, 7, 23, 32, 5, 62];
console.log(quickSort(array));

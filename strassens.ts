function addMatrix(A: number[][], B: number[][]): number[][] {
    const n = A.length;
    const C = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }

    return C;
}

function subtractMatrix(A: number[][], B: number[][]): number[][] {
    const n = A.length;
    const C = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            C[i][j] = A[i][j] - B[i][j];
        }
    }

    return C;
}

function strassenMultiply(A: number[][], B: number[][]): number[][] {
    const n = A.length;
    if (n === 1) {
        return [[A[0][0] * B[0][0]]];
    }

    const half = n / 2;

    const A11 = A.slice(0, half).map(row => row.slice(0, half));
    const A12 = A.slice(0, half).map(row => row.slice(half));
    const A21 = A.slice(half).map(row => row.slice(0, half));
    const A22 = A.slice(half).map(row => row.slice(half));

    const B11 = B.slice(0, half).map(row => row.slice(0, half));
    const B12 = B.slice(0, half).map(row => row.slice(half));
    const B21 = B.slice(half).map(row => row.slice(0, half));
    const B22 = B.slice(half).map(row => row.slice(half));

    const M1 = strassenMultiply(addMatrix(A11, A22), addMatrix(B11, B22));
    const M2 = strassenMultiply(addMatrix(A21, A22), B11);
    const M3 = strassenMultiply(A11, subtractMatrix(B12, B22));
    const M4 = strassenMultiply(A22, subtractMatrix(B21, B11));
    const M5 = strassenMultiply(addMatrix(A11, A12), B22);
    const M6 = strassenMultiply(subtractMatrix(A21, A11), addMatrix(B11, B12));
    const M7 = strassenMultiply(subtractMatrix(A12, A22), addMatrix(B21, B22));

    const C11 = addMatrix(subtractMatrix(addMatrix(M1, M4), M5), M7);
    const C12 = addMatrix(M3, M5);
    const C21 = addMatrix(M2, M4);
    const C22 = addMatrix(subtractMatrix(addMatrix(M1, M3), M2), M6);

    const C = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < half; i++) {
        for (let j = 0; j < half; j++) {
            C[i][j] = C11[i][j];
            C[i][j + half] = C12[i][j];
            C[i + half][j] = C21[i][j];
            C[i + half][j + half] = C22[i][j];
        }
    }

    return C;
}

// Example usage:
const A = [
    [1, 2],
    [3, 4]
];
const B = [
    [5, 6],
    [7, 8]
];
console.log(strassenMultiply(A, B)); // Output: [[19, 22], [43, 50]]

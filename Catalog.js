const fs = require('fs');

function readInput(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}
function decodeValue(value, base) {
    return parseInt(value, base);
}
function Lagrange(points, k) {
    let secret = 0;
    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= (0 - xj) / (xi - xj); 
            }
        }
        secret += yi * li;
    }
    return Math.round(secret);
}

function solution(filePath) {
    const data = readInput(filePath);
    const n = data.keys.n;
    const k = data.keys.k;

    let points = [];
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const x = i;
            const y = decodeValue(data[i].value, data[i].base);
            points.push({ x, y });
        }
    } const secret = Lagrange(points, k);
    console.log(`the constant term of the polynomial: ${secret}`);
}
solution('input.json');

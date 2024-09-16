function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(xs, ys, x) {
    let result = 0.0;
    const n = xs.length;

    for (let i = 0; i < n; i++) {
        let term = ys[i];
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term = term * (x - xs[j]) / (xs[i] - xs[j]);
            }
        }
        result += term;
    }
    return result;
}

function findPolynomialConstantTerm(inputJson) {
    const data = JSON.parse(inputJson);
    const n = data.keys.n;
    const k = data.keys.k;

    const roots = [];

    // Extract and decode the roots
    for (const key in data) {
        if (key === 'keys') continue;
        const base = parseInt(data[key].base);
        const value = data[key].value;
        const x = parseInt(key);
        const y = decodeValue(base, value);
        roots.push({ x, y });
    }

    if (roots.length < k) {
        throw new Error("Not enough roots provided.");
    }

    const xs = roots.map(root => root.x);
    const ys = roots.map(root => root.y);

    const constantTerm = lagrangeInterpolation(xs, ys, 0);
    return constantTerm;
}


const inputJson = `{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}`;

try {
    const constantTerm = findPolynomialConstantTerm(inputJson);
    console.log(`The constant term of the polynomial is: ${constantTerm}`);
} catch (error) {
    console.error(error.message);
}

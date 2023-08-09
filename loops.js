let array1 = [1, 2, 3, 4, 5];

// using while loop print first even in array and its index.
let i = 0;
while (i < array1.length) {
    if (array1[i] % 2 === 0) {
        console.log(array1[i], i);
        break;
    } 
    i++;
}

// using do...while loops to print first odd of array and its index.
i = 0;
do {
    if (array1[i] % 2 === 1) {
        console.log(array1[i], i);
        break;
    }
    i++;
} while (i < array1.length + 1)

// using for loop to print the odds in array
for (let i = 0; i < array1.length; i++) {
    if (array1[i] % 2 === 0) continue;
    console.log(array1[i]);
}

// using for...of to print elements of array
let fruits = Array.of('orange', 'melon', 'watermelon')
for (let fruitName of fruits) {
    console.log(fruitName);
}

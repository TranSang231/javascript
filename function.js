function printName(name) {
    return "My name is " + name;
} 
let result = printName('Sang');
console.log(result);

function user(name, age) {
    return (`My name is ${name}. I'am ${age} years ago`)
}
result = user('Sang', 20);
console.log(result);

let arrays = [1, 5, 6, 4, 8, 2, 4, 6, 9];
let sum = 0;

function checkOdd(value) {
    return (value % 2 === 1);
}

function checkEven(value) {
    return (value % 2 === 0);
}

function count(numbers) {
    let [countOdd, countEven] = [0, 0];
    
    for (number of numbers) {
        if (checkOdd(number)) countOdd++;
        if (checkEven(number)) countEven++;
    }
    return [countOdd, countEven];
}
result = count(arrays);
console.log(result);


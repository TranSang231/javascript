// array
const array1 = [1,2,3,4]
const array2 = Array.of(7,8,9,10,11)
console.log(array1.length)  // 4
console.log(array2.length)  // 5

const array3 = Array(5).fill(3)
console.log(array3)  // [ 3, 3, 3, 3, 3 ]
console.log(Array(5).fill(3, 0, 3))  // [ 3, 3, 3, <2 empty items> ]
console.log(Array(5).fill(3, 1, 3))  // [ <1 empty item>, 3, 3, <2 empty items> ]
console.log(Array(5).fill(3, 1, 4))  // [ <1 empty item>, 3, 3, 3, <1 empty item> ]
console.log(Array(5).fill(3, -3, -1)) // start: -3+5=2 ; end: -1+5=4 => [ <2 empty items>, 3, 3, <1 empty item> ]

// push method
array1.push(5)
console.log(array1) // [1, 2, 3, 4, 5,]

// unshift method
array2.unshift(6)
console.log(array2) // [ 6, 7, 8, 9, 10, 11 ]

// shift method
array1.shift(1)
console.log(array1) // [ 2, 3, 4, 5 ]

// pop method
array2.pop(11)
console.log(array2) // [ 6, 7, 8, 9, 10 ]

// join arrays using concat
console.log(array1.concat(array2)) //  [ 2, 3, 4,  5, 6, 7, 8, 9, 10 ]
console.log(array1.concat(array1)) // [ 2, 3, 4, 5, 2, 3, 4, 5 ]
console.log(array1) // [ 2, 3, 4, 5 ]

// join array using spread operator
let array4 = [...array1, ...array2, ...array3]
console.log(array4)
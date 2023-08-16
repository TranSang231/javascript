// filter all the value bigger than 4
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(array.filter(element => element > 4))


// filter values that not indefined
let array1 = ['sang', , '', 1, 3, true, 2222];

console.log(array1.filter(element => element !== undefined));


// searching
let cities = ['Da Nang', 'Hue', 'Ho Chi Minh', 'Vinh', 'Vinh Ha Long', 'Ha Noi', 'Hoi An']

function filterItems(arr, query) {
    return arr.filter(element => element.toLowerCase().includes(query.toLowerCase()))
}

console.log(filterItems(cities, 'An')); // [ 'Da Nang', 'Hoi An' ]
console.log(filterItems(cities, 'OI')); // [ 'Ha Noi', 'Hoi An' ]

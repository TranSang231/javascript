const cities = ['DaNang', 'Hue', 'HoChiMinh', 'HaNoi', 'VungTau'];
const person = {
    name: 'sang',
    age: 18,
    city: 'DaNang'
}

let city = 'Hue';
let chars = 9;


// find method
let match1 = cities.find(value => value === city);
console.log(match1) // Hue

let match2 = cities.find(value => value.length === chars);
console.log(match2) // HoChiMinh

let match3 = cities.find(function (value) {
  return value === this.city
}, person) 
console.log(match3) // DaNang


// findIndex method
let match4 = cities.findIndex(value => value === city)
console.log(match4)  // 1


// includes method
let match5 = cities.includes('Hue')
console.log(match5) // true

let match6 = cities.includes('DaNang', 2)
console.log(match6); // false

// indexOf method
let str = 'I like cats I love cats, cats is my life'
console.log(str.indexOf('cats')) // 7 

let fruits = ['kiwi', 'apple', 'waterlemon', 'lemon']
console.log(fruits.indexOf('waterlemon')) //  2 
console.log(fruits.indexOf('strawberry')) //  return -1 because the value is not found



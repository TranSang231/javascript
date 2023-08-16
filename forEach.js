const characters = [
    {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        eye_color: 'blue',
        gender: 'male',
    },
    {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        eye_color: 'yellow',
        gender: 'male',
    },
    {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        eye_color: 'brown',
        gender: 'female',
    },
    {
        name: 'Anakin Skywalker',
        height: '188',
        mass: '84',
        eye_color: 'blue',
        gender: 'male',
    },
];

// get name
let getNames = characters.forEach(character => console.log(character.name))

// create a new array
let newArray = []
let minifiedCharacters = characters.forEach(function (character) {
    newArray.push({
        name: character.name,
        height: character.height
    })
})

console.log(newArray)



let array = [11, 17, 5, 96, 47, 51, 110, -99, 0]; 
let [min, max] = [array[0], array[0]];

array.forEach(element => {
    if (element < min) min = element
    if (element > max) max = element
});

console.log('minimun is', min)
console.log('maximun is', max)
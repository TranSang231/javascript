let minAge = (ages) => {
    let min = ages[0];
    for (let i = 0; i < ages.length; i++) {
        if (ages[i] < min) min = ages[i];  
    }
    return min;
}

let result = minAge([17, 19, 24, 64, 6]);
console.log(result)
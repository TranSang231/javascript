// create user object by using literal syntax   
const user = {
    firstName: 'Sang',
    lastName: 'Tran',
    age: 17,
    job: 'Student',
    intro: function () {
        return `My name is ${this.firstName} ${this.lastName}, I'm ${this.age} years old and I am a ${this.job}  `;
    }
}

// initialize an object by new Object() syntax  
const fruits = new Object();
fruits.fruitName = 'watermelon'
console.log(fruits)

// initialize an object by Object.create() syntax base on user object
const friend = Object.create(user)
friend.name = 'Vinh'
console.log(friend)


console.log(user.intro())
console.log(user.firstName)

// add character property 
user.character = 'good boy'
console.log(user)

// delete job property
delete user.job
console.log(user)


function Phone(name, version, newFeature) {
    this.name = name
    this.version = version
    this.newFeature = newFeature
}

const iPhone = new Phone('Iphone', 14, 'Super Retina XDR ')
const samSung = new Phone('SamSung', 's23 ultra', 'Super HDR selfie camera')

console.log(iPhone)
console.log(samSung)
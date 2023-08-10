// create user object
const user = {
    firstName: 'Sang',
    lastName: 'Tran',
    age: 17,
    job: 'Student',
    intro: function () {
        return `My name is ${this.firstName} ${this.lastName}, I'm ${this.age} years old and I am a ${this.job}  `;
    }
}

console.log(user.intro())
console.log(user.firstName)

// add character property 
user.character = 'good boy'
console.log(user)

// delete job property
delete user.job
console.log(user)

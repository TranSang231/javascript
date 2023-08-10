class Person {
    constructor(firstName, lastName, age, job, character) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.job = job
        this.character = character
    }

    intro() {
        return `Hi, I am ${this.firstName} ${this.lastName}, I'm ${this.age}, I'm ${this.job} and I am a ${this.character}`
    }
}

const vinh = new Person('Vinh', 'Le', 30, 'chômage', 'bad boy');
console.log(vinh);
console.log(vinh.intro())


class Student extends Person {
    
    constructor(firstName, lastName, age, job, character, className) {
        super(firstName, lastName, age, job, character)
        this.className = className
    }
    // first way.
    infor() {
       return `${this.intro()}. I study in ${this.className}` 
    }
    // second way
    // intro() {
    //     return `${super.intro()}. I study in ${this.className}`
    // }
}

const sang = new Student('Sang', 'Tran', 17, 'student', 'good boy', '21PFIEV1')
console.log(sang)
console.log(sang.infor())
// console.log(sang.intro())
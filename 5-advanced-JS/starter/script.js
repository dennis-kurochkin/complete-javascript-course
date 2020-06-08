var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
}

var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function () {
    console.log(2020 - this.yearOfBirth);
};

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 2000, 'designer');

john.calculateAge();
jane.calculateAge();
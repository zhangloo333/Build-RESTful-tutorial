
/*
var person = {
  name: "andrew",
  age:21
}

function updatePerson(obj) {
  //如果直接付给一个object的值，是不会修改元内容的
//   obj = {
//     name:'Anrew',
//     age:24
//   }

  obj.age = 24;
}

updatePerson(person);
console.log(person)
*/

var grades = [15, 88];

function addGrades(gradesArr) {
  gradesArr.push(55);
  debugger;
}

addGrades(grades);
console.log(grades);

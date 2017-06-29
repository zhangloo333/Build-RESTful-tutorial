var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-SQL.sqlite'
});

var Todo = sequelize.define('todo', {
  description:{
    type:Sequelize.STRING
  },
  completed:{
    type:Sequelize.BOOLEAN
  }
});

sequelize.sync({force: true}).then(function() {
  console.log('Everything is synced');
  // add data to database, 以后data 就可以从restful api 进入数据库
  Todo.create({
    description: 'walking on dog',
    completed: false
  }).then(function (todo) {
    console.log('Finished');
    console.log(todo);
  })


});

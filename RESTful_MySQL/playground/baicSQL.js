var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-SQL.sqlite'
});

var Todo = sequelize.define('todo', {
  description:{
    type:Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1,250]
    }
  },
  completed:{
    type:Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

/*
sequelize.sync({force: true}).then(function() {
  console.log('Everything is synced');
  // add data to database, 以后data 就可以从restful api 进入数据库
  Todo.create({
    description: "I need walking today",
    completed: false
  }).then(function (todo) {
    console.log('Finished');
    console.log(todo);
  }).catch(function(e) {
    console.log(e);
  })
});
*/

/*
// sequelize 的添加，查找，error的catch。
sequelize.sync({force: true}).then(function() {
  console.log('Everything is synced');
  // add data to database, 以后data 就可以从restful api 进入数据库
  Todo.create({
    description: "I need walking today",
  }).then(function(todo){
    return Todo.create({
      description: 'Clean office'
    })
  }).then(function(){
    // return Todo.findById(1);
    return Todo.findAll({
      where: {
        description: {
          $like: 'I%'
        }
      }
    })
  }
   ).then(function(todo){
    if(todo) {
      todo.forEach(function(e){
        console.log(e.toJSON());
      })
    } else {
      console.log('no todo found!');
    }
  }).catch(function(e) {
    console.log(e);
  })
});
*/
// 关于查找

sequelize.sync().then(function() {
    console.log('everything is synchroize');
    Todo.findById(3).then(function(todo) {
      if(todo) {
        console.log(todo.toJSON);
      } else {
        console.log('Todo not found');
      }

    })
})

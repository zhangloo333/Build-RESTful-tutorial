var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos?completed=false&q=work
app.get('/todos', function(req, res) {

	var query = req.query;
	var where = {};

	if(query.hasOwnProperty('completed') && query.completed === 'true'){
		where.completed = true;
	} else if(query.hasOwnProperty('completed') && query.completed === 'false'){
		where.completed = false;
	}

//是 description 而不是 discription
	if(query.hasOwnProperty('q') && query.q.length > 0) {
		where.description = {
			$like: '%' + query.q + '%'
		};
	}

		db.todo.findAll({where: where}).then(function (todos) {
			res.json(todos);
		}, function (e) {
			res.status(500).send();
		});


	// old 的方法
	// var filteredTodos = todos;
	//
	// if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
	// 	filteredTodos = _.where(filteredTodos, {
	// 		completed: true
	// 	});
	// } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
	// 	filteredTodos = _.where(filteredTodos, {
	// 		completed: false
	// 	});
	// }
	//
	// if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
	// 	filteredTodos = _.filter(filteredTodos, function(todo) {
	// 		return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
	// 	});
	// }
	//
	// res.json(filteredTodos);

});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	/*以前我们使用的_.findwhere找到array里面的数字，
		现在可以sequelize 里面的方法来做database.findById()
	*/

	db.todo.findById(todoId).then(function(todo){
		if(!!todo) {
			res.json(todo.toJSON());// toJSON() 是一个方程，不是一个函数
		} else {
			res.status(404).send();
		}
	},function(e){
		res.status(500).send();
	});

	/* //old code
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
*/

});

// POST /todos
app.post('/todos', function(req, res) {

  // call creat on db.todo
  // responsd with 200 and todo
  var body = _.pick(req.body, 'description', 'completed');

  db.todo.create(body).then(function(todo) {
    res.json(todo.toJSON);
    console.log(todo.toJSON);
  }, function(e) {
    res.status(400).json(e);
  })

	// if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
	// 	return res.status(400).send();
	// }
  //
	// body.description = body.description.trim();
	// body.id = todoNextId++;
  //
	// todos.push(body);
  //
	// res.json(body);



});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
// 当destory完成后返回，返回行数，是0 就说明，没有找到返回，如果不是就说明找到返回。
db.todo.destroy({
	where: {
		id: todoId
	}
}).then(function(rowsDeleted){
	if(rowsDeleted === 0) {
		res.status(404).json({
			error: 'No todo with id'
		});
	} else {
		res.status(204).send();
	}
}, function() {
	res.status(500).send();
})


	// old
	// var matchedTodo = _.findWhere(todos, {
	// 	id: todoId
	// });
	//
	// if (!matchedTodo) {
	// 	res.status(404).json({
	// 		"error": "no todo found with that id"
	// 	});
	// } else {
	// 	todos = _.without(todos, matchedTodo);
	// 	res.json(matchedTodo);
	// }

});

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, 'description', 'completed');
	var attributes = {};

	if(body.hasOwnProperty('description')){
		attributes.description = body.description;
	}
  if(body.hasOwnProperty('completed')) {
		attributes.completed = body.completed;
	}

	db.todo.findById(todoId).then(function(todo){
		if(todo){
			return todo.update(attributes).then(function(todo) {
					res.json(todo.toJSON());
			}, function (e) {
				res.status(400).json(e);
			})
		} else {
			res.status(404).send();
		}
	}, function(){
		res.status(500).send();
	})


	// 老方法来进行 数据的更新
	// var matchedTodo = _.findWhere(todos, {
	// 	id: todoId
	// });
	// var body = _.pick(req.body, 'description', 'completed');
	// var validAttributes = {};
	//
	// if (!matchedTodo) {
	// 	return res.status(404).send();
	// }
	//
	// if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
	// 	validAttributes.completed = body.completed;
	// } else if (body.hasOwnProperty('completed')) {
	// 	return res.status(400).send();
	// }
	//
	// if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
	// 	validAttributes.description = body.description;
	// } else if (body.hasOwnProperty('description')) {
	// 	return res.status(400).send();
	// }
	//
	// _.extend(matchedTodo, validAttributes);
	// res.json(matchedTodo);



});



db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});

// old case
// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//   	console.log('Express listening on port ' + PORT + '!');
//   });
// })

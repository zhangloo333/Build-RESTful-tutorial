var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var dataBase = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
}, {
	id: 3,
	description: 'Feed the cat',
	completed: true
}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// GET /dataBase
app.get('/dataBase', function (req, res) {
	res.json(dataBase);
});

// GET /dataBase/:id 第而部分
app.get('/dataBase/:id', function (req, res) {
	var id = parseInt(req.params.id,10);
	var outstream;

	dataBase.forEach(function (e) {
		if(e.id === id) {
			outstream = e;
		}
	})

	if(outstream){
		res.json(outstream);
	} else {
		res.status(404).send();
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});

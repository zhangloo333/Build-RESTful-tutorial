var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

var dataBase = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: true
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
	/*add the query parameter*/
	var queryParamas = req.query;
	var filterDataBase = []
	var flag = false;

	// GET 添加查询的params http://localhost:8080/dataBase?completed=false
	if(queryParamas.hasOwnProperty('completed') && queryParamas.completed === 'true') {
			dataBase.forEach(function (e) {
					if(e.completed === true){
							filterDataBase.push(e);
						}
		})
			 flag = true;
	} else if(queryParamas.hasOwnProperty('completed') && queryParamas.completed == 'false'){
		dataBase.forEach(function (e) {
				if(e.completed === false){
						filterDataBase.push(e);
					}
	})
		 flag = true;
	}

	//GET 添加符合条件的q的params
	if(queryParamas.hasOwnProperty('q') && queryParamas.q.length > 0) {
		dataBase.forEach(function (e) {
			if(e.description.toLowerCase().indexOf(queryParamas.q.toLowerCase()) > -1){
				filterDataBase.push(e);
			}
		})
		flag = true;
	}



	//输出 符合条件的params
	if(flag){
		res.json(filterDataBase);
	} else {
		res.json(dataBase);
	}
});


// GET /dataBase/:id 第而部分
app.get('/dataBase/:id', function (req, res) {
	//首先把需要的params里面的id找粗来
	var id = parseInt(req.params.id,10);
	var outstream;

	//从数据空里面把需要的id 背后的object分离出来
	dataBase.forEach(function (e) {
		if(e.id === id) {
			outstream = e;
		}
	})

	//找到了就发送除去。
	if(outstream){
		res.json(outstream);
	} else {
		res.status(404).send();
	}
});

// POST 怎么向里面添加内容。
app.post('/dataBase', function (req, res) {
	var body = req.body;

console.log('description' + body.description);
res.json(body);
	// add id field
	body.id = dataBase.length + 1;
	// push body into database
	dataBase.push(body);
	//发送给前面调用你的人。
	res.json(body);
});

// DELET 操作 找到然后删除 优化版本
app.delete('/dataBase/:id', function (req, res) {
	var id = parseInt(req.params.id,10);
	var Findtarget;


 for(var i = 0; i < dataBase.length; i++) {
	 if(dataBase[i].id === id) {
		 Findtarget = dataBase[i];
		 dataBase.splice(i,1);
		 break;
	 }
 }

	if(Findtarget){
		res.json(dataBase);
	} else{
		res.status(404).send();
	}

});

// PUT /dataBase, 如果你上传了一个 value类型的argument
app.put('/dataBase/:id',function (req,res) {
	//首先拿到 input的 内容；
		var body = req.body;
		var vaildAtrribute = {};
		var Findtarget;
	/*更新的步骤，首先要 判断 他是不是有这个属性
			1.如果有这个属性 and  这个属性的类型是正确的 那么我们可以更改，
			2.如果有这个属性，but 这个属性的类型是不正确的， 那么油门输出bad
			3.如果这里面都没有这个属性的话，输出bad request。
	*/

	if(body.hasOwnProperty('completed') && typeof body.completed === "boolean"){
		vaildAtrribute.completed = body.completed;
	} else if(body.hasOwnProperty('completed')) {
		res.send('bad params in the request');
	}

	if(body.hasOwnProperty('description') && typeof body.description === 'string' && body.description.trim().length > 0){
		vaildAtrribute.description = body.description;
	} else if(body.hasOwnProperty('description')) {
			return res.status(400).send();
	}

	//find the object 如果存在的话更新他，如果不存在的话，抛出错误
	var id = parseInt(req.params.id,10);


 for(var i = 0; i < dataBase.length; i++) {
	 if(dataBase[i].id === id) {
		 Findtarget = true;
		 vaildAtrribute.id = id;
		 dataBase[i] = vaildAtrribute;
		 break;
	 }
 }

	if(Findtarget){
		res.json(dataBase);
	} else{
		res.status(404).send();
	}

});

/* query paramer ?之后的都是query paremter  ?key=value
多个query parameter 用 &连接 ？key = value&a=b&completed=true
*/

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});

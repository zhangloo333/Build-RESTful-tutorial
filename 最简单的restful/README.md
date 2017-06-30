# PUT 操作

- client do request
  PUT http://localhost:8080/dataBase/3
  header:Content-Type : application/json
  Body: 需要修改的内容
  ```javascript
  {
  	"description": "this is put request",
  	"completed": false
  }
  ```
- 首先接受request的内容
  id： 首先从string 转换成 integer
  body： req.body 把 需要的body 内容保存起来

```javascript
var body = req.body;
var id = parseInt(req.params.id,10);
var vaildAtrribute = {};
var Findtarget;
```

- 验证： 我们建立一个object来更验证 发送过来的信息是否合法， 如果合法加入这个验证的object
```javascript
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
```
- 在验证合法之后，我们就可以在数据库中查找，
```javascript
for(var i = 0; i < dataBase.length; i++) {
  if(dataBase[i].id === id) {
    Findtarget = true;
    vaildAtrribute.id = id;
    dataBase[i] = vaildAtrribute;
    break;
  }
}
```

- 查找之后到了，替换数据库里面的内容
```javascript
if(Findtarget){
  res.json(dataBase);
} else{
  res.status(404).send();
}
```


```javascript
// PUT /dataBase
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
```

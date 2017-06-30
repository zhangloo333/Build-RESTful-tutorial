# 最简单的restful api

## POST操作
- 首先用post的关键词, 事先定义好的 post的 link http://localhost:8080/dataBase/
 * post keyword
 * head: Content-Type : application/json
 * Body: 传入一个json数据
```javascript
{
	"description": "My First Post",
	"completed": false
}

POST http://localhost:8080/dataBase/
head Content-Type : application/json
Body  {
	"description": "My First Post",
	"completed": false
}
```

- 然后用传入的data 被 req.body 接受
```javascript
var body = req.body;
console.log('description' + body.description);
```
- 然后把receive的数据 req.body 添加一个id属性, 并且查看数据库的长度在加1(用body.id 添加1 来增加current的index)
```javascript
var body = req.body;
body.id = dataBase.length + 1;
```
- 最后把receive 的数据 推入database，然后当更新的元素，
```javascript
// push body into array
dataBase.push(body);
res.json(body);
```
- 然后把res.json(body)把这个给发送除去

```javascript
app.post('/dataBase', function (req, res) {
	var body = req.body;

console.log('description' + body.description);
res.json(body);

	// add id field
	body.id = dataBase.length + 1;

	// push body into array
	dataBase.push(body);

	res.json(body);

});
```

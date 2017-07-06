# GET 添加 query的操作
- 首先在 GET 的 url 里面其实明没有添加什么参数 GET http://localhost:8080/database

```javascript
app.get('/dataBase', function (req, res)
```

- Query这个parameter就保存在 response的query里面 ？之后的都会保存在query paremeter里面 --

query paramer ?之后的都是query paremter  ?key=value
多个query parameter 用 &连接 ？key = value&a=b&completed=true

http://localhost:8080/database?completed=true


- 首先 提取 query 里面的内容 --
  建议一个属于 filter-set，--
  然后建立一个flag，如果有找到符合条件的，就输出filter-set，没有就输出所有的database的元素。


  ```javascript
  var queryParamas = req.query;
  var filterDataBase = []
  var flag = false;
  ```

- 进行query的时候，首先要验证query是否合法，

```javascript
if(queryParamas.hasOwnProperty('completed') && queryParamas.completed === 'true')

```

```javascript
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
```

- 如果合法的条件下，就要循环database里面查找 符合query key === value的元素。如果找到了加入 filter set里面，如果没有找到，就不添加到这个新的set里面

- 然后输出就行了。sd


```javascript
app.get('/dataBase', function (req, res) {
	/*add the query parameter*/
	var queryParamas = req.query;
	var filterDataBase = []
	var flag = false;

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


	if(flag){
		res.json(filterDataBase);
	} else {
		res.json(dataBase);
	}
});
```

# 添加query的优化版本 see server-underscore.js
- 首先通过引用 server-underscore来丰富

```javascript
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
```

- 用到underscore的 _.where(list, properties) --
此函数会自动查找list里面的 有符合条件的函数，然后把他保存在return的list里面
```javascript
_.where(listOfPlays, {author: "Shakespeare", year: 1611});
```
- 用到underscore的 _.filter(list, function) --
遍历这个list然后，如果可以 在function里面符合条件为true返回return array里面
```javascript
if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function (todo) {
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		});
	}
```
- 最后返回这个filter-set
```javascript
app.get('/todos', function (req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		filteredTodos = _.where(filteredTodos, {completed: true});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(filteredTodos, {completed: false});
	}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function (todo) {
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		});
	}

	res.json(filteredTodos);
});
```

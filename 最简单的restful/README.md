# Build-RESTful-tutorial

## 最基本的写法

- REST 基本流程
  * 收到 request
  * server 查询 对应的 function ,then do action
  * req-request, res-response
  * res.send(String: content);
    向client browser 发送回查询的结果

- 我们在browser端 do request http://localhost:3000/
  我们 define domain/啥也没有，我们向前面返回
  ```javascript
  app.get('/', function (req, res) {
  	res.send('Todo API Root');
  });

  ```
  * http://localhost:3000/hello or http://localhost:3000/todos
    server 收到指令，查询相应的function do action
    hello or todos 可以任意定义, 一下结果都是一样的。
    ```javascript
    app.get('/hello', function (req, res) {
    	res.json(todos);
    });

    // GET /todos
    app.get('/todos', function (req, res) {
    	res.json(todos);
    });


    ```

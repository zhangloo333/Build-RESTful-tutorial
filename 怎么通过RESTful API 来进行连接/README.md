# RESTfull + SQL数据库

## 怎么通过网络的接口，把数据从database server 里面读出来。

- create a data folder, with keep file 一面一些系统不支持空的文件夹。
 这个folder是用来储存我们的database的
 - db.js load modules into seuqelize. and return database with server connection.
 - server js do request from database db.js

## 关于db.js

- 首先我们简历一个数据库的模型 在db.js里面，制定保存的位置
    ```javascript
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(undefined, undefined, undefined, {
    	'dialect': 'sqlite',
    	'storage': __dirname + 'data/dev-SQL.sqlite'
    });
    ```
- 然后我们需要create one object for exports
  ```javascript
  var db = {};
  modules.exports = db;
  ```

- 我们需要在我们的db里面， load 所有的 sequelize module
  sequelize.import(address) 这个可以倒入我们不同的models，用来清除我们
  server.js 太多的文件。

 * sequelize是自定义简历的数据通常
 * Sequelize是这个连接数据库的软件。

 ```javascript
 var db = {};

 db.todo = sequelize.import(__dirname + '/models/todo.js');
 db.sequelize = sequelize;
 db.Sequelize = Sequelize;

 modules.exports = db;
 ```

- todo.js 我们用来定义到底我们 data的表单涨什么样子
让我们用sequelize,import的时候，其实我们就已经import了sequelize这个instance， 我们在todo.js 里面用到的 sequelize and DataTypes 就以已经包含了。
- 我们只需要直接的把 定义的表单写下来就可以了

  ```javascript
  module.exports =function(sequelize,DataTypes) {
    return sequelize.define('todo', {
      description:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,250]
        }
      },
      completed:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  };
  ```

- 我们怎么用 post api 来进行数据的传递的。
  * post 有两个主要的， req, res 参数
  * req 里面有主要的body
  * 首先我们向数据库里面添加 这个object，然后我们在发送出去。

如果出现此项错误： 那么可能是 database 的地址有错，不能很好的连接上去
  Unhandled rejection SequelizeConnectionError: SQLITE_CANTOPEN: unable to open database file
      at Database.<anonymous> (/Users/leizha/Desktop/Build-RESTful-tutorial/怎么通过RESTful API 来进行连接/node_modules/sequelize/lib/dialects/sqlite/connection-manager.js:38:59)

```javascript
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
  
```

--------------------------------------------------------------


## 首先添加库文件
- 添加库文件
"sequelize": "^3.5.1",
"sqlite3": "^3.0.10",

- 然后建立一个playgroud的连接mysql的数据库
  * 我们需要调用 sequelize 所有的api
  * 然后我们需要建立一个 sequelized 的 数据center 的模型

  ```javascript
  var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': '/basic-sqlite-database.sqlite'
  });
  ```
首先我们需要告诉 sequelize 我们需要 哪个database dialect = sqlite.
然后我们需要知道 我们把这个database 存在哪里。

- 然后我们需要让数据能够 同步到 我们已有的database的里面。
  sequelizek可以让我们mange data向 javascript objects or array
- sync()方法就是把你的 database 里面的内容sync到里面。
- 这里我们要定义一个 数据的单元 长什么样子；
    ```javascript

    var Todo = sequelize.define('todo', {
      description:{
        type:Sequelize.STRING
      },
      completed:{
        type:Sequelize.BOOLEAN
      }
    });

    ```
- 我们要把 data 存入数据库
  * sequelize.sync().then()
  * .then()的方程里面写入 你要存的 数据
  * Todo.create({数据}) Todo 是数据模型， creat是指令，{}里面是数据元

    ```javascript

    sequelize.sync({force: true}).then(function () {
  	console.log('Everything is synced');

  	Todo.create({
  		description: 'Walking my dog',
  		completed: false
  	}).then(function (todo) {
  		console.log('Finished!');
  		console.log(todo);
  	});
  });

  ```
- force(true) 每次刷新的时候强制 database 把以前的 数据给清洗掉
  create table if they are not exist.
- sqlitebrowser gui的软件，可以试试查询
  * 下载database 软件直接下载。 就行就是一个能看到data 数据的软件。
- 在promise chain 里面可以生成新的promise 来保证这个继续下去。
  then(function(paras))里面的paras 就是上一次promise的return的结果。

- 添加 data单元，用Todo.create({})
- 查找 用单元，DataBase.findById();
- 查找所有符合条件的： DataBase.findAll({
  })
  * DataBase.findAll({
    where: {
      查某个属性：
    }
    })

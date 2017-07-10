# RESTfull + SQL数据库
## 首先添加库文件
- 添加库文件
"sequelize": "^3.5.1"（ 数据库 和 js 之间通信的软件）
 + sequelize可以让我们manage data 通过 javascript objects or array

"sqlite3": "^3.0.10" （一种sql的数据库，类似于mysql）

- 然后建立一个playgroud 的连接mysql的数据库
  * 我们需要调用 sequelize 所有的api
  * 然后我们需要建立一个 sequelized 的 数据center 的模型
    + 数据center 的模型:
      * who 首先我们需要告诉 sequelize 我们需要 哪个database通信 dialect = sqlite.；
      * where 然后我们需要知道 我们把这个database 存在哪里。      
  ```javascript
  var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': '/basic-sqlite-database.sqlite'
  });
  ```

- 这里我们要定义一个 database table 长什么样子；
  + database table name
  + table 的表头 的cell
  + 每个cell的类型

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

- 向database里面添加 数据 tableName.create({数据的object})；
  ```javascript

  Todo.create({
    description: 'Walking my dog',
    completed: false
  })
  ```
- 然后我们需要让数据能够 同步到 我们已有的database的里面。--
  sequelize.sync()方法就是把 新添加的在 sync() 里面的内容，传入database里面
  ```javascript
  sequelize.sync().then(function() {
    console.log('Everything is synced');
  });
  ```
  这是一个promise的object，可以用then接着调用，上一个方程完成之后的结果。--
  then 方程中 function()的参数是上一次promise完成的结果。
  
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

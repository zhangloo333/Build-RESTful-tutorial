# RESTfull + SQL数据库
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
  

## 怎么通过网络的接口，把数据从database server 里面读出来。

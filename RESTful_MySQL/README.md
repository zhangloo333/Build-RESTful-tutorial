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

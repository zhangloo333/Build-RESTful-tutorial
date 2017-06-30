# 最简单的restful api
- 首先你先把express给保存下来
- 然后你要res的内容保存下来，用res.send() 或者是 res.json()给送出去。
- 通过查询某个id，来查找数据库 里面的 的object的内容
  * client request server 通过id
    然后在把id从request里面拉出来；http://localhost:8080/dataBase/1
    http://localhost:8080/dataBase/id
  * 然后在你的数据库里面查询id 相应的object
    + 所有端口后面的 strings 都保存params{}里面。
    + 把string 转换成 integer
    + 遍历找到相应的，保存下来输出
    + res.json()输出
       
    ```javascript
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
    ```
  * 查到之后用json送出去，或者用status(404).send()送出去;

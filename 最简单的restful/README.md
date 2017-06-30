# 最简单的restful api
- 首先你先把express给保存下来

## DELET操作
- Client 发送request请求 DELET http://localhost:8080/dataBase/2
- 首先把 query.params里面的id转换成 integer
- 然后我们从database 里面找到这个 id 对应的object
- 如果找到了，删除，之后在重新发送出去。


```javascript
// DELET 操作
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
```

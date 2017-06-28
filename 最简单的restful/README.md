# 最简单的restful api
- 首先你先把express给保存下来
## GET操作
- 然后你要res的内容保存下来，用res.send() 或者是 res.json()给送出去。
- 找查询某个id的object的内容
  * 然后在把id从request里面拉出来；
  * 然后在你的数据库里面查询id 相应的object
  * 查到之后用json送出去，或者用status(404).send()送出去;

## POST操作
- 首先import body-pase这个npm的包来解析传入的东西；
  * app.use(bodyParser.json()) express能够parse你的body
  然后你就可以从req.body看到你的传入的参数了
- 首先用post的关键词找到database post '/database-Name'
- 然后用req.body来代指整个curret传入的data，
- 然后用body.id 添加1 来增加current的index
- 最后把database-Name 推入当前更新的元素，
- 然后把res.json(body)把这个给发送除去

## DELET操作
- 把传入数据库的标号，找到这个标号对应的object，
- 如果找到了这个标号就把他删除，然后用res.json()给发送回去；
- 如果没有找到这个标号就发送除去，404

## PUT的操作
- 首先都过reqest的id，找到id对应的object；
-

## GET with queryParamas
- query 的 params 都保存在 req.query这个里面
- 我们需要从数据库里面 查找后 返回符合条件的data, 而不是修改我们已有的数据库
- 我们把符合条件的数据，发送到前端，让用户知道。

## GET with queryParams with search.
- 我们在filter 查找符合条件的parameter，如果有q的paramter的的大小写情况下，我们需要把 他们都换成小写，然后在查询

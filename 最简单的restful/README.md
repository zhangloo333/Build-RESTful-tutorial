# 最简单的restful api
- 首先你先把express给保存下来
## GET操作
- 然后你要res的内容保存下来，用res.send() 或者是 res.json()给送出去。
- 找查询某个id的object的内容
  * 然后在把id从request里面拉出来；
  * 然后在你的数据库里面查询id 相应的object
  * 查到之后用json送出去，或者用status(404).send()送出去;

## POST操作
- 首先用post的关键词找到database post '/database-Name'
- 然后用req.body来代指整个curret传入的data，
- 然后用body.id 添加1 来增加current的index
- 最后把database-Name 推入当前更新的元素，
- 然后把res.json(body)把这个给发送除去

# RESTfull + SQL数据库


## host on Horoku
- command heroku addons:create heroku-postgresql:hobby-dev
这个是free的如果是一个付费的情况下，大概一个月，就需要$2000
  * heroku pg:wait等到你的所有database都完成了之后
  * npm install pg@4.4.1 --save
  * npm install pg-hstore@2.3.2 --save

-
* git status
* git commit -am "Add postgrest for production"
* git push
* git push Horoku    

const userApi = require('./userapi');
const uploadfile=require('./uploadapi');
const uploadpath=require('./uploadpath');
const articleApi=require('./articleApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
//引入session
var session = require('express-session');
app.use(session({
  secret: 'minicard',
  resave: false,
  saveUninitialized: true,
  name: 'minicard',
  cookie: { maxAge: userApi.expiretime } //section过期时间 10分钟
}));
//引入cookie
var cookieParser = require("cookie-parser");
//使用bodyparser
app.use(bodyParser.json({limit: '50mb'}));//解决上传大文件报错（413）问题
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



//文件查看
app.use('/uploadfile',uploadpath)
//用户接口
app.use('/api/user', userApi);
//文章接口
app.use('/api/article', articleApi);
//上传接口
app.use('/api/upload',uploadfile)
// 监听端口
app.listen(3000, () => {
  console.log('success listen at port:3000......')
})
//防止异常,node宕机
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


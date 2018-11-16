const userApi = require('./api');
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
app.use(bodyParser.json());
//用户接口
app.use('/api', userApi);
// 监听端口
app.listen(3000, () => {
  console.log('success listen at port:3000......')
})
//防止异常,node宕机
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


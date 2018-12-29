const userApi = require('./Api/userapi');
const articleApi=require('./Api/articleApi');
const linkApi=require('./Api/linkApi');
const pageApi=require('./Api/pageApi');
const uploadfile=require('./uploadapi');
const uploadpath=require('./uploadpath');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var cors = require("cors");
app.use(cors({credentials: true}));
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
//微链接
app.use('/api/link', linkApi);
//微单页
app.use('/api/page', pageApi);
//上传接口
app.use('/api/upload',uploadfile)

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);//需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.listen(3000, () => {  
  console.log('success listen at port:3000......')
})
//防止异常,node宕机
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


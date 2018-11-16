var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('./sqlfun');//sql语句
const {aesEncrypt,aesDecrypt} = require("./crypto");//加载封装加密模块


//配置cookie session 过期时间
var expiretime=60000*10;//过期时间10分钟

//创建连接池
var pool = mysql.createPool(models.mysql)

// 连接数据库
//var conn = mysql.createConnection(models.mysql);
//conn.connect();

//验证登录


//处理数据库连接错误
var handleerror=function(err,res){
    res.json({
        code:0,
        msg:"系统错误。联系开发人员处理tel:18888348998"
    });
    return;
}

// 用户登录接口
router.post('/userlogin', (req, res) => {
    var sql = $sql.user.login;
    var params = req.body;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,[params.username], function(err, result) {
           if (err) {
                res.json({
                    code:0,
                    msg:"操作失败"
                });
            }
            
            if(result.length==0){
                res.json({
                    code:0,
                    msg:"手机号未注册"
                });
            }else{
                var loginpwd=aesEncrypt(params.password);//加密后验证
                if(loginpwd==result[0].password){//验证通过
                    //记录session cookie
                    var loginstate={
                        state:1,
                        user:params.username
                    }
                    res.cookie('loginstate', JSON.stringify(loginstate), { maxAge:expiretime});//cookie过期时间
                    req.session.loginstate = loginstate;
                    res.json({
                        code:100,
                        msg:"登录成功"
                    })
                }else{
                    res.json({
                        code:0,
                        msg:"用户名或密码错误"
                    })
                }       
            }
            conn.release();
        })
    })
});
// 用户注册接口
router.post('/userreg', (req, res) => {
    var yzsql = $sql.user.login;//登录
    var regsql= $sql.user.reg;//注册
    var params = req.body;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(yzsql,[params.username], function(err, result) {
            if (err) {
                res.json({
                    code:0,
                    msg:"操作失败"
                });
            }
            
            if(result.length!=0){//如果库里有此用户
                res.json({
                    code:0,
                    msg:"当前账号已经注册"
                });
            }else{
                var createtime=new Date();
                var handlepwd=aesEncrypt(params.password);
                conn.query(regsql,[params.username,handlepwd,createtime],function(err,result){
                    if (err) {
                        res.json({
                            code:0,
                            msg:"操作失败"
                        });
                    }
                    if(result.length!=0&&result.protocol41){//返回数据不为空
                        res.json({
                            code:100,
                            msg:"注册成功"
                        });
                    }
                    conn.release();
                })
            }
        })
    })
});

// 用户退出登录接口
router.post('/loginout',(req,res) => {
    res.clearCookie('loginstate');//清除客户端cookie
    res.clearCookie('minicard');//清除客户端session写入cookie
    req.session.destroy();      //清除服务端session
    res.json({
        code:"0",
        msg:"退出登录成功"
    })
})

//获取用户登录信息
router.post('/getuseinfo',(req,res) => {
    var sql = $sql.user.userinfo;//获取用户信息
    var params = req.body;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,[params.username], function(err, result) {
                if (err) {
                    res.json({
                        code:0,
                        msg:"请求数据失败"
                    });
                }
                if(result.length!=0){//如果库里有此用户
                    res.json({
                        code:100,
                        userinfo:result[0]
                    });
                }
            conn.release();
        })
    })
})
      








module.exports = router;
module.exports.expiretime = expiretime;
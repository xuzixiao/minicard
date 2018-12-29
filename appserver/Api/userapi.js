var models = require('../database/db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../database/sqlfun');//sql语句
const {aesEncrypt,aesDecrypt} = require("../crypto");//加载封装加密模块


//配置cookie session 过期时间
var expiretime=60000*100;//过期时间100分钟

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

//获取用户信息
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

//保存名片信息
router.post('/savecardinfo',(req,res) =>{

    var sql=$sql.user.savecardinfo;
    var params = req.body;
    // if(req.session.loginstate==null || req.session.loginstate==undefined){
    //     res.json({
    //         code:50,
    //         data:"登录失效"
    //     })
    //     return;
    // }
    //var mobile=req.session.loginstate.user;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,[params.name,params.headimg,params.wechat,params.wxewmimg,params.company,params.branch,params.office,params.dictum,params.address,params.operate,params.mobile], function(err, result) {
                if (err) {
                    res.json({
                        code:0,
                        data:"请求数据失败"
                    });
                }else{
                    res.json({
                        code:100,
                        data:"保存成功"
                    })
                }
            conn.release();
        })
    })
})
//获取用户好友
//当前用户(user)，目标好友用户(frined)
router.post('/makefrineds',(req,res)=>{
    var params=req.body;
    var getuserfrinedssql=$sql.user.getuserFrineds;
    var setuserfrinedssql=$sql.user.setmakeFrineds
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getuserfrinedssql,params.user,function(err,result){
            if (err) {
                    res.json({
                        code:0,
                        data:err
                    });
                }else{
                    if(result[0].frineds!=""&&result[0].frineds!=null&&result[0].frineds.indexOf(params.frined)!=-1){
                        res.json({
                            code:0,
                            data:"已经是好友了,不能重复添加"
                        })
                        return;
                    }
                    var frinedgroup=""
                    if(result[0].frineds==null||result[0].frineds==""){
                        frinedgroup=params.frined
                    }else{
                        frinedgroup=result[0].frineds+"|"+params.frined
                    }
                    conn.query(setuserfrinedssql,[frinedgroup,params.user],function(err,conn){
                        if(err){
                            res.json({
                                code:0,
                                data:err
                            })
                        }else{
                            res.json({
                                code:100,
                                data:"添加好友成功"
                            })
                        }
                    })
                    conn.release();
                }
        })
    })
})
//获取用户的好友
//用户(user)
router.post('/getfrineds',(req,res)=>{
    var params=req.body;
    var getuserfrinedsql=$sql.user.getuserFrineds;
    var getfirnedinfo=$sql.user.userinfo;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getuserfrinedsql,params.user,function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                conn.release();
                var resultdata=result[0].frineds.split("|");
                var frinedlist=[];
                (function getfrinedlist(n){
                    if(n>=resultdata.length){
                        res.json({
                            code:100,
                            data:frinedlist
                        })
                        return;
                    }
                    pool.getConnection(function(err,conn){
                        conn.query(getfirnedinfo,resultdata[n],function(err,result){
                            if(err){
                                res.json({
                                    code:0,
                                    data:err
                                })
                            }else{
                                frinedlist.push(result[0]);
                                n++;
                                getfrinedlist(n);
                            }
                            conn.release();
                        })
                    })
                })(0)
            }
        })
    })
})





module.exports = router;
module.exports.expiretime = expiretime;
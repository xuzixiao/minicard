var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('./sqlfun');//sql语句

var pool = mysql.createPool(models.mysql);


//处理数据库连接错误
var handleerror=function(err,res){
    res.json({
        code:0,
        msg:"系统错误。联系开发人员处理tel:18888348998"
    });
    return;
}

//添加微链接 
//参数：user,linkname,linkurl
router.post('/setlink',(req,res) =>{
    var sql = $sql.link.setlink;
    var params = req.body;
    var createtime=new Date();
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,[params.user,params.linkname,params.linkurl,createtime], function(err, result) {
            if(err){
                res.json({
                    code:0,
                    data:"请求数据失败"
                })
            }else{
                res.json({
                    code:100,
                    data:"添加成功"
                })
            }
            conn.release();//为避免线程池溢出 需要关闭
        })
    })
})
//获取微链接
router.post("/getlink",(req,res)=>{
    var sql=$sql.link.getlink;
    var params=req.body;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,params.user,function(err, result) {
            if(err){
                res.json({
                    code:0,
                    data:"请求数据失败"
                })
            }else{
                res.json({
                    code:100,
                    data:result
                })
            }
            conn.release();//为避免线程池溢出 需要关闭
        })
    })
})
//修改微链接
//id,
router.post("/updatelink",(req,res)=>{
    var sql=$sql.link.updatelink;
    var params=req.body;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,[params.linkname,params.linkurl,params.Id],function(err, result) {
            if(err){
                res.json({
                    code:0,
                    data:"请求数据失败"
                })
            }else{
                res.json({
                    code:100,
                    data:"修改成功"
                })
            }
            conn.release();//为避免线程池溢出 需要关闭
        })
    })
})
//删除微链接
//链接Id
router.post("/dellink",(req,res)=>{
    var sql=$sql.link.dellink;
    var params=req.body;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,params.Id,function(err, result) {
            if(err){
                res.json({
                    code:0,
                    data:"请求数据失败"
                })
            }else{
                res.json({
                    code:100,
                    data:"删除成功"
                })
            }
            conn.release();//为避免线程池溢出 需要关闭
        })
    })
})





module.exports = router;

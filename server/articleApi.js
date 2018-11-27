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

//获取用户文章分类 
router.post('/getcategory',(req,res) =>{
    var sql = $sql.user.getcategory;
    var params = req.body;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,[params.username], function(err, result) {
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


//添加用户文章分类
router.post('/setcategory',(req,res) =>{
    var params = req.body;
    var nowdate=new Date();
//------查询用户有没有此分类
    var querysql=$sql.user.querycatename;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(querysql,[params.userid,params.categoryname], function(err, result) {
            if(err){
                res.json({
                    code:0,
                    data:"失败"
                })
            }else{
                if(!result.length==0){
                    //如果有此分类
                    res.json({
                        code:0,
                        data:"当前分类已经存在"
                    })
                }else{
                    //------执行添加操作
                    var sql = $sql.user.setcategory;
                    pool.getConnection(function(err,conn){
                        err?handleerror(err,res):
                        conn.query(sql,[params.categoryname,params.userid,nowdate], function(err, result) {
                            if(err){
                                res.json({
                                    code:0,
                                    data:"失败"
                                })
                            }else{
                                res.json({
                                    code:100,
                                    data:result
                                })
                            }
                        })
                    })
                }
                conn.release();
            }
        })
    })
})

//保存文章
router.post("/savearticle",function(req,res){
    var saveartsql=$sql.article.save;
    var user=req.body.user;
    var artbanner=req.body.artbanner;
    var artcategoryid=req.body.artcategoryid;
    var arttitle=req.body.arttitle;
    var tuijian=req.body.tuijian;
    var artcon=req.body.artcon;
    var createtime=new Date();
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(saveartsql,[user,artbanner,artcategoryid,arttitle,tuijian,artcon,createtime],function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
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

//获取文章列表
router.post("/getartlist",function(req,res){
    var getartlistsql=$sql.article.getartlist;
    var categoryid=req.body.categoryid;
    var user=req.body.user;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getartlistsql,[user,categoryid],function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                res.json({
                    code:100,
                    data:result
                })
            }
            conn.release();
        })
    })
})

//获取文章内容
//返回指定文章内容以及文章作者信息
router.post("/getarticle",function(req,res){
    var sql=$sql.article.getarticle;
    var Id=req.body.Id;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(sql,Id,function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
             var resdata=result[0];
             var getuserinforsql=$sql.user.userinfo;
             conn.query(getuserinforsql,resdata.user,function(err,result){
                if(err){
                    res.json({
                        code:0,
                        data:err
                    })
                }else{
                    var data={article:resdata,userinfo:result[0]};
                    res.json({
                        code:100,
                        data:data
                    })
                }
             })
            }
            conn.release();
        })
    })
})







module.exports = router;

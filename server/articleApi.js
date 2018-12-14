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
//删除文章分类

router.post("/deletecate",function(req,res){
    var categoryid=req.body.categoryid;
    var user=req.body.user;
    var testsql=$sql.article.artlist;
    var delcate=$sql.article.delcategory;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(testsql,categoryid,function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                conn.release();
                if(result.length==0){
                    pool.getConnection(function(err,conn){
                        err?handleerror(err,res):
                        conn.query(delcate,[categoryid,user],function(err,result){
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
                }else{
                    res.json({
                        code:0,
                        data:"当前分类内有文章,不能删除分类。"
                    })
                }
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
//修改文章
router.post("/updatearticle",function(req,res){
    var updateartsql=$sql.article.updatearticle;
    var id=req.body.articleid;
    var artbanner=req.body.artbanner;
    var artcategoryid=req.body.artcategoryid;
    var arttitle=req.body.arttitle;
    var tuijian=req.body.tuijian;
    var artcon=req.body.artcon;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(updateartsql,[artbanner,artcategoryid,arttitle,tuijian,artcon,id],function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                res.json({
                    code:100,
                    data:"修改成功"
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
//根据分类Id获取文章列表
//获取文章列表
router.post("/artlist",function(req,res){
    var getartlistsql=$sql.article.artlist;
    var categoryid=req.body.categoryid;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getartlistsql,[categoryid],function(err,result){
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

//获取文章内容 展示用
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
             if(resdata==undefined){
                 res.json({
                     code:0,
                     data:"文章不存在"
                 })
                 return;
             }
             var readtime=result[0].browse+1;//阅读次数
             var browsesql=$sql.article.readtime;
             conn.query(browsesql,[readtime,Id],function(err,result){
                 if(err){
                     res.json({
                         code:0,
                         data:err
                     })
                 }else{
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
                        conn.release();
                    })
                 }
            })             
            }
        })
    })
})

//修改文章-获取文章内容
router.post("/getupdateartcon",function(req,res){
    let user=req.body.user;
    let artid=req.body.Id;
    let getartofupdate=$sql.article.getartofupdate;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getartofupdate,[user,artid],function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                res.json({
                    code:100,
                    data:result[0]
                })
            }
            conn.release();
        })
    })
})

//修改成我的文章-获取文章内容
router.post("/getupdatearticle",function(req,res){
    let artid=req.body.Id;
    let getartofupdate=$sql.article.getarticle;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getartofupdate,artid,function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                res.json({
                    code:100,
                    data:result[0]
                })
            }
            conn.release();
        })
    })
})

//收藏文章
router.post("/collectart",function(req,res){
    var getcollsql=$sql.article.getcollart;//获取收藏的文章(user)
    var setcollsql=$sql.article.collart;//收藏的文章(user,articleid)
    var user=req.body.user;
    var artid=req.body.artid;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getcollsql,user,function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                var collarticle=result[0].collarticle;
                if(collarticle!=null&&collarticle!=""&&collarticle.indexOf(artid)!=-1){
                    res.json({
                        code:0,
                        data:"已经收藏"
                    })
                    return;
                }
                if(collarticle==""||collarticle==null||collarticle==undefined){
                    collarticle=artid;
                }else{
                    collarticle=collarticle+"|"+artid;
                }
                conn.release();
                pool.getConnection(function(err,conn){
                    err?handleerror(err,res):
                    conn.query(setcollsql,[collarticle,user],function(err,result){
                        if(err){
                            res.json({
                                code:0,
                                data:err
                            })
                        }else{
                            res.json({
                                code:100,
                                data:"收藏成功"
                            })
                        }
                        conn.release();
                    })
                })
            }
        })
    })
})
//获取收藏
router.post("/getcollect",function(req,res){
    var user=req.body.user;
    var getcollart=$sql.article.getcollart;
    var getarticle=$sql.article.getarticle;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getcollart,user,function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                var collarticle=result[0].collarticle.split("|")
                conn.release();
                var artgroup=[];
                (function getartmain(n){
                    if(n>collarticle.length-1){
                        res.json({
                            code:100,
                            data:artgroup
                        })
                        return;
                    }
                    pool.getConnection(function(err,conn){
                        err?handleerror(err,res):
                        conn.query(getarticle,collarticle[n],function(err,result){
                            if(err){
                                res.json({
                                    code:0,
                                    data:err
                                })
                            }else{
                                artgroup.push(result[0]);
                            }
                            conn.release();
                            n++;
                            getartmain(n)
                        })
                    })
                })(0)
            }
        })
    })
})
//删除文章
//user,artid
router.post("/delarticle",function(req,res){
    let user=req.body.user;
    let artid=req.body.artid;
    //判断删除权限
    let testsql=$sql.article.getarticle;
    let delectsql=$sql.article.delectsql;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(testsql,artid,function(err,result){
            if(err){
                res.json({
                    code:0,
                    data:err
                })
            }else{
                conn.release();
                if(result[0].user!=user){
                    res.json({
                        code:0,
                        data:"您无权限删除此文章"
                    })
                }else{
                    pool.getConnection(function(err,conn){
                        err?handleerror(err,res):
                        conn.query(delectsql,[user,artid],function(err,result){
                            if(err){
                                res.json({
                                    code:0,
                                    data:err
                                })
                            }else{
                                res.json({
                                    code:100,
                                    data:"删除成功"
                                })
                            }
                            conn.release();
                        })
                    })
                }
            }
        })
    })
})




module.exports = router;

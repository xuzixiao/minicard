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

//获取单页信息 
router.post("/getpageinfo",function(req,res){
    var userinfosql=$sql.user.userinfo;//用户信息
    var userartlist=$sql.user.getcategory;//文章分类
    var getuserlink=$sql.link.getlink;//获取用户链接
    var getartcommend=$sql.article.getartcommend;//获取文章推荐
    var user=req.body.user;//用户名
    var sqlgroup=[userinfosql,userartlist,getuserlink,getartcommend];
    pool.getConnection(function(err,conn){
        if(err){
            handleerror(err,res)
        }else{
            var returndata={};
            (function getdata(n){
                conn.query(sqlgroup[n],user,function(err,result){
                    if(n<sqlgroup.length){   
                        if(n==0){
                            if(result==undefined||result==null||result==""||result.length==0){
                                result=[];
                            }
                            returndata.userinfo=result;
                        }else if(n==1){
                            if(result==undefined||result==null||result==""||result.length==0){
                                result=[];
                            }    
                            returndata.userart=result;
                        }else if(n==2){
                            if(result==undefined||result==null||result==""||result.length==0){
                                result=[];
                            }
                            returndata.userlink=result;
                        }else if(n==3){
                            if(result==undefined||result==null||result==""||result.length==0){
                                result=[];
                            }
                            returndata.artcommend=result;
                        }
                        n++;
                        getdata(n);
                    }else{
                        res.json({
                            code:100,
                            data:returndata
                        })
                        conn.release();
                    }
                })
            })(0)
        }
    })
})







module.exports = router;

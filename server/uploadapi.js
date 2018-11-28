var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var $sql = require('./sqlfun');//sql语句

//上传文件 根目录
var filepathdir = path.join(__dirname, 'uploadfile/');
var linkpath="/uploadfile/";
//头像存放文件
var userimgpath="userfile/";
var articlepath="articleimg/";
var videopath="videos/";


//创建连接池
var pool = mysql.createPool(models.mysql)

//处理数据库连接错误
var handleerror=function(err,res){
    res.json({
        code:0,
        msg:"系统错误。联系开发人员处理tel:18888348998"
    });
    return;
}

router.get("/",(req,res)=>{
    res.header("Content-Type", "application/json;charset=utf-8");  
    res.end("上传接口");
})



//上传头像
router.post("/headimg", (req, res) => {
    //获取上传图片数据
    var params = req.body;
    var image = params.image;
    var base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    var filetype=image.split("/")[1].split(";")[0];//文件类型
    var dataBuffer = new Buffer(base64Data, 'base64');
    if (req.session.loginstate == null || req.session.loginstate == undefined) {
        res.json({
            code: 50,
            data: "登录失效"
        })
        return;
    }
    var user=req.session.loginstate.user;
    var fillname =user+"headimg."+filetype;
    var savepath=filepathdir+userimgpath+fillname;
    var returnpath=linkpath+userimgpath+fillname;
    fs.writeFile(savepath, dataBuffer, function (err) {
        if (err) {
            res.json({
                code: 0,
                data: err
            })
        } else {
            res.json({
                code: 100,
                data: returnpath
            })
        }
    })
})


//上传微信二维码图片
router.post("/ewm", (req, res) => {
    //获取上传图片数据
    var params = req.body;
    var image = params.image;
    var base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    var filetype=image.split("/")[1].split(";")[0];//文件类型
    var dataBuffer = new Buffer(base64Data, 'base64');
    if (req.session.loginstate == null || req.session.loginstate == undefined) {
        res.json({
            code: 50,
            data: "登录失效"
        })
        return;
    }
    var user=req.session.loginstate.user;
    var fillname =user+"ewm."+filetype;
    var savepath=filepathdir+userimgpath+fillname;
    var returnpath=linkpath+userimgpath+fillname;
    fs.writeFile(savepath, dataBuffer, function (err) {
        if (err) {
            res.json({
                code: 0,
                data: err
            })
        } else {
            res.json({
                code: 100,
                data: returnpath
            })
        }
    })
})






//文章图片上传接口,
router.post("/articleimg", (req, res) => {
    var params = req.body;
    var addimgsql=$sql.user.addartimgs;
    //判读服务器登录状态
    if (req.session.loginstate == null || req.session.loginstate == undefined) {
        res.json({
            code: 50,
            data: "登录失效"
        })
        return;
    }
    var user=req.session.loginstate.user;
    if(params.length>=2){//多张上传 遇到问题:图片能正常上传, 上传数据库是多张相同的图片
        var uploadimggroup=[];
        var uploadimgerror={}; 
        for(let i=0;i<params.length;i++){
            var filetype=params[i].content.split("/")[1].split(";")[0];//文件类型
            var base64Data = params[i].content.replace(/^data:image\/\w+;base64,/, "");//文件转为base64
            var dataBuffer = new Buffer(base64Data, 'base64');//文件转为buffer
            var filename=new Date().getTime().toString()+i+"."+filetype;//文件名称
            var savepath=filepathdir+articlepath+filename;//文件存储路径
            var imagepath=linkpath+articlepath+filename;  //文件访问路径
            fs.writeFile(savepath, dataBuffer, function (err) {
                if (err) {
                    res.json({
                        code: 0,
                        data: err
                    })
                } else {
                    var nowdate=new Date();        
                    pool.getConnection(function(err,conn){
                        err?handleerror(err,res):
                        conn.query(addimgsql,[user,imagepath,nowdate], function(err, result) {
                            if(err){
                                uploadimgerror.error=true;
                                uploadimgerror.errorindex+=i+",";
                            }else{
                                uploadimggroup.push(imagepath)
                            }
                            conn.release();
                        })
                    })
                }
            })
        }
        if(uploadimgerror.error){//若上传错误
            res.json({
                code:0,
                data:"上传错误:"+uploadimgerror.errorindex
            })
        }else{//若无错误返回上传的图片路径数组
            res.json({
                code:100,
                data:uploadimggroup
            })
        }
    } else {//单张上传
        var filetype=params.content.split("/")[1].split(";")[0];//文件类型
        var base64Data = params.content.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var filename=new Date().getTime()+"."+filetype;//文件名称
        var savepath=filepathdir+articlepath+filename;//文件存储路径
        var imagepath=linkpath+articlepath+filename;  //文件访问路径
        fs.writeFile(savepath,dataBuffer, function (err) {
            if (err) {
                res.json({
                    code: 0,
                    data: "上传图片失败"
                })
            } else {
                var nowdate=new Date();    
                pool.getConnection(function(err,conn){
                    err?handleerror(err,res):
                    conn.query(addimgsql,[user,imagepath,nowdate], function(err, result) {
                        if(err){
                            res.json({
                                code:0,
                                data:err
                            })
                        }else{
                            res.json({
                                code:100,
                                data:imagepath
                            })
                        }
                        conn.release();
                    })
                })
            }
        })
    }
})

//查询当前用户下图片
router.post("/getimagegroup",function(req,res){
    var getimagesql=$sql.user.getimagesql;
    var user=req.body.user;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getimagesql,user, function(err, result) {
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
        })
        conn.release()
    })
})

//上传视频
router.post("/video",function(req,res){
    var params = req.body;
    var addvideosql=$sql.user.addvideosql;
    //判读服务器登录状态
    if (req.session.loginstate == null || req.session.loginstate == undefined) {
        res.json({
            code: 50,
            data: "登录失效"
        })
        return;
    }
    var user=req.session.loginstate.user;
    var filetype=params.content.split("/")[1].split(";")[0];//文件类型
    var base64Data = params.content.replace(/^data:video\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var filename=new Date().getTime()+"."+filetype;//文件名称
    var savepath=filepathdir+videopath+filename;//文件存储路径
    var imagepath=linkpath+videopath+filename;  //文件访问路径
    fs.writeFile(savepath,dataBuffer, function (err) {
        if (err) {
            res.json({
                code: 0,
                data: "上传视频失败"
            })
        } else {
            var nowdate=new Date();
            pool.getConnection(function(err,conn){
                err?handleerror(err,res):
                conn.query(addvideosql,[user,imagepath,nowdate], function(err, result) {
                    if(err){
                        res.json({
                            code: 0,
                            data:err,
                        })
                    }else{
                        res.json({
                            code:100,
                            data:imagepath
                        })
                    }
                })
            })
        }
    })
})


//获取用户的视频
router.post("/getvideogroup",function(req,res){
    var getvideosql=$sql.user.getvideosql;
    var user=req.body.user;
    pool.getConnection(function(err,conn){
        err?handleerror(err,res):
        conn.query(getvideosql,user, function(err, result) {
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
        })
        conn.release()
    })
})






module.exports = router;



var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var $sql = require('./sqlfun');//sql语句

//上传文件 根目录
var fillpath = path.join(__dirname, 'uploadfile/');
//用户头像目录
var headimgpath = path.join(__dirname, 'uploadfile/headimg/');
//用户文章图片上传目录
var articleimg= path.join(__dirname, 'uploadfile/articleimg/');


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






router.post("/", (req, res) => {
    //获取上传图片数据
    var params = req.body;
    var image = params.image;
    var base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    if (req.session.loginstate == null || req.session.loginstate == undefined) {
        res.json({
            code: 50,
            data: "登录失效"
        })
        return;
    }
    //文件命名
    var randnum = Date.parse(new Date);//用户手机+时间戳+hd.jpg
    var fillname = req.session.loginstate.user + randnum + "hd.jpg";
    fs.writeFile(headimgpath + fillname, dataBuffer, function (err) {
        if (err) {
            res.json({
                code: 0,
                data: "上传图片失败"
            })
        } else {
            res.json({
                code: 100,
                data: "/uploadfile/headimg/" + fillname
            })
        }
    })
})

//文章图片上传接口,
router.post("/articleimg", (req, res) => {
    var params = req.body;
    var filename="article";
    //判读服务器登录状态
    if (req.session.loginstate == null || req.session.loginstate == undefined) {
        res.json({
            code: 50,
            data: "登录失效"
        })
        return;
    }
    if(params.length>=2){//多张上传

        
       

    } else {//单张上传
        var filetype=params.content.split("/")[1].split(";")[0];//文件类型
        var base64Data = params.content.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        filename+=new Date().getTime();
        filename+="."+filetype;
        fs.writeFile(articleimg + filename, dataBuffer, function (err) {
            if (err) {
                res.json({
                    code: 0,
                    data: "上传图片失败"
                })
            } else {
                var addimgsql=$sql.user.addartimgs;
                var nowdate=new Date();
                var user=req.session.loginstate.user;
                var imagepath="/uploadfile/articleimg/"+filename;            
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




module.exports = router;



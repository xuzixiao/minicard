var express = require('express');
var router = express.Router();
var fs = require('fs');
var path= require('path');
var url= require('url');

//上传文件浏览


var routerpath="/uploadfile"

router.all("*",(req,res) => {
    //获取根目录地址
    var workdir = path.resolve(".");
    //获取url path
    var urlpath = req.path;
    //组合本地文件路径
    var filepath=path.join(workdir,routerpath,urlpath);
    fs.stat(filepath,function(err,stats){
        if(err){
            res.end(err);
        }else if(stats.isFile()){
             fs.createReadStream(filepath).pipe(res);
        }
    })
})




module.exports = router;




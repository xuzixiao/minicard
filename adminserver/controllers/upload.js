const model=require('../config/mysql');
const jwtfun=require('../untils/methods');
const fs=require('fs');
const path=require('path');
//上传接口
//参数file：{
//      file:(base文件),
//      name:(文件名)            
//}

//存储文件目录
var Filepath=path.join(path.resolve("."),"/public/uploads/");
var Linkpaht="/public/uploads/";

var upload= async (ctx, next) => {
    //验证token
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    //判断参数
    var params=ctx.request.body;
    if(params.file==""){
        ctx.response.body={
            code:0,
            msg:"参数错误,请检测参数是否完整"
        }
        return;
    }
    //获取的file
    let basefile=ctx.request.body.file.file;
    //文件转为base64
    var base64Data = basefile.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');//文件转为buffer
    //文件类型
    var filetype=basefile.split("/")[1].split(";")[0];
    //文件名称
    let filename=new Date().getTime().toString().slice(8,13)+Math.floor(Math.random()*1000)+"."+filetype;
    //文件存储路径
    let savepath=Filepath+filename;
    //文件访问路径
    let imgpath=Linkpaht+filename;
    let err;
    await fs.writeFile(savepath,dataBuffer,function(err){
        err=err;
    })
    if(err){
        ctx.response.body={
            code:0,
            msg:"上传错误"
        }
    }else{
        ctx.response.body={
            code:100,
            data:{
                path:imgpath
            }
        } 
    }
} 



module.exports = {
    'POST /upload': upload
};
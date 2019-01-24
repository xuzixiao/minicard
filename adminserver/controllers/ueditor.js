const model=require('../config/mysql');
const jwtfun=require('../untils/methods');
const crypto=require('../untils/crypto');
const superagent=require('superagent');//抓取网页
const cheerio=require('cheerio');//分析网页
const ueditor = require('ueditor');
let path=require('path');
let fs=require('fs');


var ueditorfun=(ueditor(path.join(__dirname, 'public')), async(ctx,next)=>{ 
    const ActionType = ctx.request.query.action;
    const CallBack= ctx.request.query.callback;
    let result = ''
    var file_url = '/public/images/ueditor/';
    switch (ActionType) {
        case 'config':
            ctx.response.type = 'application/json';
            await fs.readFile("./public/ueditor/nodejs/config.json",(err,data)=>{
                if(err){console.log(`err:${err}`)};
                result = data;
            })
            break
        default:
            ctx.response.type = 'application/json';
            await fs.readFile("./public/ueditor/nodejs/config.json",(err,data)=>{
                result = data;
            })
            break
        case 'uploadimage':
            result = await new Upload().upload(req, res, next, 1)
            result = {
                "state": "SUCCESS",
                "url": result.data.file,
                "title": result.data.name,
                "original": result.data.name
            }
            ctx.response.type = 'text/html';
            break
        case 'uploadfile':
            result = {
                "state": "SUCCESS",
                "url": result.data.file,
                "title": result.data.name,
                "original": result.data.name
            }
            ctx.response.type = 'text/html';
            break
        case 'uploadvideo':
            console.log('uploadvideo start')
            break
    }
    ctx.response.body=result;
})

module.exports={
    'GET /ueditor':ueditorfun
}
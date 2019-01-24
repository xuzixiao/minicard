const model=require('../config/mysql');
const jwtfun=require('../untils/methods');
const crypto=require('../untils/crypto');
const superagent=require('superagent');//抓取网页
const cheerio=require('cheerio');//分析网页


var extract= async(ctx,next)=>{ 
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
   let url=ctx.request.body.url;
   if(url==""||url==null){
        ctx.response.body={
            code:0,
            msg:"参数错误,请检测参数是否完整"
        }
        return;
    }
    const data=await getdata(url);
    console.log(data);
    ctx.response.body={
        code:100,
        data:data
    }
}

var getdata=async(url)=>{
    return new Promise((resolve,reject)=>{
        superagent.get(url).end((err,sres)=>{
            if(err){
                reject(err);
                console.log(err);
            }else{
                resolve(sres);
            }
        })
    })
}

module.exports={
    'POST /extract':extract,
}
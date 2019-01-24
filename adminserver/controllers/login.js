const usermodel=require('../config/mysql');
const jwtfun=require('../untils/methods');
const crypto=require('../untils/crypto');

var login= async(ctx,next)=>{ 
    let queryresult;
    //获取登录信息
    await usermodel.loginxcheck(ctx.request.body.username).then(res=>{
        queryresult=res;
    })
    //登录验证
    if(queryresult.length==0){
        ctx.response.body={
            code:0,
            data:{
                user:ctx.request.body.username
            },
            msg:"当前用户未注册"
        }
    }else if(queryresult[0].password==crypto.aesEncrypt(ctx.request.body.password)){
        //判断有没有权限登录
        if(queryresult[0].state==0){
            ctx.response.body={
                code:0,
                data:{
                    user:ctx.request.body.username
                },
                msg:"当前账号无权限登录"
            }
            return;
        }
        //updatetoken
        var tokenobj={
            username:ctx.request.body.username
        }
        let token=jwtfun.generateToken(tokenobj);
        await usermodel.updatetoken(token,ctx.request.body.username).then(res=>{
            ctx.response.body={
                code:100,
                data:{
                    user:ctx.request.body.username,
                    token:token
                },
                msg:"登录成功"
            }
        })        
    }else if(queryresult[0].password!=crypto.aesEncrypt(ctx.request.body.password)){
        ctx.response.body={
            code:0,
            data:{
                user:ctx.request.body.username
            },
            msg:"密码错误"
        }
    }
}

module.exports={
    'POST /login':login,
}
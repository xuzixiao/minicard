const usermodel=require('../config/mysql');
const jwtfun=require('../untils/methods');


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
    }else if(queryresult[0].password==ctx.request.body.password){
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
    }else if(queryresult[0].password!=ctx.request.body.password){
        ctx.response.body={
            code:0,
            data:{
                user:ctx.request.body.username
            },
            msg:"密码错误"
        }
    }
}

var Glogin= async(ctx,next)=>{
    ctx.response.body="sdfd";
}

module.exports={
    'POST /login':login,
}
const usermodel=require('../config/mysql');
const jwtfun=require('../untils/methods');

var userlist=async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    await usermodel.getuserinfo().then((res)=>{
        ctx.response.body={
            code:100,
            data:res,
            msg:"获取列表成功"
        }
    }).catch((error)=>{
        ctx.response.body={
            code:0,
            data:error
        }
    })
}

var getuserinfo=async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    let params=ctx.request.body
    if(params.userid==null||params.userid==""){
        ctx.response.body={
            code:0,
            msg:"参数错误"
        }
        return;
    }
    await usermodel.getuserinfobyid(params.userid).then((res)=>{
            ctx.response.body={
                code:100,
                data:res
            }

    }).catch((err)=>{
            ctx.response.body={
                code:0,
                data:err
            }
    })
}

var changeuserstatus=async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    let user=ctx.request.body.user;
    let status=ctx.request.body.status+"";
    if(user==""||status==""||user==undefined||status==undefined){
        ctx.response.body={
            code:0,
            msg:"参数异常" 
        }
        return;
    }
    await usermodel.changeuserstatus(status,user).then((res)=>{
        ctx.response.body={
            code:100,
            data:res
        }
    }).catch((err)=>{
        ctx.response.body={
            code:0,
            data:err
        }
    })
}


module.exports = {
    'POST /userlist': userlist,
    'POST /getuserinfo':getuserinfo,
    'POST /changeuserstatus':changeuserstatus
};
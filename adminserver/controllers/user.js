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



module.exports = {
    'POST /userlist': userlist,
};
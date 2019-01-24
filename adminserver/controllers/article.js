const model=require('../config/mysql');
const jwtfun=require('../untils/methods');

//获取文章列表
var articlelist=async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    await model.articlelist().then((res)=>{
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
//获取文章详情信息
var getarticleinfo=async(ctx,next)=>{
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
    await model.getuserinfobyid(params.userid).then((res)=>{
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
// 文章状态管理
var changearticlestatus=async(ctx,next)=>{
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
    await model.changeuserstatus(status,user).then((res)=>{
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
//获取单篇文章详情
var getacticlebyid=async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    var params=ctx.request.body;
    if(params.id==""||params.id==undefined){
        ctx.response.body={
            code:0,
            msg:"参数异常" 
        }
        return;
    }

    await model.articledetail(params.id).then((res)=>{
        ctx.response.body={
            code:100,
            data:res
        }
    },(err)=>{
        ctx.response.body={
            code:0,
            data:err
        }
    })
} 
//更改文章状态
//id==文章id
//state==目标状态
var updateartstatus=async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    var params=ctx.request.body;
    if(params.state+""==""||params.state+""==undefined||params.id==""||params.id==undefined){
        ctx.response.body={
            code:0,
            msg:"参数异常" 
        }
        return;
    }

    await model.articlestatus(params.state,params.id).then((res)=>{
        ctx.response.body={
            code:100,
            data:res
        }
    },(err)=>{
        ctx.response.body={
            code:0,
            data:err
        }
    }) 
}
//---------------------公司文章接口----------------
//保存文章
var savecompanyarticle=async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    var params=ctx.request.body;

    var createtime=new Date();
    await model.savecompanyart(params.title,params.artlogo,params.content,createtime).then((res)=>{
        ctx.response.body={
            code:100,
            data:"保存成功"
        }
    }),(err)=>{
        ctx.response.body={
            code:0,
            data:err
        }
    }
}
//获取公司文章列表
var getcompanyarticle=async(ctx,next)=>{
    await model.getcompanyartlist().then((res)=>{
        ctx.response.body={
            code:100,
            data:res 
        }
    }).catch(err=>{
        ctx.response.body={
            code:0,
            data:err 
        }
    })
}
//获取公司文章内容
var getcompanyarticlecontent=async(ctx,next)=>{
    let id=ctx.request.body.Id;
    if(id==""||id==null){
        ctx.response.body={
            code:0,
            data:"参数有误" 
        }
        return;
    }
    await model.getcompanyartcomtent(id).then((res)=>{
        ctx.response.body={
            code:100,
            data:res 
        }
    }).catch(err=>{
        ctx.response.body={
            code:0,
            data:err 
        }
    })
}




module.exports = {
    'POST /articlelist': articlelist,
    'POST /getarticleinfo':getarticleinfo,
    'POST /changearticlestatus':changearticlestatus,
    'POST /getacticle':getacticlebyid,
    'POST /updateartstatus':updateartstatus,
    //公司文章接口
    'POST /savecompanyarticle':savecompanyarticle,
    'POST /getcompanyarticle':getcompanyarticle,
    'POST /getcompanyarticlecontent':getcompanyarticlecontent
};
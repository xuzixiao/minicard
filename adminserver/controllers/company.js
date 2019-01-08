const companymodel=require('../config/mysql');
const jwtfun=require('../untils/methods');

var fn_addcompany= async (ctx, next) => {
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
    let state=params.state?1:0;
    let exptime=params.exptime;
    if(params.name==""||params.desc==""||exptime==""||params.exptype==""){
        ctx.response.body={
            code:20,
            data:"参数不完整"
        }
        return;
    }
    //过期时间
    var expiration_date,
        nowdate=new Date();
    if(params.exptype=="y"){
        let year=nowdate.getFullYear()+exptime;
        let mouth=nowdate.getMonth()+1;
        let date=nowdate.getDate();
        let hours=nowdate.getHours();
        let Minute=nowdate.getMinutes();
        let second=nowdate.getSeconds();
        expiration_date=year+"-"+mouth+"-"+date+" "+hours+":"+Minute+":"+second;
    }else if(params.exptype=="m"){
        let year=nowdate.getFullYear();
        let mouth=nowdate.getMonth()+1+exptime;
        if(mouth>12){
            year+=1
            mouth=mouth-12
        } 
        let date=nowdate.getDate();
        let hours=nowdate.getHours();
        let Minute=nowdate.getMinutes();
        let second=nowdate.getSeconds();
        expiration_date=year+"-"+mouth+"-"+date+" "+hours+":"+Minute+":"+second;
    }else if(params.exptype=="d"){
        let time=nowdate.getTime()+(24*60*60*1000)*exptime;
        let year=new Date(time).getFullYear();
        let mouth=new Date(time).getMonth()+1;
        let date=new Date(time).getDate();
        let hours=new Date(time).getHours();
        let Minute=nowdate.getMinutes();
        let second=new Date(time).getSeconds();
        expiration_date=year+"-"+mouth+"-"+date+" "+hours+":"+Minute+":"+second;
    }
    //公司编号
    let companyno=Math.floor(Math.random()*100000000)+Math.floor(Math.random()*10000);
    companyno="c"+String(companyno).slice(0,8);
    //存储信息
    await companymodel.addcompany(companyno,params.name,params.desc,state,params.exptime,params.exptype,expiration_date,nowdate).then((res)=>{
        ctx.response.body={
            code:100,
            data:res,
            msg:"操作成功"
        }
    }).catch(err=>{
        ctx.response.body={
            code:0,
            data:err
        }
    })
};  
//公司列表
var fn_companylist= async (ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    await companymodel.companylist().then(res=>{
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
//获取修改公司的信息
var fn_getupdateinfo= async(ctx,next)=>{
    let token=ctx.request.headers.authorization;
    let tokenobj=jwtfun.verifyToken(token);
    if(tokenobj==""){
        ctx.response.body={
            code:10,
            msg:"登录失效" 
        }
        return;
    }
    let id=ctx.request.body.id;
    if(id==""||id==undefined||id==null){
        ctx.response.body=({
            code:0,
            data:"",
            msg:"参数异常"
        })
        return;
    }
    await companymodel.getcompanyinfo(id).then((res)=>{
        ctx.response.body=({
            code:100,
            data:res
        })
    }).catch((err)=>{
        ctx.response.body=({
            code:0,
            data:err
        })
    })    
}
//修改公司信息
var fn_updatecompany=async(ctx,next) => {
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
    let state=params.state?1:0;
    let exptime=params.exptime;
    if(params.name==""||params.desc==""||exptime==""||params.exptype==""){
        ctx.response.body={
            code:20,
            data:"参数不完整"
        }
        return;
    }
    //过期时间
    var expiration_date,
        nowdate=new Date();
    if(params.exptype=="y"){
        let year=nowdate.getFullYear()+exptime;
        let mouth=nowdate.getMonth()+1;
        let date=nowdate.getDate();
        let hours=nowdate.getHours();
        let Minute=nowdate.getMinutes();
        let second=nowdate.getSeconds();
        expiration_date=year+"-"+mouth+"-"+date+" "+hours+":"+Minute+":"+second;
    }else if(params.exptype=="m"){
        let year=nowdate.getFullYear();
        let mouth=nowdate.getMonth()+1+exptime;
        if(mouth>12){
            year+=1
            mouth=mouth-12
        } 
        let date=nowdate.getDate();
        let hours=nowdate.getHours();
        let Minute=nowdate.getMinutes();
        let second=nowdate.getSeconds();
        expiration_date=year+"-"+mouth+"-"+date+" "+hours+":"+Minute+":"+second;
    }else if(params.exptype=="d"){
        let time=nowdate.getTime()+(24*60*60*1000)*exptime;
        let year=new Date(time).getFullYear();
        let mouth=new Date(time).getMonth()+1;
        let date=new Date(time).getDate();
        let hours=new Date(time).getHours();
        let Minute=nowdate.getMinutes();
        let second=new Date(time).getSeconds();
        expiration_date=year+"-"+mouth+"-"+date+" "+hours+":"+Minute+":"+second;
    }

    //存储信息
    await companymodel.updatecompany(params.name,params.desc,state,params.exptime,params.exptype,expiration_date,params.id).then((res)=>{
        ctx.response.body={
            code:100,
            data:res,
            msg:"操作成功"
        }
    }).catch(err=>{
        ctx.response.body={
            code:0,
            data:err
        }
    })

}




module.exports = {
    'GET /companylist': fn_companylist,
    'POST /addcompany': fn_addcompany,
    'POST /getupdateinfo': fn_getupdateinfo,
    'POST /updatecompany': fn_updatecompany
};
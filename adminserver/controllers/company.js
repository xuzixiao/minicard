const companymodel=require('../config/mysql');
const jwtfun=require('../untils/methods');
const crypto=require('../untils/crypto');

//添加公司
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
            data:"公司基本信息不完整"
        }
        return;
    }
    if(params.manager.name==""||params.manager.pwd==""||params.manager.repwd==""){
        ctx.response.body={
            code:20,
            data:"公司管理员信息不完整"
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
    //管理员加密
    let managerpwd=crypto.aesEncrypt(params.manager.pwd);
    //存储信息 
    var insertId;
    var addcompanystate=false;
    await companymodel.addcompany(companyno,params.name,params.desc,state,params.exptime,params.exptype,expiration_date,params.manager.name,managerpwd,nowdate).then((res)=>{
        addcompanystate=true;
        insertId=res.insertId;
    }).catch(err=>{
        ctx.response.body={
            code:0,
            data:err
        }
    })
    //保存管理员
    if(addcompanystate){
        await companymodel.addadminAccount(params.manager.name,managerpwd,state,insertId,params.name,nowdate).then((res)=>{
            addcompanystate=true;
        }).catch(err=>{
            addcompanystate=false;
            ctx.response.body={
                code:0,
                data:err
            }
        })
    }
    var bannerstate=false;
    //判断有没有banner
    for(let i=0;i<params.adgroup.length;i++){
        if(params.adgroup[i].adimgs.length>0){
            bannerstate=true;
        }
    }
    if(bannerstate){
        //有banner图时
        let adgroup=JSON.stringify(params.adgroup);
        await companymodel.addcompanybanner(adgroup,insertId).then((res)=>{
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
    }else{
    //没有banner图时
        ctx.response.body={
            code:100,
            data:"添加成功"
        }
    }
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
    //判断有没有修改管理员信息
    if(params.manager.name!=""&&params.manager.oldpwd!=""&&params.manager.pwd!=""&&params.manager.repwd!=""){
        if(params.manager.pwd!=params.manager.repwd){
            ctx.response.body={
                code:0,
                msg:"新密码两次输入不正确"
            }
            return;
        }
        //验证旧密码是否正确
        let nextstep=false;
        let pwddata="";
        await companymodel.getcompanyuserpwd(params.id).then(res=>{
            pwddata=crypto.aesDecrypt(res[0].managerpwd);
        }).catch(err=>{
            ctx.response.body={
                code:0,
                msg:err
            }
        })
        if(pwddata==params.manager.oldpwd){
            nextstep=true;
        }else{
            ctx.response.body={
                code:0,
                msg:"修改密码失败,旧密码不正确"
            }
            return;
        }
        let updatepwd=crypto.aesEncrypt(params.manager.pwd);
        //修改旧密码
        if(nextstep){
            await companymodel.updatecompanypwd(params.manager.name,updatepwd,params.id).then((res)=>{
            }).catch(err=>{})
            await companymodel.updateadminAccount(params.manager.name,updatepwd,state,params.id).then((res)=>{
            }).catch(err=>{})
        }
    }
    let adgroup=JSON.stringify(params.adgroup);
    //存储信息
    await companymodel.updatecompany(params.name,adgroup,params.desc,state,params.exptime,params.exptype,expiration_date,params.id).then((res)=>{
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
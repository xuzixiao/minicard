var mysql = require('mysql');
var config= require('./config');
let pool = mysql.createPool(config);
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
};
//-------------------------登录-----------------
//用户登录
exports.loginxcheck = (user)=>{
    let sql='SELECT password,state FROM admin WHERE Account = ?';
    return query(sql,user)
}
//更新token
exports.updatetoken =(token,user)=>{
    let sql='UPDATE admin SET token=? where Account=?'
    return query(sql,[token,user]);
}
//-----------------------管理员-----------------
exports.addadminAccount =(Account,password,state,insertId,ascription,nowdate)=>{
    let sql='Insert into admin(Account,password,state,companyid,ascription,createtime) value(?,?,?,?,?,?)';
    return query(sql,[Account,password,state,insertId,ascription,nowdate]);
}
//根据管理员companyid修改用户名密码
exports.updateadminAccount =(user,pwd,state,companyid)=>{
    let sql='update admin set Account=?,password=?,state=? where companyid=?';
    return query(sql,[user,pwd,state,companyid]);
}
//------------------------公司------------------
//添加公司
exports.addcompany=(item_no,name,desc,state,exptime,exptype,expiration_date,manager,managerpwd,createtime)=>{
    let sql='Insert into company(item_no,name,depict,state,exptime,exptype,expiration_date,manager,managerpwd,createtime) value(?,?,?,?,?,?,?,?,?,?)'
    return query(sql,[item_no,name,desc,state,exptime,exptype,expiration_date,manager,managerpwd,createtime])
}
//获取公司
exports.companylist=()=>{
    let sql='SELECT * FROM company';
    return query(sql)
}
//获取公司管理员密码
exports.getcompanyuserpwd=(id)=>{
    let sql='SELECT managerpwd FROM company where Id=?';
    return query(sql,id)
}
//修改公司管理员密码
exports.updatecompanypwd=(user,pwd,id)=>{
    let sql="update company set manager=?,managerpwd=? where Id=?";
    return query(sql,[user,pwd,id]);
}
//修改公司-获取公司
exports.getcompanyinfo=(id)=>{
    let sql='SELECT * FROM company where Id=?';
    return query(sql,id)
}
//修改公司
exports.updatecompany=(name,ad,desc,state,exptime,exptype,expiration_date,id)=>{
    let sql="update company set name=?,ad=?,depict=?,state=?,exptime=?,exptype=?,expiration_date=? where Id=?";
    return query(sql,[name,ad,desc,state,exptime,exptype,expiration_date,id])
}
//保存banner
exports.addcompanybanner=(addata,id)=>{
    let sql='update company set ad=? where Id=?';
    return query(sql,[addata,id]);
}

//-------------------------用户-------------------
//用户列表
exports.getuserinfo=()=>{
    let sql="SELECT * FROM userinfo";
    return query(sql)
}
//根据id 查询用户信息
exports.getuserinfobyid=(id)=>{
    let sql="SELECT * FROM userinfo where Id=?"
    return query(sql,id);
}
//根据id 禁用/启用 用户 操作 status
exports.changeuserstatus=(status,Id)=>{
    let sql="update userinfo set status=? where Id=?"
    return query(sql,[status,Id]);
}

//-------------------------文章-------------------
//文章列表
exports.articlelist=()=>{
    let sql="SELECT article.*,category.categoryname,artstatus.statename FROM (article left join category on article.artcategoryid=category.id) left join artstatus on article.status=artstatus.state";
    return query(sql);
}
//文章详情 文章id
exports.articledetail=(id)=>{
    let sql="SELECT article.*,category.categoryname,artstatus.statename FROM (article left join category on article.artcategoryid=category.id) left join artstatus on article.status=artstatus.state WHERE article.Id=?";
    return query(sql,id)
}
//文章状态 文章id
exports.articlestatus=(state,id)=>{
    let sql="update article set status=? where Id=?";
    return query(sql,[state,id]);
}

//---------------------公司文章--------------
//保存公司文章
exports.savecompanyart=(title,artlogo,content,createtime)=>{
    let sql="Insert into company_art(title,artlogo,content,createtime) value(?,?,?,?)";
    return query(sql,[title,artlogo,content,createtime])
}
//获取公司文章列表
exports.getcompanyartlist=()=>{
    let sql="SELECT * FROM company_art";
    return query(sql);
}
//获取公司文章内容
exports.getcompanyartcomtent=(id)=>{
    let sql="SELECT * FROM company_art where Id=?";
    return query(sql,id);
}




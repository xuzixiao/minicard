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
//用户登录
exports.loginxcheck = (user)=>{
    let sql='SELECT password FROM admin WHERE Account = ?';
    return query(sql,user)
}
//更新token
exports.updatetoken =(token,user)=>{
    let sql='UPDATE admin SET token=? where Account=?'
    return query(sql,[token,user]);
}
//添加公司
exports.addcompany=(item_no,name,desc,state,exptime,exptype,expiration_date,createtime)=>{
    let sql='Insert into company(item_no,name,depict,state,exptime,exptype,expiration_date,createtime) value(?,?,?,?,?,?,?,?)'
    return query(sql,[item_no,name,desc,state,exptime,exptype,expiration_date,createtime])
}
//获取公司
exports.companylist=()=>{
    let sql='SELECT * FROM company';
    return query(sql)
}

//修改公司-获取公司
exports.getcompanyinfo=(id)=>{
    let sql='SELECT * FROM company where Id=?';
    return query(sql,id)
}
//修改公司
exports.updatecompany=(name,desc,state,exptime,exptype,expiration_date,id)=>{
    let sql="update company set name=?,depict=?,state=?,exptime=?,exptype=?,expiration_date=? where Id=?";
    return query(sql,[name,desc,state,exptime,exptype,expiration_date,id])
}

//用户列表
exports.getuserinfo=()=>{
    let sql="SELECT * FROM userinfo";
    return query(sql)
}









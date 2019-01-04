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
 








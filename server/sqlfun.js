// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT password FROM userinfo WHERE mobile = ?;',
        reg: 'insert into userinfo(mobile, password,createtime) values ( ?, ?, ?);',
        userinfo:'SELECT name,mobile,headimg,wechat,company,office,dictum,address,operate FROM userinfo WHERE mobile = ?;',
    }
}
module.exports = sqlMap;

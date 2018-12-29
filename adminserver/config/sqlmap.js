// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT password FROM userinfo WHERE mobile = ?;',//登录
        reg: 'insert into userinfo(mobile, password,createtime) values ( ?, ?, ?);',//注册
    },
    article:{
        save:"Insert into article(user,artbanner,artcategoryid,arttitle,tuijian,artcon,createtime) value(?,?,?,?,?,?,?)",
        getartlist:"SELECT * FROM article WHERE user = ? and artcategoryid = ?",
    }
}
module.exports = sqlMap;

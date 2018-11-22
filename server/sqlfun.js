// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT password FROM userinfo WHERE mobile = ?;',//登录
        reg: 'insert into userinfo(mobile, password,createtime) values ( ?, ?, ?);',//注册
        userinfo:'SELECT name,mobile,headimg,wechat,company,branch,office,dictum,address,operate FROM userinfo WHERE mobile = ?;',//获取用户信息
        savecardinfo:'UPDATE userinfo SET name=?,headimg=?,wechat=?,company=?,branch=?,office=?,dictum=?,address=?,operate=? WHERE mobile=?',//保存更新用户名片
        getcategory:'SELECT id,categoryname FROM category WHERE userid = ?',//获取用户文章分类
        setcategory:'INSERT INTO category(categoryname,userid,createtime) Value(?,?,?)',//添加用户文章分类
        querycatename:'SELECT * FROM category WHERE userid = ? and categoryname = ?',//查询用户有没有此文章分类
        addartimgs:'Insert into articleimg(user,image,createtime) value(?,?,?)',//保存文章图片
        getimagesql:'SELECT image FROM articleimg WHERE user = ?'            
    }
}
module.exports = sqlMap;

// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT password FROM userinfo WHERE mobile = ?;',//登录
        reg: 'insert into userinfo(mobile, password,createtime) values ( ?, ?, ?);',//注册
        userinfo:'SELECT name,mobile,headimg,wechat,wxewmimg,company,branch,office,dictum,address,operate FROM userinfo WHERE mobile = ?;',//获取用户信息
        savecardinfo:'UPDATE userinfo SET name=?,headimg=?,wechat=?,wxewmimg=?,company=?,branch=?,office=?,dictum=?,address=?,operate=? WHERE mobile=?',//保存更新用户名片
        getcategory:'SELECT id,categoryname FROM category WHERE userid = ?',//获取用户文章分类
        setcategory:'INSERT INTO category(categoryname,userid,createtime) Value(?,?,?)',//添加用户文章分类
        querycatename:'SELECT * FROM category WHERE userid = ? and categoryname = ?',//查询用户有没有此文章分类
        addartimgs:'Insert into articleimg(user,image,createtime) value(?,?,?)',//保存文章图片
        getimagesql:'SELECT image FROM articleimg WHERE user = ?',//获取用户图片
        addvideosql:'Insert into uservideo(user,video,createtime) value(?,?,?)',//保存文章视频
        getvideosql:'SELECT video FROM uservideo WHERE user = ?',  //获取用户上传的所有视频
        setmakeFrineds:'update userinfo set Frineds=? where mobile=?',//更新用户好友数据
        getuserFrineds:'SELECT frineds FROM userinfo WHERE mobile = ?'//获取用户好友数据
    },
    article:{
        save:"Insert into article(user,artbanner,artcategoryid,arttitle,tuijian,artcon,createtime) value(?,?,?,?,?,?,?)",
        getartlist:"SELECT * FROM article WHERE user = ? and artcategoryid = ?",
        getarticle:"SELECT * FROM article WHERE Id = ?",
        getartcommend:"SELECT * FROM article WHERE user = ? and tuijian = 1",//获取用户文章推荐
        artlist:"SELECT * FROM article WHERE artcategoryid = ?",
        collart:"update userinfo set collarticle=? where mobile=?",  //收藏文章
        getcollart:"SELECT collarticle FROM userinfo WHERE mobile = ?",//获取收藏的文章
        readtime:"update article set browse=? where Id=?", //阅读次数,
        delectsql:"DELETE FROM article WHERE user=? and Id=?",//删除文章
        getartofupdate:"SELECT * FROM article WHERE user = ? and Id = ?",//获取要修改的文章内容
        updatearticle:"update article set artbanner=?,artcategoryid=?,arttitle=?,tuijian=?,artcon=? where Id=?",//修改文章
        delcategory:"DELETE from category where Id = ? and userid = ?" //删除文章分类
    },
    link:{
        setlink:"Insert into link(user,linkname,linkurl,createtime) value(?,?,?,?)",//添加超链接
        getlink:"SELECT * FROM link WHERE user = ? ",//获取超链接
        updatelink:"UPDATE link SET linkname = ?,linkurl = ? where Id = ?",//更新超链接
        dellink:"DELETE from link where Id = ?"//删除超链接   
    }
}
module.exports = sqlMap;

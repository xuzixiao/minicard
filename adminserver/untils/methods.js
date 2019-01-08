const jwt = require('jsonwebtoken');

const secret = 'xuzixiao';

var generateToken = function(data){
    let created = Math.floor(Date.now() / 1000);
    let token = jwt.sign({
        data,
        exp: created + 3600 * 2 * 1 //分钟*小时*天   2小时
    }, secret);
    return token;
}
 


//验证token,最后的res。
//res=="" 登录失效


var verifyToken = function(token){
    let res;
    try{
        let result = jwt.verify(token, secret) || {};
        let {exp = 0} = result,
            current = Math.floor(Date.now()/1000);
        if(current <= exp){
            res = result.data || {};
        }
    }catch(e){
        res = ''
        //console.log(e);
    }
    return res;
}

module.exports={
    generateToken,verifyToken
}




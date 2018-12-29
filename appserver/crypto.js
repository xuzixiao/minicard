//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持。
const crypto=require("crypto");
//密钥
const key="xuyuanye";

//加密
var aesEncrypt=function aesEncrypt(data) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
//解密
var aesDecrypt=function aesDecrypt(encrypted) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
//加密
//var encrypted = aesEncrypt(data);
//解密
//var decrypted = aesDecrypt(encrypted);
module.exports={aesEncrypt,aesDecrypt}

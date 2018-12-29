//设置cookie
/**
* 设置cookie
* name cookie的名称
* value cookie的值
* day cookie的过期时间
*/

var setCookie = function (name, value,time) {//time毫秒
  if (time !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var exp = new Date();
    exp.setTime(exp.getTime() + time);
    document.cookie = name + "=" + escape(value)
        + ";expires=" + exp.toGMTString() + ";path=/";
  } else {
    document.cookie = name + "=" + escape(value);
  }
}

var getCookie = function (name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null; document.cookie = name + "=" + escape(value);
}

var delCookie=function (name){
  var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

var cookie={
  setCookie,getCookie,delCookie
}


module.exports=cookie;

//在页面中获取cookie  let showcookie = this.getCookie('wxshowstated');
//在页面中设置cookie  this.setCookie('wxshowstated', '1', 360);

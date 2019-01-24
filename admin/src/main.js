import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'


//服务端端口
const Path=4000;
//服务端地址
let API_HOST;
window.location.port==""?API_HOST=window.location.origin+":"+Path:API_HOST=window.location.origin.replace(":"+window.location.port,":"+Path);
//文件所在服务端口3000
let Filepath=API_HOST.replace(":"+Path,":3000");
//默认暂无图片地址
let Defaultimg=Filepath+'/uploadfile/nothave.jpg';
//默认header内添加token
Axios.interceptors.request.use(config=>{
   const token = sessionStorage.getItem("token");
   if(token){
     config.headers.Authorization =token;
   }
   return config;
},error=>{
  return Promise.reject(error);
})



Axios.defaults.baseURL = API_HOST;
Vue.prototype.$axios=Axios;

//挂载文件跟目录
Vue.prototype.$Filepath=Filepath;//3000
Vue.prototype.$File=API_HOST;//4000
//挂载默认图片
Vue.prototype.$Defaultimg=Defaultimg;
//挂载上传接口
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
})

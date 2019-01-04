import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'



//服务端地址
let API_HOST=window.location;
API_HOST.port==""?API_HOST.origin+=":4000":API_HOST=API_HOST.origin.replace(":"+API_HOST.port,":4000");
//默认挂载地址
Axios.defaults.baseURL = API_HOST;
Vue.prototype.$axios=Axios;

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
})

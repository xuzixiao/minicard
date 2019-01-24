// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from "./store"
import Vant from 'vant'
import Cookie from './cookie'
import 'vant/lib/index.css'

let API_HOST;
window.location.port==""?API_HOST=window.location.origin+":3000":API_HOST=window.location.origin.replace(":"+window.location.port,":3000");

let File_Path;
window.location.port==""?File_Path=window.location.origin+":4000":File_Path=window.location.origin.replace(":"+window.location.port,":4000");

Axios.defaults.baseURL = API_HOST;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$axios=Axios;
Vue.prototype.$cookie=Cookie;
Vue.prototype.$HOST=API_HOST;
Vue.prototype.$File_Path=File_Path;
Vue.config.productionTip = false
Vue.use(Vant)

/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  store,
  render:(h) => h(App)
})

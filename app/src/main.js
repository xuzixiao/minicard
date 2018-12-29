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

const API_HOST=window.location.origin+":3000";

Axios.defaults.baseURL = API_HOST;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$axios=Axios;
Vue.prototype.$cookie=Cookie;
Vue.prototype.$HOST=API_HOST;
Vue.config.productionTip = false
Vue.use(Vant)

/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  store,
  render:(h) => h(App)
})

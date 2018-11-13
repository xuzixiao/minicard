import Vue from 'vue'
import Router from 'vue-router'
//404
import Error from '@/pages/error'
//注册
import Register from '@/pages/Register'
//登录
import Login from '@/pages/Login'
//管理中心
import Home from '@/pages/homepage'
//我的名片
import Mycard from '@/pages/mycard'
//文章中心
import Myarticle from '@/pages/myarticle'
//微单页
import Mypage from '@/pages/mypage'
//微链接
import Myurl from '@/pages/myurl'
//通讯录
import Myrecord from '@/pages/myrecord'
//我的收藏
import Mycollect from '@/pages/mycollect'
//个人中心
import Myspace from '@/pages/myspace'
//选择模板
import Choosepage from '@/pages/choosepage'
//创建单页
import Createpage from '@/pages/createpage'
//写文章
import Writing from '@/pages/writing'
//我的单页
import page from '@/pages/page'


Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '*',
      name: 'Error',
      component: Error
    },
    {
      path: '/',
      name: 'index',
      component:Login
    },
    {
      path: '/Login',
      name: 'Login',
      component:Login
    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/mycard',
      name: 'mycard',
      component: Mycard
    },
    {
      path: '/myarticle',
      name: 'myarticle',
      component: Myarticle
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage
    },
    {
      path: '/myurl',
      name: 'myurl',
      component: Myurl
    },
    {
      path: '/myrecord',
      name: 'myrecord',
      component: Myrecord
    },
    {
      path: '/mycollect',
      name: 'mycollect',
      component: Mycollect
    },
    {
      path: '/myspace',
      name: 'myspace',
      component: Myspace
    },
    {
      path: '/createpage',
      name: 'createpage',
      component: Createpage
    },
    {
      path: '/choosepage',
      name: 'choosepage',
      component: Choosepage
    },
    {
      path: '/writing',
      name: 'Writing',
      component: Writing
    },{
      path: '/page',
      name: 'page',
      component: page
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import cookie from '@/cookie'
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
//管理中心登录
import adminlogin from '@/admin/login'
//管理中心主页
import adminmain from '@/admin/main'
//文章分类
import artcategory from '@/pages/artcategory'
//文章内容页
import article from '@/pages/article'




Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      name: 'Error',
      component: Error,
      meta: { requireAuth: true }
    },
    {
      path: '/',
      name: 'index',
      component: Login,
      meta: { requireAuth: true }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { requireAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requireAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { 
        requireAuth: true,
        keepAlive:true,// 是否需要缓存,缓存后返回页面不请求数据,进入页面请求数据
       }
    },
    {
      path: '/mycard',
      name: 'mycard',
      component: Mycard,
      meta: { requireAuth: true }
    },
    {
      path: '/myarticle',
      name: 'myarticle',
      component: Myarticle,
      meta: { requireAuth: true }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage,
      meta: { requireAuth: true }
    },
    {
      path: '/myurl',
      name: 'myurl',
      component: Myurl,
      meta: { requireAuth: true }
    },
    {
      path: '/myrecord',
      name: 'myrecord',
      component: Myrecord,
      meta: { requireAuth: true }
    },
    {
      path: '/mycollect',
      name: 'mycollect',
      component: Mycollect,
      meta: { requireAuth: true }
    },
    {
      path: '/myspace',
      name: 'myspace',
      component: Myspace,
      meta: { requireAuth: true }
    },
    {
      path: '/createpage',
      name: 'createpage',
      component: Createpage,
      meta: { requireAuth: true }
    },
    {
      path: '/choosepage',
      name: 'choosepage',
      component: Choosepage,
      meta: { requireAuth: true }
    },
    {
      path: '/writing',
      name: 'Writing',
      component: Writing,
      meta: { requireAuth: true }
    }, {
      path: '/page',
      name: 'page',
      component: page,
      meta: { requireAuth: true }
    },{
      path: '/artcategory',
      name: 'artcategory',
      component: artcategory,
      meta: { requireAuth: true }
    },{
      path: '/article',
      name: 'article',
      component: article,
      meta: { requireAuth: false }
    },{
      path: "/admin",
      name: "admin",
      component: adminmain,
      meta: { requireAuth: false },
      children: [
        {
          path: "login",
          name: "adminlogin",
          component: adminlogin
        }
      ]
    }
  ]
})



//路由验证
router.beforeEach((to, from, next) => {
  var loginstate = cookie.getCookie("loginstate");
  if (to.path === '/login') {//当进入的是登录页面时
    next()
  } else { //当进入的是不是登录页面时
    if (!loginstate && to.meta.requireAuth) {
      next(
        {
          path: '/login',
          query: {
            'path': from.fullPath
          }
        }
      )
    } else {
      next()
    }
  }
})
export default router;
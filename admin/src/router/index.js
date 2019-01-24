import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import index from '@/pages/index'
//user
import user from '@/pages/user'
import userindex from '@/pages/user/index'
import userdetail from '@/pages/user/detail'
//article
import article from '@/pages/article'
import articleindex from '@/pages/article/index'
import articledetail from '@/pages/article/detail'
import articlewrite from '@/pages/article/write'
//company
import company from '@/pages/company'
import companyindex from '@/pages/company/index'
import companyadd from '@/pages/company/add'
import companyupdate from '@/pages/company/update'


Vue.use(Router)

var router=new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      redirect:'/home/index'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect:'/home/index',
      meta:{
        title:"首页",
        requiresAuth:true
      },
      children:[
        {
          path:'index',
          name:'index',
          meta:{
            title:"主页",
            requiresAuth:true
          },
          component: index
        },
        {
          path:'user',
          name:'user',
          meta:{
            title:"用户管理",
            requiresAuth:true
          },
          component:user,
          redirect:'/home/user/index',
          children:[
            {
              path:'index',
              name:'userindex',
              meta:{
                title:"用户",
                requiresAuth:true
              },
              component:userindex
            },{
              path:'detail',
              name:'userdetail',
              meta:{
                title:"用户详情",
                requiresAuth:true
              },
              component:userdetail
            }
          ]
        },
        {
          path:'article',
          name:'article',
          meta:{
            title:"文章管理",
            requiresAuth:true
          },
          component: article,
          redirect:"/home/article/index",
          children:[
            {
              path:"index",
              name:"articleindex",
              meta:{
                title:"文章",
                requiresAuth:true
              },
              component: articleindex,
            },{
              path:'detail',
              name:'articledetail',
              meta:{
                title:"文章详情",
                requiresAuth:true
              },
              component:articledetail
            },{
              path:'write',
              name:'articlewrite',
              meta:{
                title:"写文章",
                requiresAuth:true
              },
              component:articlewrite
            }
          ]
        },
        {
          path:'company',
          name:'company',
          meta:{
            title:"公司管理",
            requiresAuth:true
          },
          redirect:'/home/company/index',
          component:company,
          children:[
            {
              path:"index",
              name:"companyindex",
              meta:{
                title:"公司",
                requiresAuth:true
              },
              component:companyindex
            },
            {
              path:"add",
              name:"addcompany",
              meta:{
                title:"添加公司",
                requiresAuth:true
              },
              component:companyadd
            },{
              path:"update",
              name:"updatecompany",
              meta:{
                title:"修改公司",
                requiresAuth:true
              },
              component:companyupdate
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  let token=window.sessionStorage.getItem('token');
  if(to.meta.requiresAuth){//路由验证
    if(token){//有token
        next();
    }else{
      next({
        path:"/login",
        query:{
          redirect:to.fullPath
        }
      })
    }
  }else{
    next();
  } 
})




export default router;
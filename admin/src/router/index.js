import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import user from '@/pages/user'
import article from '@/pages/article'
import index from '@/pages/index'
import company from '@/pages/company'
import companyadd from '@/pages/company/add'
import companyindex from '@/pages/company/index'

Vue.use(Router)

var router=new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect:'/home/index',
      meta:{
        title:"首页"
      },
      children:[
        {
          path:'index',
          name:'index',
          meta:{
            title:"主页"
          },
          component: index
        },
        {
          path:'user',
          name:'user',
          meta:{
            title:"用户管理"
          },
          component: user
        },
        {
          path:'article',
          name:'article',
          meta:{
            title:"文章管理"
          },
          component: article
        },
        {
          path:'company',
          name:'company',
          meta:{
            title:"公司管理"
          },
          redirect:'/home/company/index',
          component:company,
          children:[
            {
              path:"index",
              name:"companyindex",
              meta:{
                title:"公司"
              },
              component:companyindex
            },
            {
              path:"add",
              name:"addcompany",
              meta:{
                title:"添加公司"
              },
              component:companyadd
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  console.log(to);
  next();
})




export default router;
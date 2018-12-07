<template>
    <div class="homepage">
        <van-nav-bar title="正阳堂微名片管理中心"/>
        <div class="home-tit">
            <dl>
                <dt> <img :src="userinfo.headimg==null||userinfo.headimg==''?'static/images/morenheadimg.png':userinfo.headimg" /></dt>
                <dd>
                    <p class="username">{{userinfo.name==''||userinfo.name==null?userinfo.mobile:userinfo.name}}</p>
                    <p>{{userinfo.dictum==null||userinfo.dictum==''?'您还没填写您的宣言~':userinfo.dictum}}</p>
                </dd>
            </dl>
        </div>
<van-notice-bar
  :text="scrolltext"
/>
        <div class="home-main">
            <van-row gutter="10">
                <van-col span="8" v-for="(item,index) in menudata" :key="index">
                    <router-link :to="item.path">
                        <div class="navlist">
                           <van-icon :name="item.iconclass" />
                            <span>{{item.menutit}}</span>
                        </div>
                    </router-link>
                </van-col>
            </van-row>
        </div>


    </div>
</template>
<script>
export default {
  data() {
    return {
        scrolltext:"正阳堂微名片管理系统正阳堂微名片管理系统正式上线正阳堂微名片管理系统正阳堂微名片管理系统正式上线", 
        menudata:[
            {"menutit":"我的名片","path":"/mycard","iconclass":"idcard"},
            {"menutit":"文章中心","path":"/myarticle","iconclass":"records"},
            {"menutit":"微单页","path":"/page?user=18888348998","iconclass":"completed"},
            {"menutit":"微链接","path":"/myurl","iconclass":"share"},
            {"menutit":"通讯录","path":"/myrecord","iconclass":"contact"},
            {"menutit":"我的收藏","path":"/mycollect","iconclass":"shop-collect"},
            {"menutit":"个人中心","path":"/myspace","iconclass":"pending-deliver"}
        ],
        userinfo:""
    }
  },
  computed:{

  },
  created:function(){

  },
  methods:{
      getuserinfo:function(){
          var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
          this.$axios({
              url:"/api/user/getuseinfo",
              method:"POST",
              data:{
                  username:user
              }
          }).then((res)=>{
              if(res.data.code==100){
                  this.userinfo=res.data.userinfo;
              }else{
                  console.log("====获取用户信息失败====");
              }
          },(res)=>{
                 console.log("====获取用户信息失败====");
          })
      }
  },
  mounted:function(){
        this.getuserinfo();
  },
  beforeRouteEnter:function(to,from,next){//如果修改资料成功后,进入该页面重新请求
      if(to.query.change){
        next(vm=>{//通过vm访问this
                vm.getuserinfo();
            }
        );
      }else{
        next();
      }
      
  }
};
</script>
<style scoped>
.home-tit {
  padding: 5px 10px;
  border-bottom: #efecec solid 1px;
}
.home-tit dl {
  height: 4rem;
  width: 100%;
  display: flex;
  position: relative;
}
.home-tit dl dt {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
}
.home-tit dl dt img {
  display: block;
  width: 4rem;
  height: 4rem;
}
.home-tit dl dd {
  margin-left: 10px;
}
.home-tit dl dd p {
  margin: 0px;
  line-height: 2rem;
  width: 100%;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.navlist{
height: auto;
background: #6da0ed;
color: #fff;
}
.home-main{
   padding:10px; 
}
.home-main .navlist{
    margin-bottom: 10px;
    padding: 10px 5px;
    border-radius: 5px;
}
.home-main .navlist .van-icon{
    width: 100%;
    text-align: center;
    font-size: 30px;
    padding: 10px 0px;
}
.home-main .navlist span{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 14px;
}
.homepage{
    min-width: 320px;
}
.username{
    font-size: 16px!important;
}
</style>

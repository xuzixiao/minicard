<template>
    <div class="main">
        <van-nav-bar 
        title="我的名片" 
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
        />

        <div class="box">
            <van-row class="userheadimg">
                  <van-col span="6">
                      <p>头像</p>
                      </van-col>
                  <van-col span="8">
                      <img :src="userinfo.headimg==null||userinfo.headimg==''?'static/images/morenheadimg.png':userinfo.headimg" />
                  </van-col>
                  <van-col span="8">
                      <van-uploader :after-read="updateheadimg" accept="image/jpeg" multiple>
                        <van-button size="small" class="updateimgbtn">修改头像</van-button>
                      </van-uploader>
                  </van-col>
            </van-row>
            
             <van-cell-group>
                <van-field v-model="userinfo.name" label="姓名" placeholder="请输入真实姓名" />
                <van-field v-model="userinfo.mobile" disabled label="手机号" placeholder="请输入手机号" />
                <van-field v-model="userinfo.wechat" label="微信号" placeholder="请输入微信号" />
            </van-cell-group>

            <van-row class="userheadimg">
                  <van-col span="6">
                      <p>微信二维码</p>
                      </van-col>
                  <van-col span="8">
                      <img :src="userinfo.wxewmimg==null||userinfo.wxewmimg==''?'static/images/morenheadimg.png':userinfo.wxewmimg" />
                  </van-col>
                  <van-col span="8">
                      <van-uploader :after-read="updatewxewm" accept="image/jpeg" multiple>
                        <van-button size="small" class="updateimgbtn">修改二维码</van-button>
                      </van-uploader>
                  </van-col>
            </van-row>

            <van-cell-group>
                <van-field v-model="userinfo.company" label="公司名称" placeholder="请输入所在公司名称" />
                <van-field v-model="userinfo.branch" label="所属部门" placeholder="请输入所在公司部门" />
                <van-field v-model="userinfo.office" label="职务" placeholder="请输入您的职务" />
                <van-field v-model="userinfo.address" label="地址" placeholder="请输入您的地址" />
                <van-field v-model="userinfo.dictum" label="我的宣言" type="textarea" placeholder="请输入我的宣言" />
                <van-field v-model="userinfo.operate" label="主要经营" rows="3" type="textarea" autosize placeholder="请输入主要经营的项目" />
            </van-cell-group>
            <van-button size="large" class="savecard" @click="seavecard">保存名片</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userinfo:""
        }
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
      },
    //修改头像
    updateheadimg:function(e){   
      this.$axios({
          url:"/api/upload/headimg",
          method:"POST",
          data:{
              image:e.content
          }
      }).then(
          (res)=>{
             if(res.data.code==100){
                 this.userinfo.headimg=res.data.data
             }else{
                 this.$toast(res.data.data);
                 if(res.data.code==50){
                     var vm=this;
                     setTimeout(()=>{
                         vm.$router.push("/login");
                     },800)
                 }
             }
          },(res)=>{
              console.log("====上传失败====");
          }
      )
    },
    //修改微信二维码
    updatewxewm:function(e){
        
        this.$axios({
          url:"/api/upload/ewm",
          method:"POST",
          data:{
              image:e.content
          }
      }).then(
          (res)=>{
             if(res.data.code==100){
                 this.userinfo.wxewmimg=res.data.data
             }else{
                 this.$toast(res.data.data);
                 if(res.data.code==50){
                     var vm=this;
                     setTimeout(()=>{
                         vm.$router.push("/login");
                     },800)
                 }
             }
          },(res)=>{
              console.log("====上传失败====");
          }
      )
        
    },
    seavecard:function(){
      this.$axios({
          url:"/api/user/savecardinfo",
          method:"POST",
          data:{
              name:this.userinfo.name,
              headimg:this.userinfo.headimg,
              wechat:this.userinfo.wechat,
              wxewmimg:this.userinfo.wxewmimg,
              company:this.userinfo.company,
              branch:this.userinfo.branch,
              office:this.userinfo.office,
              dictum:this.userinfo.dictum,
              address:this.userinfo.address,
              operate:this.userinfo.operate
          }
      }).then(
          (res)=>{
             if(res.data.code==100){
                 this.$toast("保存成功");
                 var vm=this;
                     setTimeout(()=>{
                         vm.$router.push({path:"/home",query:{change:true}});
                     },800)
             }else{
                 this.$toast(res.data.data);
                 if(res.data.code==50){
                     var vm=this;
                     setTimeout(()=>{
                         vm.$router.push("/login");
                     },800)
                 }
             }
          },(res)=>{
              console.log("====上传失败====");
          }
      )


        
    }


    },
    created:function(){
        this.getuserinfo();
    },
    mounted:function(){
    }
}
</script>

<style scoped>
.box{
    padding: 10px;
}
.userheadimg{
    border-bottom: #eee solid 0px;
    padding: 5px 0px;
}
.userheadimg img{
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.userheadimg p{
    font-size: 14px;
    color: #333;
    line-height: 80px;
    margin: 0px;
    padding-left: 15px;
}
.updateimgbtn{
    margin-top: 30px; 
}
.savecard{
    background: #6da0ed;
    color: #ffffff;
    border:none;
    border-radius:5px;
    margin: 20px auto 40px;
}
</style>

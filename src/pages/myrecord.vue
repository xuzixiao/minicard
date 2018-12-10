<template>
<div class="article">
    <van-nav-bar 
        :title=pagetitle 
        left-text="返回"
        left-arrow
        @click-left="back"
        />

    <div class="record">
        <div v-for="item in frineds">
            <router-link :to="{path:'/page',query:{user:item.mobile}}" class="recordlist">
            <div class="record-hdimg">
                <img :src="item.headimg==null||item.headimg==''?'static/images/morenheadimg.png':item.headimg" />
            </div>
            <div class="record-main">
                <p>{{item.name}}</p>
                <p>手机：{{item.mobile}}</p>
                <p>主要经营：{{item.operate}}</p>
            </div>
            </router-link>
        </div> 
    </div>    

</div>

</template>
<script>
export default {
    data(){
        return{
            pagetitle:"我的通讯录",
            frineds:[]
        }
    },
    methods:{
        back:function(){
            this.$router.push("/home");
        },
        getfrineds:function(){
            if(!this.$cookie.getCookie("loginstate")){
                this.$toast("登录失效,请重新登录")
                setTimeout(() => {
                    window.location.href="/login"
                }, 800);
                return;
            }
            var user= JSON.parse(this.$cookie.getCookie("loginstate")).user;
            this.$axios({
                url:"/api/user/getfrineds",
                method:"POST",
                data:{
                    user:user
                }
            }).then((res)=>{
                if(res.data.code==100){
                    this.frineds=res.data.data;
                }
            },(err)=>{
                console.log(err);
            })
        }
    },
    created:function(){
        this.getfrineds();
    }
}
</script>
<style scoped>
.record{
    height:auto;
    padding: 10px;
}
.recordlist{
    width:100%;
    min-height:80px;
    padding: 10px 0px;
    border-bottom:#c2c2c2 dashed 0.5px;
    display: flex;
}
.record-hdimg{
    margin-right: 10px;
}
.record-hdimg img{
   display: block;
   width: 70px;
   height: 70px;
   border-radius:40px;
   margin: 5px auto;
}
.record-main{
    height: auto;
}
.record-main p{
    color: #333;
    font-size: 14px;
    line-height: 25px;
}
</style>


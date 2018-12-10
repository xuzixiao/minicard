<template>
    <div class="login">
        <h2>正阳堂微名片系统</h2>

        <h3>登录</h3>
        
        <div class="card-main">
            <van-field
                v-model="logininfo.username"
                required
                clearable
                label="手机号"
                placeholder="请输入登录手机号"
            />

            <van-field
                v-model="logininfo.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />  
            <p class="tiptext">
                <router-link to="/register">没有账号？去注册</router-link>
            </p>
            <van-button type="primary" size="large" class="loginbtn" @click="loginfun">登录</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            logininfo:{
                username:"",
                password:""
            },
        }
    },
    methods:{
        loginfun:function(){
            if(this.logininfo.username==""||this.logininfo.password==""){
                this.$toast("请您输入账号密码后登录");
                return;
            }
            if(!(/^1[345678]\d{9}$/.test(this.logininfo.username))){ 
                this.$toast("手机号码有误，请重填");  
                return false; 
            } 
         this.$toast.loading({forbidClick: true});
            this.$axios({
                url:"/api/user/userlogin",
                method:"POST",
                data:this.logininfo
            }).then((res)=>{
                this.$toast.clear();
                if(res.data.code==0){
                    this.$toast(res.data.msg)
                }else if(res.data.code==100){
                    this.$toast.success(res.data.msg);
                    this.$router.push({path:"/home",query:{change:true}});
                }
            },(res)=>{
                this.$toast.clear();
                this.$toast("系统错误,请您稍后重试")
            })
            }

    },
    mounted:function(){
         this.$axios({
                url:"/api/user/loginout",
                method:"POST"
            })
    }
}
</script>

<style>
.login h2{
    font-size: 1.5em;
    line-height:5em;
    text-align: center;
    font-weight: normal;
}
.card-main{
    padding: 1rem;
}
.loginbtn{
    display: block;
    margin: 1em auto;
}
.tiptext{
    text-align: right;
}
.tiptext a{
    font-size: 12px;
    color:#666;
}
.login h3{
    text-align: center;
    line-height: 3em;
}
</style>
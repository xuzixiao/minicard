<template>
    <div class="login">
        <h2>正阳堂微名片系统</h2>
        <h3>注册账号</h3>
        <div class="card-main">
            <van-field
                v-model="reguserinfo.username"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
            />

            <van-field
                v-model="reguserinfo.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                autocomplete="new-password"
            />  
              <van-field
                v-model="querypwd"
                type="password"
                label="确认密码"
                placeholder="请输入确认密码"
                required
                autocomplete="new-password"
            />  
            <p class="tiptext">
                <router-link to="/Login">已有账号？去登录</router-link>
            </p>

            <van-button type="primary" size="large" class="loginbtn" @click="registerfun">注册</van-button>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            querypwd:"",
            reguserinfo:{
                username:"",
                password:""
            }
        }
    },
    methods:{
        registerfun:function(){
            if(this.reguserinfo.username==""||this.reguserinfo.password==""||this.querypwd==""){
                this.$toast("信息填写不完整");
                return;
            }
            if(this.reguserinfo.password!=this.querypwd){
                this.$toast("两次密码输入不一致");
                return;
            }
            this.$toast.loading({forbidClick: true});
               this.$axios({
                url:"/api/user/userreg",
                method:"POST",
                data:this.reguserinfo
            }).then((res)=>{
                this.$toast.clear();
                    if(res.data.code==0){
                        this.$toast(res.data.msg)
                    }else if(res.data.code==100){
                        this.$toast.success(res.data.msg);
                        let that=this;
                        setTimeout(function(){
                             that.$router.push("/login");    
                        },800)
                    }
                },(res)=>{
                this.$toast.clear();
                this.$toast("系统错误,请您稍后重试")
                }
            )
        }
    },
    mounted:function(){

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
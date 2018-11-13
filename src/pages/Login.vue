<template>
    <div class="login">
        <h2>正阳堂微名片系统</h2>

        <h3>登录</h3>
        
        <div class="card-main">
            <van-field
                v-model="username"
                required
                clearable
                label="手机号"
                placeholder="请输入登录手机号"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />  
            <p class="tiptext">
                <router-link to="/register">没有账号？去注册</router-link>
            </p>
            <van-button type="primary" size="large" class="loginbtn">登录</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:"",
            password:""
        }
    },
    mounted:()=>{
        
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
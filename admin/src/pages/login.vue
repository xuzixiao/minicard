<template>
    <div class="login">

        <div class="loginmain">
            <div class="logincon">
                <el-row>
                    <el-col tag="h1">微名片后台管理系统</el-col>
                </el-row>
                <el-row class="line">
                    <el-col :span="6"><label>用户名</label></el-col>
                    <el-col :span="18"><el-input v-model="username" placeholder="请输入内容"></el-input></el-col>
                </el-row>
                <el-row class="line">
                    <el-col :span="6"><label>密码</label></el-col>
                    <el-col :span="18"><el-input type="password" v-model="userpassword" placeholder="请输入内容"></el-input></el-col>
                </el-row>
                <el-row>
                    <el-button type="primary">登录</el-button>
                </el-row>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            username:"",
            userpassword:""
        }
    }
}
</script>
<style scoped>
.login{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    min-height:800px;
    background-image: url("../assets/logobg.jpeg");
    background-repeat: no-repeat;
    background-size: 100% 100%; 
    background-position: center
}
.loginmain{
    width: 400px;
    height: 270px;
    background:rgba(255, 255, 255, .8);
    position:fixed;
    left: 50%;
    top: 30%;
    margin-left: -200px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0,0,0,.3);
}
.loginmain h1{
    font-size: 24px;
    line-height: 60px;
}
.logincon{
    padding:0px 50px 50px;
}
.logincon .line{
    margin-bottom: 15px;
}
.logincon .line label{
    line-height: 40px;
    font-size: 16px;
}
</style>

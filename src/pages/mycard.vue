<template>
    <div class="main">
        <van-nav-bar 
        title="我的名片" 
        left-text="返回"
        left-arrow
        @click-left="back"
        />

        <div class="box">
            <van-row class="userheadimg">
                  <van-col span="6">
                      <p>头像</p>
                      </van-col>
                  <van-col span="8">
                      <img src="static/images/morenheadimg.png" />
                  </van-col>
                  <van-col span="8">
                      <van-button size="small" class="updateimgbtn">修改头像</van-button>
                  </van-col>
            </van-row>

            <van-cell-group>
                <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
                <van-field v-model="username" label="手机号" placeholder="请输入手机号" />
                <van-field v-model="username" label="微信号" placeholder="请输入微信号" />
                <van-field v-model="username" label="公司名称" placeholder="请输入所在公司名称" />
                <van-field v-model="username" label="所属部门" placeholder="请输入所在公司部门" />
                <van-field v-model="username" label="职务" placeholder="请输入您的职务" />
                <van-field v-model="username" label="地址" placeholder="请输入您的地址" />
                <van-field v-model="username" label="我的宣言" placeholder="请输入我的宣言" />
                <van-field v-model="username" label="主要经营" rows="3" type="textarea" autosize placeholder="请输入主要经营的项目" />
            </van-cell-group>
            
            <van-button size="large" class="savecard">保存名片</van-button>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:""

        }
    },
    methods:{
        back:function(){
            this.$router.push("/home")
        }
    }
}
</script>

<style scoped>
.box{
    padding: 10px;
}
.userheadimg{
    border-bottom: #eee solid 0px;
    padding-bottom: 10px;
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

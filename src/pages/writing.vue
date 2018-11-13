<template>
    <div class="main">
        <van-nav-bar 
        title="写文章" 
        left-text="返回"
        left-arrow
        @click-left="back"
        />

        <div class="box">
            <van-cell-group>
                <van-field v-model="username" label="文章标题" placeholder="请输入用户名" />
                <van-field v-model="username" label="头部图片" placeholder="请输入手机号" />
                <van-field v-model="username" label="设为推荐" placeholder="请输入微信号" />
                <van-field v-model="username" label="文章内容" rows="3" type="textarea" autosize placeholder="文章内容" />
            </van-cell-group>
            
            <van-button size="large" class="savecard">保存文章</van-button>

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

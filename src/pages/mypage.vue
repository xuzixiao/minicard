<template>
<div class="article">
    <van-nav-bar 
        :title=pagetitle 
        left-text="返回"
        left-arrow
        @click-left="back"
        />

<div class="art-mian">
  <van-row class="art-main-title">
    <van-col span="10">
        <p><van-icon name="records" />我的微单页</p>
    </van-col>
    <van-col span="14" style="text-align:right">
        <van-button  size="small" @click="choose">创建微单页</van-button>
    </van-col>
  </van-row>


    <div class="mobanlist">
        <van-row gutter="10">
            <van-col span="8" class="moban-box">
                <div class="moban" @click="choose">
                    <img src="/static/images/morenheadimg.png">
                    <span>默认模板</span>
                </div>
            </van-col>  
        </van-row>
    </div>

   

    <div class="art-none">
        <van-icon name="info-o"/>
        <p>您还未创建微单页</p>
    </div>
</div>

</div>

</template>
<script>
export default {
    data(){
        return{
            pagetitle:"微单页",
        }
    },
    methods:{
        back:function(){
            this.$router.push("/home");
        },
        choose:function(){
            this.$router.push("/choosepage")
        }
    }
}
</script>
<style scoped>
.art-mian{
    padding: 0 10px;
}
.art-main-title{
    height: 46px;
    padding: 0 10px;
    border-bottom:0.5px solid #eee;
}
.art-main-title p{
    line-height: 46px;
    color: #666;
}
.art-main-title p i{
    font-size: 18px;
    line-height: 46px;
    margin-right:5px;
    float: left;
    color: #666;
}
.art-main-title button{
    margin-top:8px; 
}
.art-none{
    text-align: center;
    margin-top:30px; 
}
.art-none i{
    font-size: 60px;
    color: #999;
}
.art-none p{
    font-size: 14px;
    color: #666;
    line-height: 40px;
}
.art-list{
    margin-top: 10px;
}
.mobanlist{
    padding: 5px;
}
.moban{
    width: 100%;
    height: 130px;
    border: #d3d3d3 solid 0.5px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
}
.moban img{
    display: block;
    width: 100%;
    height: auto;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 5;
}
.moban span{
    display: block;
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 6;
    background:#d3d3d3;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color:#333;
}
.moban-box{
    margin-bottom:10px;
}
</style>


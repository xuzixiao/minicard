<template>
<div class="article">
    <van-nav-bar 
        :title=pagetitle 
        left-text="微单页"
        left-arrow
        @click-left="back"
        />


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







</div>

</template>
<script>
export default {
    data(){
        return{
            pagetitle:"选择模板"

        }
    },
    methods:{
        back:function(){
            this.$router.push("/mypage");
        },
        choose:function(id){
            this.$router.push("/createpage")
        }
    }
}
</script>
<style scoped>
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


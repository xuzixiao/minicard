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
        <p><van-icon name="idcard" />我的微链接</p>
    </van-col>
    <van-col span="14" style="text-align:right">
        <van-button  size="small"  @click="show=true">添加微链接</van-button>
    </van-col>
  </van-row>

    <div class="art-list">
        <van-panel title="百度" desc="http://www.baidu.com">
            <div slot="footer" class="slotfooter">
                <van-button size="small">修改</van-button>
                <van-button size="small" type="danger">删除</van-button>
            </div>
        </van-panel>
        <van-panel title="百度" desc="http://www.baidu.com">
            <div slot="footer" class="slotfooter">
                <van-button size="small">修改</van-button>
                <van-button size="small" type="danger">删除</van-button>
            </div>
        </van-panel>
        <van-panel title="百度" desc="http://www.baidu.com">
            <div slot="footer" class="slotfooter">
                <van-button size="small">修改</van-button>
                <van-button size="small" type="danger">删除</van-button>
            </div>
        </van-panel>
        <van-panel title="百度" desc="http://www.baidu.com">
            <div slot="footer" class="slotfooter">
                <van-button size="small">修改</van-button>
                <van-button size="small" type="danger">删除</van-button>
            </div>
        </van-panel>





    </div>

    <div class="art-none">
        <van-icon name="info-o"/>
        <p>暂无数据</p>
    </div>
</div>


<van-popup v-model="show" class="alertbox">
    <div>
        <p>
            <span>添加微链接</span>
            <van-icon name="close" @click="show=false" />    
        </p>
        <van-field v-model="username" label="微链接" placeholder="请输入微链接名称" />
        <van-field v-model="username" label="链接地址" placeholder="请输入链接地址" />
        <van-button size="large" class="savecard">添加</van-button>
    </div>
</van-popup>



</div>

</template>
<script>
export default {
    data(){
        return{
            pagetitle:"微链接",
            show:false

        }
    },
    methods:{
        back:function(){
            this.$router.push("/home");
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
.alertbox{
    width: 80%;
    padding: 10px;
    border-radius: 5px;
}
.alertbox i{
    float: right;
    font-size: 24px;
    color: #666;
}
.alertbox span{
    color: #666;
}
.alertbox button{
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    background: #50b7c1;
    color: #ffffff;
}
.slotfooter{
    text-align: right;
}
</style>


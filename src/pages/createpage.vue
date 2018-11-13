<template>
<div class="article">
    <van-nav-bar 
        :title=pagetitle 
        left-text="微单页"
        left-arrow
        @click-left="back"
        />

        <div class="moban">
            <div class="head">
                <p class="companyname">正阳堂科技孵化器有限公司</p>
                <div class="userhead">
                    <div class="headimg">
                        <img src="/static/images/morenheadimg.png" />
                    </div>
                    <p>徐原野</p>
                    <p>技术部 • 前端开发工程师</p>
                    <p>莫愁前路无知己,天下谁人不识君！</p>
                </div>
            </div>

            <div class="section">
                <div class="section-title">
                    <van-icon name="pending-evaluate" />
                    <p>联系资料</p>
                </div>
                <div class="section-main">
                    <van-row tag="p">
                        <van-col span="4" offset="1" tag="span">电话：</van-col>
                        <van-col span="14" tag="span">18888348998</van-col>
                        <van-col span="4" tag="span"><a href="tel:18888348998">
                            <van-button size="mini">打电话</van-button>
                            </a></van-col>
                    </van-row>
                     <van-row tag="p"> 
                        <van-col span="4" offset="1" tag="span">微信：</van-col>
                        <van-col span="14" tag="span">xyy18888348998</van-col>
                        <van-col span="4" tag="span"><van-button size="mini">加微信</van-button></van-col>
                    </van-row>
                     <van-row tag="p">
                        <van-col span="4" offset="1" tag="span">所在地:</van-col>
                        <van-col span="14" tag="span">北京市海淀区交大东路31号院</van-col>
                        <van-col span="4" tag="span"><van-button size="mini">查看位置</van-button></van-col>
                    </van-row>
                </div>
            </div>


            <div class="section myurl">
                <div class="section-title">
                    <van-icon name="share" />
                    <p>微链接</p>
                </div>
                <div class="section-main">
                    <van-row tag="p" gutter="10">
                        <van-col span="12" tag="span"><a href="" class="van-ellipsis">链接名称</a></van-col>
                        <van-col span="12" tag="span"><a href="" class="van-ellipsis">链接名称</a></van-col>
                        <van-col span="12" tag="span"><a href="" class="van-ellipsis">链接名称</a></van-col>
                        <van-col span="12" tag="span"><a href="" class="van-ellipsis">链接名称</a></van-col>
                        <van-col span="12" tag="span"><a href="" class="van-ellipsis">链接名称</a></van-col>
                    </van-row>
                </div>
            </div>


            <div class="section myarticle">
                <div class="section-title">
                    <van-icon name="pending-orders" />
                    <p>我的文章</p>
                </div>
                <div class="section-main">
                    <van-row tag="ul" gutter="10">
                        <van-col span="8" tag="li">
                            <a href="">
                                <div class="artleibie">
                                    <van-icon name="tosend" />
                                    <p>新闻中心</p>
                                </div>
                            </a>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <div class="section arthot">
                <div class="section-title">
                    <van-icon name="like-o" />
                    <p>热门推荐</p>
                </div>
                <div class="section-main">
                   <ul>
                       <li>
                           <div class="artimg">
                               <img src="/static/images/morenheadimg.png" />
                           </div>
                           <div class="arttext">
                                <a href="">文章标题文章标题文章标题文章标题文章标题</a>
                                <span>2018-03-06</span>
                           </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    <div class="createpagebtn">
        <van-button  size="large">使用此模板</van-button>
    </div>

</div>

</template>
<script>
export default {
    data(){
        return{
            pagetitle:"创建模板"

        }
    },
    methods:{
        back:function(){
            this.$router.push("/mypage");
        }
    }
}
</script>
<style scoped>
.moban{
    padding: 0 5px;
}
.companyname{
    font-size: 12px;
    line-height: 40px;
    color:#333;
}
.userhead p{
    text-align: center;
    font-size: 12px;
    line-height: 30px;
}
.headimg{
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0 auto;
}
.headimg img{
    display: block;
    width: 100%;
    height: 100%;
}
.section-title{
    border-bottom: #f2f2f2 solid 0.5px;
    height: 40px;
    line-height: 40px;
}
.section-title p{
    line-height: 40px;
    display: inline-block;
    font-size: 14px;
}
.section-title i{
    font-size: 18px;
    display: block;
    width: 20px;
    height: 20px;
    line-height:20px;
    text-align: center;
    margin: 10px 5px;
    float:left;
}
.section-main p{
    line-height: 40px;
}
.section-main p span{
    font-size: 12px;
}
.myurl a{
    font-size: 16px;
    line-height:40px;
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    color:#ffffff;
    background:#78cdd1;
}
.myurl a i{
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
}
.myurl span{
    margin-top: 10px;
}
.artleibie{
    background: #78cdd1;
    padding: 10px 5px;
    margin-top: 10px;
    border-radius: 4px;
}
.artleibie i{
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    width: 100%;
    height: auto;
}
.artleibie p{
    text-align: center;
    color: #ffffff;
    line-height: 20px;

}
.article{
    padding-bottom: 100px;
}

.arthot ul li{
    width: 100%;
    height: auto;
    padding: 5px 0px;
    display:flex;
    border-bottom: #f2f2f2 solid 0.5px;
}
.arthot ul li .artimg{
    width: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.artimg img{
    display: block;
    width: 100%;
    height: auto;
}
.arttext{
    padding-left: 5px;
}
.arttext a{
    font-size: 14px;
    color: #333;
    line-height: 30px;
}
.arttext span{
    font-size: 14px;
    color: #333;
    line-height: 30px;
    float: right;
}
.createpagebtn{
    width: 96%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 5px 2%;
    background: #ffffff;
}
.createpagebtn button{
    background: #78cdd1;
    color: #ffffff;
}



</style>


<template>
<div class="article">
    <!-- <van-nav-bar 
        title="我的单页" 
        left-arrow
        @click-left="back"
        /> -->

        <div class="moban">
            <div class="head">
                <p class="companyname">{{userinfo.company}}</p>
                <div class="userhead">
                    <div class="headimg">
                        <img :src="userinfo.headimg" />
                    </div>
                    <p>{{userinfo.name}}</p>
                    <p>{{userinfo.branch}} • {{userinfo.office}}</p>
                    <p v-if="userinfo.dictum!=''">{{userinfo.dictum}}</p>
                    <van-notice-bar v-if="userinfo.operate!=''" :text="'主要经营 : '+userinfo.operate" left-icon="//img.yzcdn.cn/vant/volume.png"/>
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
                        <van-col span="14" tag="span">{{userinfo.mobile}}</van-col>
                        <van-col span="4" tag="span"><a :href="'tel:'+userinfo.mobile">
                            <van-button size="mini">打电话</van-button>
                            </a></van-col>
                    </van-row>
                     <van-row tag="p"> 
                        <van-col span="4" offset="1" tag="span">微信：</van-col>
                        <van-col span="14" tag="span">{{userinfo.wechat}}</van-col>
                        <van-col span="4" tag="span"><van-button size="mini" @click="showwx=true">加微信</van-button></van-col>
                    </van-row>
                     <van-row tag="p">
                        <van-col span="4" offset="1" tag="span">所在地:</van-col>
                        <van-col span="14" tag="span">{{userinfo.address}}</van-col>
                        <!-- <van-col span="4" tag="span"><van-button size="mini">查看位置</van-button></van-col> -->
                    </van-row>
                </div>
            </div>


            <div class="section myurl" v-if="userlink.length!=0">
                <div class="section-title">
                    <van-icon name="share" />
                    <p>微链接</p>
                </div>
                <div class="section-main">
                    <van-row tag="p" gutter="10">
                        <van-col span="12" tag="span" v-for="item,index in userlink" :key="index"><a :href="item.linkurl" target='_blank' class="van-ellipsis">{{item.linkname}}</a></van-col>
                    </van-row>
                </div>
            </div>


            <div class="section myarticle" v-if="userart.length!=0">
                <div class="section-title">
                    <van-icon name="pending-orders" />
                    <p>我的文章</p>
                </div>
                <div class="section-main">
                    <van-row tag="ul" gutter="10">
                        <van-col span="8" tag="li" v-for="item,index in userart" :key="index">
                                <router-link :to="{path:'/artlist',query:{categoryid:item.id,categoryname:item.categoryname}}">
                                    <div class="artleibie">
                                        <van-icon name="tosend" />
                                        <p>{{item.categoryname}}</p>
                                    </div>
                                </router-link>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <div class="section arthot" v-if="artcommend.length!=0">
                <div class="section-title">
                    <van-icon name="like-o" />
                    <p>热门推荐</p>
                </div>
                <div class="section-main">
                   <ul>
                       <li v-for="item in artcommend">
                           <div class="artimg">
                               <img :src="item.artbanner" />
                           </div>
                           <div class="arttext">
                               <router-link :to="{path:'/article',query:{article:item.Id}}" >
                               {{item.arttitle}}
                               </router-link>
                                <span>{{item.createtime.split(" ")[0]}}</span>
                           </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


<!-- 加微信 -->
<div class="addweixin" v-if="showwx">
    <div class="weixinmian">
         <img :src="userinfo.wxewmimg" />
         <i class="iconfont close" @click="showwx=false" >&#xe602;</i>
    </div>
</div>

<share :userinfo="userinfo"></share>


</div>
</template>
<script>
import share from "@/components/share";
export default {
    data(){
        return{
          userinfo:"",
          userlink:"",
          userart:"",
          artcommend:"",
          showwx:false,
          idcardshow:true
        }
    },
    components:{
        share:share
    },
    methods:{
        back:function(){
            this.$router.push("/mypage");
        },
        getpageinfo:function(user){
            this.$axios({
                url: "/api/page/getpageinfo",
                method:"POST",
                data:{
                    user:user
                }
            }).then(
                (res)=>{
                    if(res.data.code==100){
                        this.userinfo=res.data.data.userinfo[0];
                        this.userlink=res.data.data.userlink;
                        this.userart=res.data.data.userart;
                        this.artcommend=res.data.data.artcommend
                    }
                },
                (err)=>{
                    console.log(err);
                }
            )
        }
    },
    created:function(){
        var user=this.$route.query.user;
        if(user==""||user==undefined||user==null){
            this.$router.push("/login");
        }else{
            this.getpageinfo(user);
        }
    },
    mounted:function(){
        
    }
}
</script>
<style scoped>
.moban{
    padding: 0 10px;
}
.companyname{
    font-size: 12px;
    line-height: 40px;
    color:#333;
}
.addweixin{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.3);
    z-index: 10;
}
.addweixin .weixinmian{
    width: 80%;
    height: auto;
    background: #ffffff;
    position: fixed;
    left: 10%;
    top:100px;
    border-radius: 5px;
}
.weixinmian img{
    display: block;
    width:80%;
    padding:5% 10%;
}
.close{
    display: block;
    width: 35px;
    height: 35px;
    margin: 0 auto;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 10px;
    color: #222;
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
    width: 30%;
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
    width: 65%;
    padding-left: 5%;
}
.arttext a{
    font-size: 14px;
    color: #333;
    line-height: 30px;
    display: block;
    width: 100%;
    height: 30px;
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
.share{
    width: 96%;
    height: 60px;
    border-top: #efefef solid 1px;
    box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0px;
    left: 0px;
    background: #ffffff;
    z-index: 200;
    padding: 0 2%;
}
.collect,.idcard-btn{
    width: 40px;
    height: 40px;
    margin: 10px 5px;
    border-radius: 50%;
    border:#c3c2c2 solid 1px;
    float: left;
    cursor: pointer;
}
.collect i,.idcard-btn i{
    display: block;
    width: 40px;
    color: #999;
    font-size: 24px;
    line-height: 40px;
    text-align: center;
}
.active .now{
    display: none;
}
.active{
    border: aqua solid 1px!important;
}
.active .end{
    display: block;
    color: aqua!important;
}
.updatetome{
    float: right;
    width: 60%;
    height: 60px;
}
.updatetome .updatebtn{
    width: 100%;
    height:40px;
    line-height: 40px;
    background: #2c9af9;
    color: #ffffff;
    text-align: center;
    border-radius: 4px;
    margin: 10px 0px;
    cursor: pointer;
}


</style>


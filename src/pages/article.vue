<template>
<div class="article">
    <div class="banner">
        <img :src="artdata.artbanner"/>
    </div>

    <div class="userinfo">
        <img :src="userinfo.headimg" class="userimg"/>
        <p class="name">{{userinfo.name}}</p>
        <p>{{userinfo.company}} <p>
        <p>{{userinfo.branch}} · {{userinfo.office}}</p>
    </div>
    <div class="artcon">
        <p class="arttit">{{artdata.arttitle}}</p>
        <p class="watchtime"><span>{{artdata.createtime}}</span> <span>阅读：{{artdata.browse}}</span></p>
        <div class="artmain">
            <div class="artitem" v-for="item in artdata.artcon">

                <div class="section text" v-if="item.type=='text'">
                    <p>{{item.data}}</p>
                </div>

                <div class="section image" v-if="item.type=='img'">
                   <div class="section imagegroup" v-for="images in item.data">
                       <img :src="images"/>
                   </div>
                </div>
                
                <div class="section video" v-if="item.type=='video'">
                   <div class="section video" v-for="videogroup in item.data">
                     <video :src="videogroup" controls="controls" class="video"></video>
                   </div>
                </div>
                
            </div>
        </div>
    </div>

<div class="idcard">
    <div class="userinfo">
        <img :src="userinfo.headimg" class="userimg"/>
        <p class="name">{{userinfo.name}}</p>
        <p>{{userinfo.company}} <p>
        <p>{{userinfo.branch}} · {{userinfo.office}}</p>
        <p>手机：{{userinfo.mobile}}</p>
        <p>微信：{{userinfo.wechat}}</p>
    </div>
</div>




    <div class="art-footer">
        <p class="mianze">文章部分内容来源于网络，如有侵权，请联系删除</p>
        <p class="bottom">
            <i></i>
            <span>已经到底了</span>
        </p>
    </div>

<div class="share">
    <div :class="collect?'collect active':'collect'" @click="collect=!collect">
        <i class="iconfont now">&#xe60c;</i>
        <i class="iconfont end">&#xe812;</i>
    </div>

    <div class="idcard-btn" @click="idcardshow=true">
        <i class="iconfont">&#xe61c;</i>
    </div>
    <div class="updatetome">
        <div class="updatebtn">
            <i class="iconfont">&#xe615;</i>
            修改成我的
        </div>
    </div>
</div>

<div class="idcard-ceng" v-if="idcardshow" v-cloak>
    <div class="ceng-main">
        <van-icon name="close" class="close" @click="idcardshow=false" />
        <div class="cenginfo">
            <img :src="userinfo.headimg" class="userimg"/>
            <p class="name">{{userinfo.name}}</p>
            <p class="company">{{userinfo.company}} <p>
            <p class="company">{{userinfo.branch}} · {{userinfo.office}}</p>
            <div class="lxinfo">
                <p><span>手机：</span>{{userinfo.mobile}}</p>
                <p><span>微信：</span>{{userinfo.wechat}}</p>
                <p><span>地址：</span>{{userinfo.address}}</p>
                <p><span>主要经营：</span>{{userinfo.operate}}</p>
            </div>
        </div>
        <div class="handle">
            <button>保存到我的通讯录</button>
        </div>
    </div>
</div>




</div>
</template>

<script>
export default {
  data() {
    return {
      collect:false,
      idcardshow:false,  
      articleid: "",
      artdata: "",
      userinfo: ""
    };
  },
  methods: {
    getarticle: function(articleid) {
      if (!articleid) {
        this.$toast("文章不存在");
        var vm=this;
        setTimeout(function(){
            vm.$router.push({
                path:"/myarticle"
            })
        },500)
        return;
      }
      this.$axios({
        url: "/api/article/getarticle",
        method: "POST",
        data: {
          Id: articleid
        }
      }).then(
        res => {
          if ((res.data.code = 100)) {
            let article = res.data.data.article;
            article.artcon = JSON.parse(article.artcon);
            article.createtime=article.createtime.split(" ")[0];
            this.artdata = article;
            this.userinfo = res.data.data.userinfo;
          } else {
            this.$toast(res.data.data);
          }
        },
        res => {
          console.log(res);
        }
      );
    }
  },
  mounted: function() {
    this.articleid = this.$route.query.article;
    this.getarticle(this.articleid);
  }
};
</script>

<style scoped>
.article {
  width: 100%;
  height: auto;
}
.banner {
  width: 100%;
  height: auto;
  min-height: 200px;
}
.banner img {
  display: block;
  width: 100%;
  height: auto;
}
.userinfo {
  width: 100%;
  height: auto;
  margin-top: -40px;
  padding-bottom: 10px;
  border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
}
.userinfo .userimg {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.userinfo .userimg img {
  width: 100%;
  height: 100%;
}
.userinfo p {
  text-align: center;
  font-size: 14px;
  line-height: 26px;
  color: #999;
}
.text p{
    font-size: 14px;
    line-height: 25px;
    text-indent: 2em;
}
.arttit{
    font-size: 20px;
    line-height: 40px;
    text-align: justify;
    margin: 5px 0px;
    font-weight: bold;
    color: #666;
}
.artcon{
    height: auto;
    margin: 0 10px;
    padding-bottom: 30px;
    margin-bottom: 20px;
    border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
}
.watchtime{
    text-align: right;
    line-height: 30px;
}
.watchtime span{
    font-size: 14px;
    margin-left: 20px;
}
.image img{
    width: 100%;
}
video{
    width: 100%;
}
.art-footer{
    margin-bottom: 80px;
}
.mianze{
    font-size: 12px;
    color: #c3c2c2;
    padding: 0 10px;
    line-height: 150%;
    text-align: center;
    margin-top: 10px;
}
.bottom{
    width: 100%;
    height:30px;
    position: relative;
    margin: 20px 0px;
}
.bottom i{
    display: block;
    width: 50%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 25%;
    top:14px;
}
.bottom span{
    display: block;
    background: #ffffff;
    font-size: 12px;
    color: #c3c2c2;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
}
.idcard{
    border:rgba(0, 0, 0, 0.1) solid 1px;
    margin: 10px;
    border-radius: 5px;
}
.idcard .userinfo{
    margin: 20px 0px;
    width: auto;
    border-bottom: none;
}
.name{
    font-size: 18px!important;
    line-height: 40px!important;
    color: #333!important;
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
.idcard-ceng{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    left: 0px;
    top:0px;
    z-index: 100;
}
.ceng-main{
    width: 80%;
    height:auto;
    position:fixed;
    left: 10%;
    background: #ffffff;
    border-radius: 5px;
    top: 10%;
}
.ceng-main .userinfo{
    margin: 10px 0px;
    border: none;
}
.handle{
    width: 100%;
    margin: 10px 0px;
}
.handle button{
    display:block;
    width: 150px;
    height:40px;
    border:none;
    background: #2c9af9;
    color: #ffffff;
    margin: 0 auto;
    border-radius: 3px;
}
.cenginfo{
    margin:20px 10px;
}
.cenginfo .userimg{
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0px auto;
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.cenginfo .name{
    font-size: 18px;
    line-height: 40px;
    color: #333;
    text-align: center;
}
.cenginfo .company{
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    color: #999;
}
.cenginfo .lxinfo{
    margin: 10px;
}
.cenginfo .lxinfo p{
    font-size: 14px;
    line-height: 24px;
    color: #666;
}
.cenginfo .lxinfo p span{
    display:inline-block;
    width: 5em;
    text-align:right;
    color: #333;
    font-weight: bold;
}
.close{
    display: block;
    font-size: 26px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    color: #666;
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
}
</style>

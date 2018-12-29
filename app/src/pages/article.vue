<template>
<div class="article">
    <div class="banner">
        <img :src="$HOST+artdata.artbanner" v-if="artdata.artbanner"/>
    </div>

    <div class="userinfo">
        <img :src="$HOST+userinfo.headimg" class="userimg"/>
        <p class="name">{{userinfo.name}}</p>
        <p>{{userinfo.company}} <p>
        <p>{{userinfo.branch}} · {{userinfo.office}}</p>
    </div>
    <div class="artcon">
        <p class="arttit">{{artdata.arttitle}}</p>
        <p class="watchtime"><span>{{artdata.createtime}}</span> <span>阅读：{{artdata.browse}}</span></p>
        <div class="artmain">
            <div class="artitem" v-for="item,index in artdata.artcon">

                <div class="section text" v-if="item.type=='text'">
                    <p>{{item.data}}</p>
                </div>

                <div class="section image" v-if="item.type=='img'">
                   <div class="section imagegroup" v-for="images in item.data">
                       <img :src="$HOST+images"/>
                   </div>
                </div>
                
                <div class="section video" v-if="item.type=='video'">
                   <div class="section video" v-for="videogroup in item.data">
                       <randvideo :src="$HOST+videogroup" :index="index"></randvideo>
                   </div>
                </div>
            </div>
        </div>
    </div>

<div class="idcard">
    <div class="userinfo">
        <img :src="$HOST+userinfo.headimg" class="userimg"/>
        <p class="name">{{userinfo.name}}</p>
        <p>{{userinfo.company}} <p>
        <p>{{userinfo.branch}} · {{userinfo.office}}</p>
        <p>手机：{{userinfo.mobile}}</p>
        <p>微信：{{userinfo.wechat}}</p>
        <p class="ewm" v-if="userinfo.wxewmimg!=''">
            <img :src="$HOST+userinfo.wxewmimg" />
        </p>
    </div>
</div>




    <div class="art-footer">
        <p class="mianze">文章部分内容来源于网络，如有侵权，请联系删除</p>
        <p class="bottom">
            <i></i>
            <span>已经到底了</span>
        </p>
    </div>



<share :userinfo="userinfo" :collectfun="true" :articleid="artdata.Id"></share>


</div>
</template>

<script>
import share from "@/components/share";
import randvideo from "@/components/randarticle/randvideo";
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
  components:{
    share:share,
    randvideo:randvideo
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
  min-height: 80px;
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
.ewm img{
    width: 150px;
    height: auto;
    margin-top: 20px;
}
</style>

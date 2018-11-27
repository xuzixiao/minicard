<template>
<div class="article">
        <van-nav-bar 
        :title=pagetitle 
        left-arrow
        @click-left="$router.go(-1)"
        />

<div class="art-mian">
  <van-row class="art-main-title">
    <van-col span="8">
        <p><van-icon name="idcard"/>文章列表</p>
    </van-col>
    <van-col span="16" style="text-align:right">
       <van-button  size="small" @click="writeart">写文章</van-button>
    </van-col>
  </van-row>

    <div v-cloak class="art-list" v-if="haveart" v-cloak>
        <div v-for="item,index in artlist" :key="index">
            <router-link :to="{path:'/article',query:{article:item.Id}}" class="art">
            <div class="art-img">
                <img :src="item.artbanner" />
            </div>
            <div class="art-info">
                <p class="tit">{{item.arttitle}}</p>
                <p class="date"><span>{{item.createtime.split(" ")[0]}}</span></p>
            </div>
            </router-link>
        </div>
    </div>

    <div v-cloak class="art-none" v-if="!haveart" v-cloak>
        <van-icon name="info-o"/>
        <p>暂无文章</p>
    </div>

</div>

</div>
</template>
<script>
export default {
    data(){
        return{
            pagetitle:"",
            categoryid:"",
            artlist:[]
        }
    },
    computed:{
        haveart:function(){
            if(this.artlist.length==0){
                return false
            }else{
                return true
            }
        }
    },
    created:function(){
        this.pagetitle=this.$route.query.categoryname;
        this.categoryid=this.$route.query.categoryid;
        if(this.$route.query.categoryid){
            this.getartlist(this.$route.query.categoryid);
        }
    },
    methods:{
        getartlist:function(categoryid){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:"/api/article/getartlist",
                method:"POST",
                data:{
                    user:user,
                    categoryid:categoryid
                }
            }).then((res)=>{
                if(res.data.code==100){
                    if(res.data.data.length==0){
                        this.artlist=[]
                    }else{
                        this.artlist=res.data.data;
                    }
                }else{
                     this.$toast(res.data.data);
                }
            },(res)=>{
                console.log("====获取文章列表失败====");
            })
        },
        writeart:function(){
            this.$router.push({
                path:"/writing",
                query:{
                    categoryid:this.categoryid
                }
            })
        }
    }    
}
</script>

<style scoped>
[v-cloak]{
  display: none!important;
}
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
.navlist{
    background: #50b7c1;
    padding: 10px 0px;
    border-radius: 4px;
    margin-bottom: 10px;
}
.navlist i{
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 30px;
    margin: 0px auto;
}
.navlist p{
    text-align: center;
    color:#ffffff;
    font-size: 14px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
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
.art{
    width: 100%;
    height: 80px;
    border-bottom: #eee dashed 1px;
    display: flex;
}
.art-img{
    width: 30%;
    height: 80px;
    display: flex;
    align-items: center;
}
.art-img img{
    width: 100%;
    height: auto;
}
.art-info{
    margin-left: 4%;
    width: 66%;
}
.art-info p{
    font-size: 14px;
    color: #666;
}
.tit{
    height: 50px;
    line-height: 25px;
    overflow: height;
    text-overflow:ellipsis;
}
.date{
    text-align: right;
    line-height: 20px;
}
</style>

<template>
<div class="article">
    <van-nav-bar 
        :title=pagetitle 
        left-text="返回"
        left-arrow
        @click-left="back"
        />
    <div v-cloak class="art-list" v-if="haveart" v-cloak>
        <div v-for="item,index in artlist" :key="index">
            <router-link target="_blank" :to="{path:'/article',query:{article:item.Id}}" class="art">
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
</template>
<script>
export default {
    data(){
        return{
            pagetitle:"我的收藏",
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
    methods:{
        back:function(){
            this.$router.push("/home");
        },
        getcollect:function(){
            if(!this.$cookie.getCookie("loginstate")){
                this.$toast("您还未登录,请登录后操作");
                setTimeout(() => {
                    window.location.href="/login"
                }, 800);
                return;
            }
            var user= JSON.parse(this.$cookie.getCookie("loginstate")).user;
            this.$axios({
                url:"/api/article/getcollect",
                method:"POST",
                data:{
                    user:user
                }
            }).then((res)=>{
                if(res.data.code==100){
                    for(let i=0;i<res.data.data.length;i++){
                        if(res.data.data[i]!=null){
                            this.artlist.push(res.data.data[i]);
                        }
                    }
                }
            },(err)=>{
                console.log(err);
            })

        }
    },
    mounted:function(){
      this.getcollect();  
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
    margin: 10px;
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
    height: 100px;
    border-bottom: #eee dashed 1px;
    display: flex;
    padding: 10px 0px;
}
.art-img{
    width: 150px;
    height: 80px;
    display: flex;
    align-items: center;
    overflow: hidden;
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


<template>
<div class="article">
        <van-nav-bar 
        title="文章列表" 
        left-arrow
        fixed='true'
        @click-left="$router.push('/myarticle')"
        />

<div class="art-mian">
    <div v-cloak class="art-list" v-if="haveart" v-cloak>
        <div v-for="item,index in artlist" :key="index">
            <div class="art">
                <div class="art-img">
                    <router-link target="_blank" :to="{path:'/companyarticle',query:{article:item.Id}}">
                    <img :src="$File_Path+item.artlogo" />
                    </router-link>
                </div>
                <div class="art-info">
                    <router-link target="_blank" :to="{path:'/companyarticle',query:{article:item.Id}}">
                    <p class="tit">{{item.title}}</p>
                    <p class="date"><span>{{item.createtime}}</span></p>
                    </router-link>
                    <p class="arthand">
                        <router-link :to="{path:'/updatearticle',query:{articleid:item.Id}}" class="arthandbtn">修改文章</router-link>
                    </p>
                </div>
            </div>
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
        this.getartlist();
    },
    methods:{
        getartlist:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:this.$File_Path+"/getcompanyarticle",
                method:"POST",
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
        }
    }    
}
</script>

<style scoped>
[v-cloak]{
  display: none!important;
}
.art-mian{
    padding: 46px 10px;
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
    height: auto;
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
    overflow:hidden;
    text-overflow:ellipsis;
}
.date{
    text-align: right;
    line-height: 20px;
}
.arthand{
    display: flex;
    justify-content:flex-end;
}
.arthand .arthandbtn{
    background: #50b7c1;
    color: #ffffff;
    border: none;
    margin: 5px;
    padding: 5px;
    border-radius: 4px;
    line-height: 20px;
}
</style>

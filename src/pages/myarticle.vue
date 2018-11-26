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
    <van-col span="8">
        <p><van-icon name="idcard" />文章分类</p>
    </van-col>
    <van-col span="16" style="text-align:right">
        <van-button  size="small"  @click="show=true">添加分类</van-button>
       <router-link to="/writing"><van-button  size="small">写文章</van-button></router-link>
    </van-col>
  </van-row>

    <div v-cloak class="art-list"  v-if="havecategory">
        <van-row gutter='10'>
            <van-col span="8" v-for="(item,index) in category" :key="index">
                <div class="navlist" @click="choosecategory(item.id,item.categoryname)">
                    <van-icon name="tosend" />
                    <p>{{item.categoryname}}</p>
                </div>
            </van-col>
        </van-row>
    </div>

    <div v-cloak class="art-none" v-if="!havecategory">
        <van-icon name="info-o"/>
        <p>暂无分类</p>
    </div>
</div>


<van-popup v-model="show" class="alertbox">
    <div>
        <p>
            <span>添加分类</span>
            <van-icon name="close" @click="show=false" />    
        </p>
        <van-field v-model="categoryname" label="分类名称" placeholder="请输入分类名称" />
        <van-button size="large" class="savecard" @click="setcategory">添加分类</van-button>
    </div>
</van-popup>



</div>

</template>
<script>
export default {
    data(){
        return{
            pagetitle:"我的文章",
            show:false,
            categoryname:"",//分类名称
            category:[],
        }
    },
    computed:{
        havecategory:function(){
            if(this.category.length==0){
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
        getcategory:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:"/api/article/getcategory",
                method:"POST",
                data:{
                    username:user
                }
            }).then((res)=>{
                if(res.data.code==100){
                    if(res.data.data.length==0){
                        this.category=[]
                    }else{
                        this.category=res.data.data;
                    }
                }else{
                     this.$toast(res.data.data);
                }
            },(res)=>{
                console.log("====获取文章分类失败====");
            })
        },
        setcategory:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:"/api/article/setcategory",
                method:"POST",
                data:{
                    categoryname:this.categoryname,
                    userid:user
                }
            }).then(
                (res)=>{
                    if(res.data.code==0){
                        this.$toast(res.data.data);
                    }else{
                        this.$toast("添加成功");
                        var vm=this;
                        setTimeout(()=>{
                            vm.show=false;
                            vm.categoryname="";
                            vm.getcategory();
                        },600)
                    }
                },
                (res)=>{
                    this.$toast("添加分类失败");
                }
            )
        },
        choosecategory:function(id,categoryname){//选择此分类
            this.$router.push({
                path:"/artcategory",
                query:{
                    categoryid:id,
                    categoryname:categoryname
                }
            })
        }
    },
    created:function(){
        this.getcategory();
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
</style>


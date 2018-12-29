<template>
    <div class="main">
        <van-nav-bar 
        title="发布文章" 
        left-text=""
        left-arrow
        @click-left="$router.push('/myarticle')"
        fixed='true'
        z-index=1000
        />

        <div class="box">
            
            <div class="uploadbgimg">
                <img :src="$HOST+artbanner"  v-if="hasbannerimg" class="ban_img" />
                <div class="text" v-if="!hasbannerimg" @click="addartbanner"><van-icon name="photo" class="texticon" />上传封面图片</div>
                <!-- <van-uploader :after-read="uploadheadimg" accept="image/gif, image/jpeg"  class="choosefile"></van-uploader> -->
                <span class="closeimg" v-if="hasbannerimg" @click="delfmimg">
                    <van-icon name="close" />
                </span>
            </div>

            <div class="line">
                <div class="line-label"><span>文章类别</span></div>
                <div class="line-main">
                    <van-field :value="categoryname" placeholder="请选择文章类别" readonly  class="input" @click="chooseartfl=true" />
                </div>
            </div>

            <div class="line">
                <div class="line-label"><span>文章标题</span></div>
                <div class="line-main">
                    <van-field v-model="articletit" type="textarea" autosize class="input" />
                </div>
            </div>

            <div class="line tuijian">
                <div class="line-label"><span>是否设为推荐</span></div>
                <div class="line-main">
                    <van-switch v-model="tuijian"  size="20px"/>
                </div>
            </div>
            
            <div class="line">
                <div class="line-label"><span>文章内容</span></div>
                <div class="line-main articlemain">
                  
                  <Created-Aritle ref="article"></Created-Aritle>

                </div>
            </div>
            <van-button size="large" class="savecard" @click="saveart">保存文章</van-button>
        </div>


    <van-actionsheet v-model="chooseartfl" title="请选择文章分类">
        <ul class="artflbox">
            <li v-for="item in category" :key="item.id" @click="findthisfl(item.id)" >
                {{item.categoryname}}
            </li>
        </ul>
    </van-actionsheet>

    </div>
</template>
<script>
import CreatedAritle from '@/components/creatarticle'
export default {
    data(){
        return{
            artbanner:"",
            articletit:"",
            tuijian:false,
            chooseartfl:false,
            categoryid:"",
            category:"",//文章分类
            fengmian:false,
        }
    },
    computed:{
        hasbannerimg:function(){
            if(this.artbanner==""){
                return false
            }else{
                return true
            }
        },
        categoryname:function(){
            for(let i=0;i<this.category.length;i++){
                if(this.category[i].id==this.categoryid){
                    return this.category[i].categoryname
                }
            }
        }
    },
    components:{
        "Created-Aritle":CreatedAritle
    },
    methods:{
        uploadheadimg:function(e){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:"/api/upload/articleimg",
                method:"POST",
                data:{
                    image:e,
                    user:user
                }
            }).then(
                (res)=>{
                    if(res.data.code==100){
                        this.artbanner=res.data.data
                    }else{
                        if(res.data.code==50){
                            var vm=this;
                            setTimeout(()=>{
                                vm.$router.push("/login");
                            },800)
                        }
                    }
                },
                (res)=>{
                    console.log(res);        
                }
            )
        },
        getcategory:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
                return;
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
                        this.$toast('您还没有创建文章分类,创建分类后才能写文章哦~');
                       var vm=this;
                       setTimeout(function(){
                           vm.$router.go(-1);
                       },1000)
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
        delfmimg:function(){
            this.artbanner="";
        },
        findthisfl:function(categoryid){
            this.categoryid=categoryid;
            this.chooseartfl=false;
        },
        saveart:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            let bannerimg=this.artbanner;//文章头图
            let categoryid=this.categoryid;//文章分类
            let arttitle=this.articletit;//文章标题
            let tuijian=this.tuijian;//文章推荐
            if(tuijian){
                tuijian=1;
            }else{
                tuijian=0;
            }
            let artcon=this.$refs.article.articlecon//文章内容
            if(categoryid==""){
                this.$toast("请选择文章所属分类");
                return;
            }
            if(arttitle==""){
                 this.$toast("文章标题不能为空");
                 return;
            }
            if(artcon.length==0){
                 this.$toast("您的文章内容不能为空");
                 return;
            }
            //文章内容为string
            artcon=JSON.stringify(artcon);
            this.$axios({
                url:"/api/article/savearticle",
                method:"POST",
                data:{
                    user:user,
                    artbanner:bannerimg,
                    artcategoryid:categoryid,
                    arttitle:arttitle,
                    tuijian:tuijian,
                    artcon:artcon
                }
            }).then(
                (res)=>{
                    if(res.data.code==100){
                       this.$toast("保存成功");
                       var that=this;
                       setTimeout(function(){
                        that.$router.go(-1);    
                       },500)
                    }
                },
                (res)=>{
                    console.log(res);
                }
            )
        },
        addartbanner:function(){
            this.$store.commit('showphoto');
            this.fengmian=true;
        }
    },
    created:function(){
        if(this.$route.query.categoryid){
            this.categoryid=this.$route.query.categoryid;
        }
        this.getcategory();
    },
    mounted:function(){

    },
    beforeRouteLeave:function(to,from,next){
        if(this.$store.state.textedit||this.$store.state.photoedit||this.$store.state.videoedit){
            this.$store.commit("hidetextedit");
            this.$store.commit("hidephoto");
            this.$store.commit("hidevideo");
        }else{
            next();
        }
    }
}
</script>

<style scoped>
.main{
    width: 100%;
    margin-top: 46px; 
}
.box{
    padding: 10px 15px;
}
.userheadimg{
    border-bottom: #eee solid 0px;
    padding-bottom: 10px;
}
.userheadimg img{
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.userheadimg p{
    font-size: 14px;
    color: #333;
    line-height: 80px;
    margin: 0px;
    padding-left: 15px;
}
.updateimgbtn{
    margin-top: 30px; 
}
.savecard{
    background: #6da0ed;
    color: #ffffff;
    border:none;
    border-radius:5px;
    margin: 20px auto 40px;
}
.line{
    width: 100%;
    height: auto;
}
.line-label{
    width: 100%;
    height:40px;
    line-height: 40px;
}
.line-label span{
    color: #333;
    font-size: 14px;
}
.line-main .input{
    border:#ececec solid 0.5px;
    border-radius: 3px;
}
.bgimg{
display: flex;
flex-wrap: wrap;
}
.bgimg img{
    width: 50%;
    height: 100px;
}
.bgimg button{
    width: 30%;
    height: 30px;
    background: #6da0ed;
    color: #fff;
    border:none;
    border-radius: 5px;
    margin: 10%;
}
.uploadbgimg{
    width: 100%;
    height: auto;
    border-radius: 5px;
    min-height: 150px;
    border: #d5d5d5 dashed 1px; 
    position: relative;
}
.uploadbgimg .text{
    position: absolute;
    width: 100%;
    height: 40px;
    line-height: 40px;
    top: 45%;
    text-align: center;
    font-size: 14px;
    color: #d5d5d5;
    line-height: 30px;
}
.uploadbgimg .texticon{
    margin-right: 10px;
}

.tuijian {
    height: 40px;
}
.tuijian .line-label{
    width: 60%;
    float: left;
}
.tuijian .line-main{
    width: 40%;
    float: left;
    height: 20px;
    text-align: right;
    margin-top: 10px;
}
.uploadimg{
    position:absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
}
.choosefile{
    position:absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 11;
}
.artflbox li{
    padding:0 20px;
    line-height: 50px;
    color: #333;
    font-size: 14px;
}
.articlemain{
    border: #ebebeb dashed 1px;
    padding:10px 10px 30px;
    border-radius: 5px;
}
.closeimg{
    width: 25px;
    height: 25px;
    position:absolute;
    top: 10px;
    right: 10px;
    background: #fff;
    border-radius: 50%;
    z-index: 500;
    box-shadow: 0 0 5px rgba(0, 0, 0,.1);
    cursor: pointer;
    text-align: center;
}
.closeimg i{
    display: block;
    width: 25px;
    height: 25px;
    font-size: 20px;
    color: #666;
    text-align: center;
    line-height: 25px;
}
.ban_img{
    width: 100%;
    height: auto;
}
</style>

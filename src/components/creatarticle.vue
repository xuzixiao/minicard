<template>
    <div class="createart">
        <div class="daoyu" v-if='!haveart'>
            <h4>开始创作吧</h4>
            <p>支持图文视频</p>
        </div>
    <addmodule :index="0" @addmoduleindex='addmoduleindex' ></addmodule>
    <div v-for="item,index in articlecon" :key='index' class="section">
        <div ><van-icon name="close" /></div>
        <div class="section-text" v-if="item.type=='text'" @click="updateart(index)">
            <randtext>{{item.data}}</randtext>
        </div>
        <div class="section-img"  v-if="item.type=='img'" @click="updateart(index)">
            <randimg>{{item.data}}</randimg>
        </div>
        <div class="section-video" v-if="item.type=='video'" @click="updateart(index)">
            <randvideo>{{item.data}}</randvideo>
        </div>
        <addmodule :index='index+1' @addmoduleindex='addmoduleindex'></addmodule>
    </div>
<!-- 添加文字段落窗口-->
    <van-popup v-model="$store.state.textedit" position="left" class="edittext">
        <div class="edittext">
            <div class="edittit">
                <span @click="$store.commit('hidetextedit'),textinfo=''">取消</span>
                <span @click="edittext">确认</span>
            </div>
            <div class="editmain">
                <textarea v-model="textinfo"  class="messagetext" cols="30" rows="5"></textarea>
            </div>
        </div>
    </van-popup>
<!-- 添加图片窗口-->
    <van-popup v-model="$store.state.photoedit" position="left" class="edittext">
        <div class="edittext">
            <div class="edittit">
                <span @click="$store.commit('hidephoto')">取消</span>
                <span @click="editimg">确认</span>
            </div>
            <div class="editmain">
                <div class="imggroup">
                    
                    <div class="img-single" v-for="item,index in imagesgroup" @click="toggle(index)">
                        <img :src="item.image">
                        <van-checkbox shape="square" v-model="item.checked" class="img-check" ref="imgcheckbox" />
                    </div>

                    <div class="img-single">                        
                        <van-uploader :after-read="uploadimg" accept="image/gif, image/jpeg" multiple class="uploadbtn">
                            <van-icon name="add-o" class="addicon" />
                        </van-uploader>
                    </div>
                   

                </div>
            </div>
        </div>
    </van-popup>






    </div>
</template>

<script>
import randtext from "@/components/randarticle/randtext";
import randimg from "@/components/randarticle/randimg";
import randvideo from "@/components/randarticle/randvideo";
import addmodule from "@/components/randarticle/addmodule";
export default {
    data(){
        return{
            checkstate:true,
            artaddnowindex:"",//段落添加当前位置
            textinfo:"",
            updatetext:{//修改模式
                state:false,
                index:0
            },
            articlecon:[],
            imagesgroup:[]
        }
    },
    computed:{
        haveart:function(){
            if(this.articlecon.length==0){
                return false;
            }else{
                return true;
            }
        }
    },
    components:{
        randtext,
        randimg,
        randvideo,
        addmodule
    },
    methods:{
        opentext:function(){
            console.log(this);
            this.$store.commit("showtextedit");
        },
        //文字段落存储
        edittext:function(){
            var insertindex=this.artaddnowindex;//获取当前添加的位置索引
            if(this.updatetext.state){
                //如果是修改
                let index=this.updatetext.index;//获取所点击文字的索引
                this.articlecon[index].data=this.textinfo;
            }else{
                //如果是添加
                let textcon={
                    type:"text",
                    data:this.textinfo
                }
                this.articlecon.splice(insertindex,0,textcon);//指定位置插入数据
                //this.articlecon.push(textcon);
            }
            this.textinfo="";
            this.$store.commit("hidetextedit");
            this.updatetext.state=false;//还原修改状态
            this.updatetext.index=0;//还原修改状态
        },
        //文章段落修改
        updateart:function(index){
            if(this.articlecon[index].type=="text"){
                this.textinfo=this.articlecon[index].data;
                this.updatetext.state=true;
                this.updatetext.index=index;
                this.$store.commit('showtextedit');
            }
        },
        //图片存储
        editimg:function(){
            this.$store.commit("hidephoto");
            //筛选出选中的图片
            var newimgarr=[];
            var imagesgroup=this.imagesgroup;
            for(let i=0;i<imagesgroup.length;i++){
                if(imagesgroup[i].checked){
                    newimgarr.push(imagesgroup[i].image);
                }
            }
            console.log(newimgarr);
        },
        //获取添加位置
        addmoduleindex:function(addmoduleindex){
            this.artaddnowindex=addmoduleindex;
        },
        //上传图片
        uploadimg:function(e){
            console.log(e);
            this.$axios({
                url:"/api/upload/articleimg",
                method:"POST",
                data:e
            }).then((res)=>{
                    if(res.data.code==100){
                        this.imagesgroup.push({image:res.data.data,checked:false});
                        console.log(this.imagesgroup);
                    }else{
                        this.$toast(res.data.data);
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
        //获取用户图片库
        getimage:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:"/api/upload/getimagegroup",
                method:"POST",
                data:{
                    user:user
                }
            }).then((res)=>{
               if(res.data.code==100){
                   for(let i=0;i<res.data.data.length;i++){
                       res.data.data[i].checked=false;
                       this.imagesgroup.push(res.data.data[i])     
                   }
                }
            },(res)=>{
                console.log(res);
            })
        },
        toggle:function(index){
            console.log(index);
            this.$refs.imgcheckbox[index].toggle();
            //imgcheckbox
        }
    },
    created:function(){
       this.getimage();
    }
}
</script>

<style>
.daoyu{
    text-align: center
}
.daoyu h4{
    font-size: 16px;
    font-weight: normal;
    font-family:fantasy;
    color:grey;
    line-height: 30px;
    margin: 0px;
}
.daoyu p{
    font-size: 12px;
    line-height: 20px;
    color: gray;
        font-family:fantasy;
}
.addarticlemodule .addmodule{
    width: 150px;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    padding:3px 5px 0px;
    border-radius:100px;
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    margin-left: -75px;
    top: 0px; 
    transform: scale(0);
    opacity: 0;
    transition: all 0.2s;
}
.addmodule .module{
    width: 40px;
    height: 40px;
    padding: 0 2px;
}
.addmodule .module i{
    display: block;
    width: 40px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    color:dodgerblue;
    text-align: center;
    font-weight: bold;
}
.addmodule .module span{
    display: block;
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 12px;
    color: #333;
    line-height: 20px;
}
.addbtn{
    font-size: 22px;
    color:#6da0ed;
    display:block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.3);
}
.addarticlemodule{
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    position: relative;
    z-index: 1000;
}
.addarticlemodule:hover .addmodule{
    transform:scale(1);
    top: 35px;
    opacity: 1;
}
.edittext{
    width: 100%;
    height: auto;
}
.edittext .edittit{
    width: 90%;
    padding:0 5%;
    height: 40px;
    background: #fff;
    border-bottom:#eeeeee solid 1px;
    display: flex;
    justify-content: space-between;
    position:fixed;
    top: 0px;
    left: 0px;
}
.edittit span{
    line-height: 40px;
    color: #6da0ed;
    font-size: 14px;
    cursor: pointer;
}
.editmain{
    width: 100%;
    margin-top: 45px;
    float: left;
}
.messagetext{
    border:#eeeeee solid 1px;
    width: 90%;
    padding:0px 2%;
    margin: 10px 3%;
    line-height: 30px;
    color: #333;
    font-size: 14px;
    height: 150px!important;
    text-align:justify;
    border-radius: 5px;
    resize: none;
    outline: none;
    overflow-y: scroll;
}
.edittext{
    width: 100%;
    height: 100%;
}
.section{
    padding-top: 10px;
}
/* 图片选择上传 */
.imggroup{
    width: 100%;
    height:auto;
    display: flex;
    flex-wrap: wrap;
}
.img-single{
    width: 33.33%;
    height:100px;
    position: relative;
    box-sizing: border-box;
    border: #eeeeee solid 0.5px;
    display: flex;
    align-items: center;
}
.imggroup .img-single:nth-child(3n){
    margin-right: 0px;
}
.img-single img{
    width: 100%;
    height: auto;
}
.img-single .img-check{
    position: absolute;
    right: 10px;
    top: 10px;
}
.img-single .img-check div{
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
    width: 20px;
    height: 20px;
}
.addicon{
    display: block;
    width: 100%;
    font-size: 60px;
    color: #dfdfdf;
    line-height: 100px;
    text-align: center;
}
.uploadbtn{
    width: 100%;
    height: 100%;
}
</style>

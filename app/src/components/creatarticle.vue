<template>
    <div class="createart">
        <div class="daoyu" v-if='!haveart'>
            <h4>开始创作吧</h4>
            <p>支持图文视频</p>
        </div>
    <addmodule :index="0" @addmoduleindex='addmoduleindex' ></addmodule>
<!-- 渲染 -->
    <div v-for="item,index in articlecon" :key='index' class="section">
        <!-- 文字渲染 -->
        <div class="renderline" v-if="item.type=='text'">
            <div class="line-handle">
                <div class="line-edit"  @click="updateart(index)"><van-icon name="edit" /></div>
                <div class="line-del" @click="del(index)"><van-icon name="close" /></div>
            </div>
            <div class="section-text">
                <randtext>{{item.data}}</randtext>
            </div>
        </div>
        <!-- 图片渲染 -->
        <div class="renderline" v-if="item.type=='img'">
            <div class="section-img"  v-for="imggroup,imgindex in item.data" :key="imgindex">
                <div class="line-img">
                    <div class="line-del"  @click="del(index+','+imgindex)"><van-icon name="close" /></div>
                    <img :src="$HOST+imggroup" />
                </div>
            </div> 
        </div>

         <!-- 视频渲染 -->
        <div class="renderline" v-if="item.type=='video'">
            <div class="section-img"  v-for="videogroup,videoindex in item.data" :key="videoindex">
                <div class="line-img">
                    <div class="line-del" @click="del(index+','+videoindex)"><van-icon name="close" /></div>
                    <randvideo :src="$HOST+videogroup" :index="index"></randvideo>
                </div>
            </div> 
        </div>

        <addmodule :index='index+1' @addmoduleindex='addmoduleindex'></addmodule>
    </div>
<!-- 添加文字段落窗口-->
    <!-- <van-popup v-model="$store.state.textedit" position="left" class="edittext"> -->
        <div class="edittext-main" v-if="$store.state.textedit">
            <div class="edittit">
                <span @click="$store.commit('hidetextedit'),textinfo=''">取消</span>
                <span>编辑文字</span>
                <span @click="edittext">确认</span>
            </div>
            <div class="editmain">
                <textarea v-model="textinfo"  class="messagetext" cols="30" rows="5"></textarea>
            </div>
        </div>

        <div class="edittext-main" v-if="$store.state.photoedit">
            <div class="edittit">
                <span @click="cloeditimg">取消</span>
                <span>选择图片</span>
                <span @click="editimg">确认</span>
            </div>
            <div class="editmain">
                <div class="imggroup">
                    <div class="img-single" v-for="item,index in imagesgroup" @click="toggle(index)">
                        <img :src="$HOST+item.image">
                        <van-checkbox shape="square" v-model="item.checked" class="img-check" ref="imgcheckbox" />
                    </div>
                    <div class="img-single">
                        <van-uploader :after-read="uploadimg" :oversize="outsize" accept="image/*" class="uploadbtn">  <!-- multiple 加入后可多张上传,接口问题暂停使用 -->
                            <van-icon name="add-o" class="addicon" />
                        </van-uploader>
                    </div>
                </div>
            </div>
        </div>
    <!-- </van-popup> -->
<!-- 上传视频-->
    <!-- <van-popup v-model="$store.state.videoedit" position="left" class="edittext"> -->
        <div class="edittext-main" v-if="$store.state.videoedit">
            <div class="edittit">
                <span @click="cloeditvideo">取消</span>
                <span>选择视频</span>
                <span @click="editvideo">确认</span>
            </div>
            <div class="editmain">
                <div class="imggroup">
                    <div class="img-single videolist" v-for="item,index in videosgroup" @click="togglevideo(index)">
                        <img :src="$HOST+item.videologo">
                        <van-checkbox shape="square" v-model="item.checked" class="img-check" ref="videocheckbox" />
                    </div>
                    <div class="img-single addvideo">                        
                        <van-uploader :after-read="uploadvideo" accept="video/mp4" class="uploadbtn" id="uploadvideo" :max-size=videomaxsize :oversize="outsize" ref="uploadvideo" >  <!-- multiple 加入后可多条上传,接口问题暂停使用 -->
                            <!-- 视频控制在30mb之内 -->
                            <van-icon name="add-o" class="addicon" />
                            <span class="maxsizetip">30M内的视频</span>
                        </van-uploader>
                    </div>
                </div>
            </div>
        </div>
        <div class="videocutimg">
            <video controls="controls" :src="videocutpath" id="cutimgvideo" autoplay ref="cutimgvideo"></video>
        </div>
    </div>
    <!-- </van-popup> -->
</template>

<script>
import randtext from "@/components/randarticle/randtext";
import randimg from "@/components/randarticle/randimg";
import randvideo from "@/components/randarticle/randvideo";
import addmodule from "@/components/randarticle/addmodule";
export default {
    data(){
        return{
            videomaxsize:31457280,
            checkstate:true,
            artaddnowindex:"",//段落添加当前位置
            textinfo:"",
            updatetext:{//修改模式
                state:false,
                index:0
            },
            videocutpath:"",
            videoimgs:"",
            articlecon:[],
            imagesgroup:[],//图片存放处
            videosgroup:[]//视频存放处
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
            if(this.$parent.fengmian){
                //上传封面图
                if(newimgarr.length>1){
                    this.$toast("请选择一张图片");
                    return;
                }else{
                    if(newimgarr[0]==undefined||newimgarr[0]==""){
                        this.$toast("请选择一张图片");
                        return;
                    }
                    this.$parent.artbanner=newimgarr[0]
                    this.$parent.fengmian=false;
                }
            }else{
                let nowindex=this.artaddnowindex;
                let imagegroup={
                        type:"img",
                        data:newimgarr
                    }
                this.articlecon.splice(nowindex,0,imagegroup);
            }
            this.imagesgroup.forEach((e)=>e.checked=false);
        },
        //获取添加位置
        addmoduleindex:function(addmoduleindex){
            this.artaddnowindex=addmoduleindex;
        },
        //上传图片
        uploadimg:function(e){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            var uploadtip=this.$toast.loading({mask: true,message: '上传中'});
            this.$axios({
                url:"/api/upload/articleimg",
                method:"POST",
                data:{
                    image:e,
                    user:user
                }
            }).then((res)=>{
                    uploadtip.clear();
                    if(res.data.code==100){
                        this.imagesgroup.push({image:res.data.data,checked:false});
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
                    uploadtip.clear();
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
        //图片多选
        toggle:function(index){
            this.$refs.imgcheckbox[index].toggle();
        },
        //视频多选
        togglevideo:function(index){
            this.$refs.videocheckbox[index].toggle();
        },
        //关闭图片弹窗
        cloeditimg:function(){
            this.$store.commit('hidephoto');
            this.imagesgroup.forEach((e)=>e.checked=false);
        },
        del:function(index){//删除
            if(typeof(index)=="number"){//如果传过来一个值
                this.articlecon.splice(index,1);                
            }else{
                let index1=index.split(",")[0];
                let index2=index.split(",")[1];
                this.articlecon[index1].data.splice(index2,1);
                if(this.articlecon[index1].data.length==0){
                    this.articlecon.splice(index1,1);
                }
            }
        },
        //视频
        outsize:function(e){
            console.log("视频大小已经达到上限");
            this.$toast("视频大小已经达到上限");
        },
        cloeditvideo:function(){//关闭视频上传弹窗
            this.$store.commit("hidevideo");
        },
        editvideo:function(){ //选择视频后按钮
            this.$store.commit("hidevideo");
            //筛选出选中的视频
            var newvideo=[];
            var videosgroup=this.videosgroup;
            for(let i=0;i<videosgroup.length;i++){
                if(videosgroup[i].checked){
                    newvideo.push(videosgroup[i].video);
                }
            }
            let nowindex=this.artaddnowindex;
            let videogroup={
                    type:"video",
                    data:newvideo
                }
            this.articlecon.splice(nowindex,0,videogroup);
            this.videosgroup.forEach((e)=>e.checked=false);
        },
    uploadvideo:function(e){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            const loadupload=this.$toast.loading({
                mask: true,
                message: '视频上传中',
            });

            //视频内截图
            var file=this.$refs.uploadvideo.$refs.input.files[0];
            var windowURL=window.URL || window.webkitURL;
            var path=window.URL.createObjectURL(file);
            this.videocutpath=path;
            var _that=this;
            setTimeout(function(){
                var video = _that.$refs.cutimgvideo;
                video.play();
                var scale = 0.25,
                    canvas = document.createElement("canvas"),
                    canvasFill = canvas.getContext('2d');
                canvas.width = video.videoWidth * scale;
                canvas.height = video.videoHeight * scale;
                canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);
                var videologo = canvas.toDataURL("image/jpeg");
                _that.videocutpath="";
                //上次视频和视频缩略图
                _that.$axios({
                    url:"/api/upload/video",
                    method:"POST",
                    data:{
                        user:user,
                        video:e,
                        videologo:videologo
                    }
                }).then((res)=>{
                        loadupload.clear();
                        if(res.data.code==100){
                            _that.getvideogroup();
                            //_that.videosgroup.push({video:res.data.data,checked:false});
                        }else{
                            _that.$toast(res.data.data);
                            if(res.data.code==50){
                                setTimeout(()=>{
                                    _that.$router.push("/login");
                                },800)
                            }
                        }
                    },
                    (res)=>{
                        loadupload.clear();
                        console.log(res);
                    }
                )
            },1000)
        },
        //获取用户所有视频
        getvideogroup:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:"/api/upload/getvideogroup",
                method:"POST",
                data:{
                    user:user
                }
            }).then(
                (res)=>{
                    if(res.data.code==100){
                        //this.videosgroup=res.data.data
                    var videolist=[];
                    for(let i=0;i<res.data.data.length;i++){
                       res.data.data[i].checked=false;
                       videolist.push(res.data.data[i])     
                    }
                    this.videosgroup=videolist;
                    }else{
                        console.log(res.data);
                    }
                },(res)=>{
                    console.log(res);
                }
            )
        }
    },
    created:function(){
       this.getimage();
       this.getvideogroup();
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
   
    display:block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.3);
}
.addbtn i{
    font-size: 25px!important;
    color:#6da0ed;
    line-height: 30px;
}
.addarticlemodule{
    display: block;
    width: 30px;
    height: 30px;
    margin:10px auto 0px;
    position: relative;
    z-index: 100;
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
.edittit{
    width: 90%;
    padding:0 5%;
    height: 46px;
    background: #fff;
    border-bottom:#eeeeee solid 1px;
    display: flex;
    justify-content: space-between;
    position:fixed;
    top: 0px;
    left: 0px;
    z-index: 99999;
}
.edittit span{
    line-height: 46px;
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
    position: relative;
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
    margin-bottom: 20px;
}
.img-single{
    width: 33.33%;
    height:120px;
    position: relative;
    box-sizing: border-box;
    border: #eeeeee solid 0.5px;
    display: flex;
    align-items: center;
    overflow:hidden;
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
    font-size: 60px!important;
    color: #dfdfdf;
    line-height: 120px!important;
    text-align: center;
}
.uploadbtn{
    width: 100%;
    height: 100%;
}
.section-img img{
    width: 100%;
}
.renderline{
 margin: 0px;
 padding: 5px;
 border: #999 dashed 1px;
 border-radius: 10px;
 position: relative;
}
.line-handle{
    display: flex;
    justify-content:flex-end;
}
.line-handle i{
    font-size: 20px;
    margin-left: 10px;
    color: #999;
}
.line-img{
    position: relative;
}
.line-img .line-del{
    font-size: 20px;
    color: #999;
    width: 20px;
    line-height: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    right:5px;
    top:5px;
    z-index: 1000;
}
.maxsizetip{
    display: block;
    font-size: 12px;
    position: absolute;
    bottom:0px;
    line-height: 20px;
    width: 100%;
    text-align: center;
    color: #999;
}
.addvideo .addicon{
    line-height: 80px;
}
.videolist video{
    width: 100%;
    height: 100px;
}
video.video{
    width: 100%;
    height:auto;
}
.edittext-main{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
    left: 0px;
    top: 0px;
    z-index:2000;
    overflow-y: scroll;
}
.videocutimg{
    display: none;
}

</style>

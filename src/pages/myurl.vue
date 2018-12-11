<template>
<div class="article">
    <van-nav-bar 
        :title=pagetitle 
        left-text="返回"
        left-arrow
        @click-left="$router.push('/home')"
        />

<div class="art-mian">
  <van-row class="art-main-title">
    <van-col span="10">
        <p><van-icon name="idcard" />我的微链接</p>
    </van-col>
    <van-col span="14" style="text-align:right">
        <van-button  size="small"  @click="show=true">添加微链接</van-button>
    </van-col>
  </van-row>

    <div class="art-list" v-if="havedata" v-cloak>
        <van-panel v-for="link,index in linkarr"   :title="link.linkname" :desc="link.linkurl" :key="index">
            <div slot="footer" class="slotfooter">
                <van-button size="small" @click="update(index)">修改</van-button>
                <van-button size="small" type="danger" @click="dellink(link.Id)">删除</van-button>
            </div>
        </van-panel>
    </div>

    <div class="art-none" v-if="!havedata" v-cloak>
        <van-icon name="info-o"/>
        <p>暂无数据</p>
    </div>
</div>


<van-popup v-model="show" class="alertbox">
    <div>
        <p>
            <span>添加微链接</span>
            <van-icon name="close" @click="show=false" />    
        </p>
        <van-field v-model="linkname" label="链接名称" placeholder="请输入微链接名称" />
        <van-field v-model="linkurl" label="链接地址" placeholder="请输入链接地址" />
        <van-button size="large" class="savecard" @click="savelink">添加</van-button>
    </div>
</van-popup>
<van-popup v-model="updateshow" class="alertbox">
    <div>
        <p>
            <span>修改微链接</span>
            <van-icon name="close" @click="updateshow=false" />    
        </p>
        <van-field v-model="updatelinkname" label="链接名称" placeholder="请输入微链接名称" />
        <van-field v-model="updatelinkurl" label="链接地址" placeholder="请输入链接地址" />
        <van-button size="large" class="savecard" @click="updatelink">修改</van-button>
    </div>
</van-popup>



</div>

</template>
<script>
export default {
    data(){
        return{
            pagetitle:"微链接",
            show:false,
            updateshow:false,
            updateid:"",
            updatelinkname:"",
            updatelinkurl:"",
            linkname:"",
            linkurl:"",
            linkarr:[]
        }
    },
    computed:{
        havedata:function(){
            if(this.linkarr.length==0){
                return false
            }else{
                return true
            }
        }
    },
    methods:{
        savelink:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            if(this.linkname==""){
                this.$toast("微链接名称不能为空")
                return;
            }
            if(this.linkurl==""){
                this.$toast("微链接地址不能为空")
                return;
            }
            this.$axios({
                url:"/api/link/setlink",
                method:"POST",
                data:{
                    user:user,
                    linkname:this.linkname,
                    linkurl:this.linkurl
                }
            }).then(
                (res)=>{
                    if(res.data.code==100){
                        this.$toast("添加成功");
                        this.linkname="";
                        this.linkurl="";
                        this.show=false;
                        this.getlink();
                    }else{
                        this.$toast(res.data.data);
                    }
                },
                (err)=>{
                    console.log(err)
                })
        },
        getlink:function(){
            var user=JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(user==null){
                this.$router.push="/login";
            }
            this.$axios({
                url:"/api/link/getlink",
                method:"POST",
                data:{
                    user:user
                }
            }).then(
                (res)=>{
                    this.linkarr=res.data.data;
                },
                (err)=>{
                    console.log(err)
                }
            )
        },
        update:function(index){
            this.updatelinkname=this.linkarr[index].linkname;
            this.updatelinkurl=this.linkarr[index].linkurl;
            this.updateid=this.linkarr[index].Id;
            this.updateshow=true;
        },
        updatelink:function(){
            if(this.updatelinkname==""){
                this.$toast("链接名称不能为空");
                return;
            }
            if(this.updatelinkurl==""){
                this.$toast("链接地址不能为空");
                return;
            }
            this.$axios({
                url:"/api/link/updatelink",
                method:"POST",
                data:{
                    linkname:this.updatelinkname,
                    linkurl:this.updatelinkurl,
                    Id:this.updateid
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.code==100){
                    this.$toast("修改成功");
                    this.updatelinkname="";
                    this.updatelinkurl="";
                    this.updateid="";
                    this.updateshow=false;
                    this.getlink();
                }
            },(err)=>{
                console.log(err);
            })
        },
        //删除
        dellink:function(id){
            this.$dialog.confirm({
                message:"确定要删除此条链接吗？"
            }).then(()=>{
                this.$axios({
                    url:"/api/link/dellink",
                    method:"POST",
                    data:{
                        Id:id
                    }
                }).then((res)=>{
                    if(res.data.code==100){
                        this.$toast(res.data.data);
                        this.getlink();
                    }
                },(err)=>{console.log(err)})
            }).catch(()=>{});
        }
    },
    mounted:function(){
        this.getlink();
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
.slotfooter{
    text-align: right;
}
</style>


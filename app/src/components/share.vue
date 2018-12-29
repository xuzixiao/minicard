<template>
<div>
    <div class="share">
        <div :class="collect?'collect active':'collect'" @click="collfun" v-if="collectfun">
            <i class="iconfont now">&#xe60c;</i>
            <i class="iconfont end">&#xe812;</i>
        </div>

        <div class="collect" @click="save(userinfo.mobile)">
            <i class="iconfont now">&#xe75c;</i>
        </div>

        <div class="idcard-btn" @click="idcardshow=true">
            <i class="iconfont">&#xe61c;</i>
        </div>
        <div class="updatetome">
            <div class="updatebtn" @click="updateme()">
                <i class="iconfont">&#xe615;</i>
                {{collectfun?'修改成我的':'创建成我的名片'}}
            </div>
        </div>
    </div>

    <div class="idcard-ceng" v-if="idcardshow" v-cloak>
        <div class="ceng-main">
            <span class="close">
                <van-icon name="close"  @click="idcardshow=false" />
            </span>
            <div class="cenginfo">
                <img :src="$HOST+userinfo.headimg" class="userimg"/>
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
                <button @click="save(userinfo.mobile)">保存到我的通讯录</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:["userinfo","collectfun","articleid"],
    data(){
        return{
            collect:false,
            idcardshow:false
        }
    },
    methods:{
        save:function(mobile){
            if(!this.$cookie.getCookie("loginstate")){
                this.$toast("您还未登录,请登录后操作");
                var that=this;
                setTimeout(() => {
                    that.$router.push({
                        path:"/login",
                        query:{
                            articleid:that.articleid
                        }
                    })
                }, 800);
                return;
            }
            var user= JSON.parse(this.$cookie.getCookie("loginstate")).user;
            if(mobile==user){
                this.$toast("您不能添加自己为好友");
                return;
            }
            this.$axios({
                url:"/api/user/makefrineds",
                method:"POST",
                data:{
                    user:user,
                    frined:mobile
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.code==0){
                    this.$toast(res.data.data)
                }else if(res.data.code==100){
                    this.$toast("已成功保存到通讯录")
                }
            },(err)=>{
                console.log(err);
            })
        },
        collfun:function(){
             if(!this.$cookie.getCookie("loginstate")){
                this.$toast("您还未登录,请登录后操作");
                setTimeout(() => {
                    window.location.href="/login"
                }, 800);
                return;
            }
            var user= JSON.parse(this.$cookie.getCookie("loginstate")).user;
            var artid=this.articleid;
            this.$axios({
                url:"/api/article/collectart",
                method:"POST",
                data:{
                    user:user,
                    artid:artid
                }
            }).then((res)=>{
                if(res.data.code==100){
                    this.$toast("收藏成功");
                    this.collect=true;
                }else{
                     this.$toast(res.data.data);
                     this.collect=true;
                }
            },(err)=>{
                console.log(err);
            })
        },
        updateme:function(){
             if(!this.$cookie.getCookie("loginstate")){//如果未登录
                this.$toast("您还未登录,请登录后操作");
                if(this.collectfun){//文章
                    //console.log(this.articleid);
                    this.$router.push({
                        path:"/login",
                        query:{
                            articleid:this.articleid
                        }
                    })
                }else{//单页
                    this.$router.push({
                        path:"/login",
                        query:{
                            user:this.userinfo.mobile
                        }
                    })
                    console.log(this.userinfo.mobile);

                }
            }else{//如果已登录
                var user= JSON.parse(this.$cookie.getCookie("loginstate")).user;
                if(this.collectfun){//文章
                    if(this.userinfo.mobile==user){
                        this.$dialog.alert({
                            message: '当前文章为您本人文章，您可以去文章列表进行修改'
                        }).then(() => {})
                    }else{
                        this.$router.push({
                            path:"/makeittome",
                            query:{
                                articleid:this.articleid
                            }
                        })
                    }    
                }else{//单页
                    this.$dialog.alert({
                        message: '完善您的信息,自动生成微单页'
                    }).then(() => {
                        this.$router.push({
                            path:"/home"
                        })
                    })
                }
            }
        }
    }
}
</script>


<style>
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
    width: 45%;
    height: 60px;
}
.updatetome .updatebtn{
    width: 100%;
    height:40px;
    line-height: 40px;
    font-size: 16px;
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
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
}
.close i{
    display: block;
    font-size: 26px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #666;
}
</style>

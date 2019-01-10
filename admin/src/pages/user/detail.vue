<template>
    <div class="company">
        <div class="userdetail">
            <el-row>
                <el-col :span="4">用户名</el-col>
                <el-col :span="20">{{userinfo.name}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="4">用户编号</el-col>
                <el-col :span="20">{{userinfo.userno}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="4">头像</el-col>
                <el-col :span="20">
                    <img :src="userinfo.headimg==''||userinfo.headimg==null?$Filepath+'/uploadfile/nothave.jpg':$Filepath+userinfo.headimg" alt="">
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">微信账号</el-col>
                <el-col :span="20">
                    {{userinfo.wechat}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">微信二维码</el-col>
                <el-col :span="20">
                    <img :src="userinfo.wxewmimg==''||userinfo.wxewmimg==null?$Filepath+'/uploadfile/nothave.jpg':$Filepath+userinfo.wxewmimg" alt="">
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">所在公司</el-col>
                <el-col :span="20">
                    {{userinfo.company}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">部门</el-col>
                <el-col :span="20">
                    {{userinfo.branch}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">职位</el-col>
                <el-col :span="20">
                    {{userinfo.office}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">主要经营</el-col>
                <el-col :span="20">
                    {{userinfo.operate}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">个性签名</el-col>
                <el-col :span="20">
                    {{userinfo.dictum}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">所在公司</el-col>
                <el-col :span="20">
                    {{userinfo.company}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">用户状态</el-col>
                <el-col :span="20">
                    {{userinfo.status==1?"正常使用":"禁用"}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">操作</el-col>
                <el-col :span="20">
                    
                    <el-button type="warning" size="mini" v-if="userinfo.status==1" @click="changeuserstatus(0)">禁用用户</el-button>
                    <el-button type="success" size="mini" v-else  @click="changeuserstatus(1)">启用用户</el-button>
                    <el-button type="primary" size="mini">设为vip</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userid:"",
            userinfo:""
        }
    },
    methods:{
        getdetail:function(){
            this.$axios({
                url:"/getuserinfo",
                method:"POST",
                data:{
                    userid:this.userid
                }
            }).then(({data})=>{
                console.log(data);
                if(data.code==100){
                    this.userinfo=data.data[0]
                }else if(data.code==10){
                    this.$notify({
                        message: '登录失效',
                        type: 'success'
                    }); 
                    var that=this;
                    setTimeout(function(){
                        that.$router.push({
                            path:"/login",
                            query:{
                                redirect:"/home/user"
                            }
                        })
                    },800)
                }
            },(err)=>{
                console.log(err);
            })
        },
        changeuserstatus:function(status){
            //console.log(status+""+this.userid);
            this.$axios({
                url:"/changeuserstatus",
                method:"POST",
                data:{
                    user:this.userid,
                    status:status
                }
            }).then(({data})=>{
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted:function(){
        
    },
    created:function(){
        this.userid=this.$route.query.id        
        this.getdetail();
    }
}
</script>

<style scoped>
.company{
    width: 100%;
    height: auto;
    background: #ffffff;
    padding: 10px 0px;
}
.handerbtn{
    padding: 10px;
    display: flex;
    justify-content: flex-start;
}
.companylist{
    width: auto;
    margin: 0 10px;
}
.page{
    margin: 10px 0px;
}
.userlogo{
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
}
.userlogo img{
    height: 100%;
    width: 100%;
}
.el-col{
    height: auto;
    min-height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 14px;
}
.el-row .el-col:first-child{
    font-size: 16px;
    font-weight: bold;
}

.el-col img{
    display: block;
    width: 100px;
    height: auto;
}
.userdetail{
    padding: 0 40px;
}
</style>


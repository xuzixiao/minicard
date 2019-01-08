<template>
    <div class="company">
        <el-form ref="form" :model="company" label-width="80px">
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="公司名称">
                        <el-input v-model="company.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20" class="state">
                        <el-form-item label="当前状态">
                            <el-switch
                                v-model="company.state"
                                :change="!company.state"
                                active-text="开启">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20" class="state">
                        <el-form-item label="开通时间">
                                <el-input-number class="extime" :min="1" :max="30" v-model="company.exptime"></el-input-number>
                                <el-select v-model="company.exptype" placeholder="请选择年月日" class="extype">
                                    <el-option label="日" value="d"></el-option>
                                    <el-option label="月" value="m"></el-option>
                                    <el-option label="年" value="y"></el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="公司描述">
                        <el-input
                            v-model="company.desc"
                            type="textarea"
                            rows=3
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row class="form-btn">
                    <el-button type="primary" @click="savecompany">保存修改</el-button>
                </el-row>

        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:"",
           company: {
                name: '',
                desc:"",
                state:true,
                exptime:1,
                exptype:""
            }
        }
    },
    computed:{
        expiration:function(){
            return this.company.exptime+ this.company.exptype;
        }
    },
    methods:{
        savecompany:function(){
            if(this.company.name==""){
                this.$notify({
                    title: '警告',
                    message: '公司名称不能为空',
                    type: 'warning'
                });
                return;
            }else if(this.company.exptime==""||this.company.exptype==""){
                this.$notify({
                    title: '警告',
                    message: '请选择开通时间',
                    type: 'warning'
                });
                return;
            }else if(this.company.desc==""){
                this.$notify({
                    title: '警告',
                    message: '公司描述不能为空',
                    type: 'warning'
                });
                return;
            }
            
            let updatedata=this.company;
            updatedata.id=this.id;
            this.$axios({
                url:"/updatecompany",
                method:"POST",
                data:updatedata,
            }).then(({data})=>{
                if(data.code==100){
                    this.$notify({
                        message: '修改成功',
                        type: 'success'
                    }); 
                    var that=this;
                    setTimeout(function(){
                        that.$router.push({
                            path:"/home/company",
                        })
                    },800)
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
                                redirect:"/home/company/update"
                            }
                        })
                    },800)
                }else{
                    this.$notify({
                        message: data.msg,
                        type: 'warning'
                    }); 
                }
                console.log(data);
            }).catch((err)=>{
                console.log(err)
            })
        },
        getcompanyinfo:function(){
           this.$axios({
               url:"/getupdateinfo",
               method:"POST",
               data:{
                   id:this.id
               }
           }).then(({data})=>{
               console.log(data);
               if(data.code==100){
                   this.company.name=data.data[0].name;
                   this.company.desc=data.data[0].depict;
                   this.company.state=data.data[0].state==1?true:false;
                   this.company.exptime=data.data[0].exptime;
                   this.company.exptype=data.data[0].exptype;
               }
           }).catch((err)=>{
               console.log(err);
           })
        }
    },
    created:function(){
        this.id=this.$route.query.id
        this.getcompanyinfo(); 
    }
}
</script>

<style scoped>
.company{
    height: auto;
    background: #ffffff;
    padding: 20px 15px;
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
.state{
 text-align: left;
}
.form-btn{
    text-align: left;
    margin-left: 80px;
}
.extime{
    width: 125px;
}
.extype{
    width: 150px;
}
</style>


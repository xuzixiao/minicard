<template>
    <div class="company">
       <el-row>
        <el-col :span="24">

            <el-table :data="tableData" border width='500' class="companylist">
                <el-table-column
                    prop="userno"
                    label="用户编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="头像"
                    width="80">
                    <template slot-scope="scope">
                        <div class="userlogo">
                            <img :src="scope.row.headimg==''||scope.row.headimg==null?$Filepath+'/uploadfile/nothave.jpg':$Filepath+scope.row.headimg" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="当前状态"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="createtime"
                    label="创建时间"
                    width="200">
                </el-table-column>
                 <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="godetail(scope.row.Id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col class="page" v-if="false">
            <el-pagination
                    background
                    :page-size="5"
                    layout="prev, pager, next"
                    :total="10">
            </el-pagination>
        </el-col>
       </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
        getlist:function(){
            this.$axios({
                url:"/userlist",
                method:"POST"
            }).then(({data})=>{
                console.log(data);
                if(data.code==100){
                    if(data.data.length>0){
                       data.data.forEach(item => {
                            item.status==1?item.status="启用":item.status="禁用";
                            item.createtime=item.createtime.split(".")[0];
                        });
                        this.tableData=data.data;
                    }else{
                        this.tableData=[];
                    }
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
        godetail:function(id){
            this.$router.push({
                path:"/home/user/detail",
                query:{
                    id:id
                }
            })
        }
    },
    mounted:function(){
        
    },
    created:function(){
        this.getlist();
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

</style>


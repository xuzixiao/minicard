<template>
    <div class="company"> 
       <el-row>
        <el-col :span="24">
            <div class="handerbtn">
                <router-link to="/home/company/add">
                    <el-button>添加公司</el-button>
                </router-link>
            </div>
        </el-col>
        <el-col :span="24">
            <el-table :data="tableData" border class="companylist">
                <el-table-column
                    prop="item_no"
                    label="公司编号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="公司名称">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="当前状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="update(scope.row.Id)">编辑</el-button>
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
                url:"/companylist",
                method:"GET"
            }).then(({data})=>{
                if(data.code==100){
                    if(data.data.length>0){
                        data.data.forEach(item => {
                            item.state==1?item.state="启用":item.state="禁用";
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
                                redirect:"/home/company"
                            }
                        })
                    },800)
                }
            },(err)=>{
                console.log(err);
            })
        },
        update:function(id){
            this.$router.push({
                path:"/home/company/update",
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

</style>


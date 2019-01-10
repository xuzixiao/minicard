<template>
    <div class="company">
       <el-row>
        <el-col class="manage-btn">
            <el-button>添加文章</el-button>
            <el-button>添加文章</el-button>
        </el-col>
        <el-col :span="24">
            <el-table :data="tableData" border width='500' class="companylist">
                <el-table-column
                    prop="arttitle"
                    label="文章标题"
                    width="300">
                </el-table-column>
                <el-table-column
                    label="封面图"
                    width="120">
                    <template slot-scope="scope">
                        <div class="bannerimg">
                            <img :src="scope.row.artbanner==''||scope.row.artbanner==null?$Filepath+'/uploadfile/nothave.jpg':$Filepath+scope.row.artbanner" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="用户"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="categoryname"
                    label="文章分类"
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
                url:"/articlelist",
                method:"POST"
            }).then(({data})=>{
                console.log(data);
                if(data.code==100){
                    if(data.data.length>0){
                    //    data.data.forEach(item => {
                    //         item.status==1?item.status="启用":item.status="禁用";
                    //         item.createtime=item.createtime.split(".")[0];
                    //     });
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
            console.log(id);
            return;
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
.bannerimg{
    width: 100px;
    height: auto;
    display: flex;
    align-items: center;
}
.bannerimg img{
    display: block;
    height:auto;
    width: 100px;
}
.manage-btn{
 padding:  0px 0px 10px 10px;
 display: flex;
}

</style>


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
                    prop="CP-No"
                    label="公司编号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="CP-Name"
                    label="公司名称">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="当前状态"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col class="page">
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
            tableData:[{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
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


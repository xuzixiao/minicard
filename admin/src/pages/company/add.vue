<template>
    <div class="company">
        <el-form ref="form" :model="company" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="公司名称">
                        <el-input v-model="company.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="公司描述">
                        <el-input v-model="company.desc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                  <el-row>
                    <el-col :span="8">
                        <el-form-item label="状态">
                        <el-input v-model="company.desc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>





        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
           company: {
                name: '',
                banner:'',
                state:true
            }
        }
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

</style>


<template>
    <div class="menu">
        <!-- <ul>
            <li>用户管理</li>
            <li>文章管理</li>
            <li>公司管理</li>
        </ul> -->

    <el-menu>
      <el-menu-item v-for="item,index in nav"  :key=index :index="index+''" @click="menuselect(index)" >
            <i :class="item.icons"></i>
            <span>{{item.navname}}</span>   
      </el-menu-item>
    </el-menu>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nav:[
                {navname:"用户管理",path:"/home/user",icons:"iconfont icon-yonghu",children:[]},
                {navname:"文章管理",path:"/home/article",icons:"iconfont icon-zhangdanguanli"},
                {navname:"公司管理",path:"/home/company",icons:"iconfont icon-shishichaobiao"}
            ]
        }
    },
    methods:{
        menuselect:function(index){
            this.$router.push(this.nav[index].path);
        }
    }
}
</script>


<style scoped>
.el-menu-item i{
    padding: 0 5px;
}
.el-menu-item{
   padding: 0 50px;
}
</style>

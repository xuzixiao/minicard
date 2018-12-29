<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item v-for="item,index in crumb" :to="{path:item.path}" :key="index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    data(){
        return{
            crumb:[]
        }
    },
    watch:{
        $route(){
           this.getbreadcrumd();
        }
    },
    methods:{
        getbreadcrumd:function(){
            var bcrumb=this.$route.matched.map(function(item){
                var crumb={"title":item.meta.title,"path":item.path}
                return crumb;
            });
            this.crumb=bcrumb;
        }
    },
    created:function(){
        this.getbreadcrumd();
    }
}
</script>
<style scoped>
.breadcrumb{
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #ffffff;
    border-bottom: #efeff1 solid 0.5px; 
}
</style>

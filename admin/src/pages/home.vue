<template>
    <el-container class="main">
        <!-- 头部菜单 -->
        <el-header>
            <head-unit></head-unit>
        </el-header>
        <el-container>
           <!-- 左侧菜单 -->
            <el-aside width="200px">
                <menu-unit></menu-unit>
            </el-aside>
            <el-container class="Maincontent">
                <breadcrumb></breadcrumb>
                <el-main><div class="content"><router-view></router-view></div></el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import header from '@/layout/header'
import menu from '@/layout/menu'
import footer from '@/layout/footer'
import breadcrumb from '@/layout/breadcrumb'

export default {
    data(){
        return{

        }
    },
    components:{
        "headUnit":header,
        "menuUnit":menu,
        "footUnit":footer,
        "breadcrumb":breadcrumb
    }
}
</script>
<style>
.main{
    position: fixed;
    width: 100%;
    height:100%;
    left: 0;
    top: 0px;
}
.el-header{
    width: 100%;
    padding: 0px;
    background: #01a9f5;
}

.el-aside{
    padding: 0px;
    background: #f8f9fb;
}
.el-footer{
    background: #333;
}
.content{
    padding: 0px;
    overflow: auto;
}
.el-main{
    padding: 0px!important;
}
.Maincontent{
    flex-direction:column!important;
}
</style>

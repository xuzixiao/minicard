<template>
        <div class="header">
            <h1>迷你名片后台管理系统</h1>
            
            <div class="manage">
                <ul>
                   <li>欢迎您!admin</li> 
                   <li>退出登录</li>
                </ul>
            </div>
        </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.header{
    width: 100%;
    display:flex;
    justify-content: space-between;
}
.header h1{
    display: inline-block;
    line-height: 60px;
    font-size: 20px;
    text-align: left;
    color: #ffffff;
    padding-left: 10px;
}
.manage{
    width:300px;
    height:60px;
    display: flex;
    justify-content: flex-end;
}
.manage ul{
padding-right: 10px;
}
.manage ul li{
    list-style: none;
    height: 60px;
    display: inline-flex;
    line-height: 60px;
    justify-content:right;
    color: #ffffff;
    font-size: 14px;
    padding-right: 10px;
    cursor: pointer;
}
</style>

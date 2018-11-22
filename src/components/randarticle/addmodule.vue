<template>
    <div class="addarticlemodule">
        <van-icon name='add' class="addbtn"/>
        <div class="addmodule">
            <div class="module" @click="handtext">
                <van-icon name='idcard'/>
                <span>文字</span>
            </div>
            <div class="module" @click="handphoto">
                <van-icon name='photo'/>
                <span>图片</span>
            </div>
            <div class="module">
                <van-icon name='play'/>
                <span>视频</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   props:['index'],
   data(){
       return{

       }
   },
   methods:{
       handtext:function(){
        this.$store.commit('showtextedit');
        this.$emit('addmoduleindex',this.index);
       },
       handphoto:function(){
        this.$store.commit('showphoto');
        this.$emit('addmoduleindex',this.index);
       }
   }
}
</script>
<style>

</style>

<template>
    <div class="videorander" :id="'videorander'+index">
</div>    
</template>
<script>
import ChimeeMobilePlayer from 'chimee-mobile-player'
import "chimee-mobile-player/lib/chimee-mobile-player.browser.css";
export default {
    props:["src","index"],
    data(){
        return{
        }
    },
    computed:{
    ChimeeMobilePlayer
    },
    methods: {
    },
    mounted:function(){
        new ChimeeMobilePlayer({
        wrapper: "#videorander"+this.index,  // video dom容器
        src: this.src,
        autoplay: true,
        controls: true,
        playsInline: true,
        preload: 'auto',
        x5VideoPlayerFullscreen: true,
        x5VideoOrientation: 'landscape|portrait',
        xWebkitAirplay: true,
        muted: true,
        // removeInnerPlugins: ['chimeeMobiControlbar', 'chimeeState'] // 需要移除的插件
        })
    }
}
</script>
<style>

</style>

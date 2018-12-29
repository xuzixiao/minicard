import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var Store = new Vuex.Store({
    state:{
      cookieouttime:60000*100,//cookie过期时间毫秒
      textedit:false,// 编辑文章 文本输入框显示状态
      photoedit:false,//编辑图片 显示状态
      videoedit:false// 编辑视频 显示状态
    },
    mutations:{
        showtextedit:state=>state.textedit=true,//显示文本输入框
        hidetextedit:state=>state.textedit=false,//隐藏文本输入框
        showphoto:state=>state.photoedit=true,//显示文本输入框
        hidephoto:state=>state.photoedit=false,//隐藏文本输入框
        showvideo:state=>state.videoedit=true,//显示文本输入框
        hidevideo:state=>state.videoedit=false,//隐藏文本输入框
    }
})

export default Store;
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    state:{
        token:"",
        user:""
    },
    mutations:{
        set_token(state,token){
            state.token = token  
            sessionStorage.token = token  
        },
        del_token(){
            state.token = ''  
            sessionStorage.removeItem('token')  
        },
        set_name(state,user){
            state.user = user;
            sessionStorage.user=user; 
        },
        del_name(){
            state.user = "";
            sessionStorage.removeItem('user'); 
        }
    }
})

export default store;

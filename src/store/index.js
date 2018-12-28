// import Vue from 'vue';
//引入Vuex
// import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        islogin:false,
        uid:""
      },
      getters:{

      },
      mutations:{
        signin(state,uid){
          this.state.islogin=true;
          this.state.uid=uid
        },
        signout(){
          this.state.islogin=false
          this.state.uid=""
        },
        getlogin(state,uid){
          this.state.islogin=true
          this.state.uid=uid
        }
      },
      actions:{

      }
});
 
export default store;
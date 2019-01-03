<template>
  <div id="app">
    <router-view></router-view>
    <loading v-if="isLoading == true"></loading>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import store from './store'
  import loading from './components/loading.vue'
  import resource from './api/resource.js'
  export default {
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },
    created(){
      if(!sessionStorage.getItem("callback")){
        if(!!sessionStorage.getItem("authUrl")){ //有authurl过
          let url = window.location.href;
          let code = url.split("?")[1].split("&")[0].split("=")[1]; // 获取code
          this.callback(code);
        }else{
          this.getAuthurl();
          // this.$router.push('/index');
        }
      }else{
        console.log("授权过");
      }
    },
    methods:{
      //获取authUrl
      getAuthurl(){
        resource.authUrl().then(res => {
          if(res.data.code == "1"){
            sessionStorage.setItem("authUrl","1");
            window.location.href = res.data.data;
          }else{
            this.$toast(res.data.msg);
          }
        })
      },
      //callback
      callback(code){
        resource.callback({code:code}).then(res => {
          if(res.data.code == "1"){
            sessionStorage.setItem("callback","1");
            let openid = res.data.data.openid;
            let nickname = res.data.data.nickname;
            let headimgurl = res.data.data.headimgurl;
            this.userObj.openid = openid;
            this.userObj.nickname = nickname;
            this.userObj.headimgurl = headimgurl;
            //判断用户状态
            this.loginCheck();
          }else{
            this.$toast(res.data.msg);
          }
        })
      },
      //判断用户状态
      loginCheck(){
        resource.loginCheck(this.userObj).then(res => {
          if(res.data.code == "0"){
            this.$toast(res.data.msg);
          }else if(res.data.code == "1"){
            this.$router.replace('/index');
          }else if(res.data.code == "2"){
            this.$toast("请绑定手机号");
            this.$router.replace('/login');
          }
        })
      }


    },
    components: {
      loading
    }
  }
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
</style>

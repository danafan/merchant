import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { InfiniteScroll } from 'mint-ui';


Vue.use(MintUI)
Vue.use(InfiniteScroll);

Vue.config.productionTip = false
Vue.prototype.judgmentPhone = /^1[3456789]\d{9}$/;		//手机号正则
Vue.prototype.judgmentCode = /^\d{6}$/;					//验证码正则
Vue.prototype.userObj = {},								//用户信息
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

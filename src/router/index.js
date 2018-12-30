import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
const login = resolve=>require(['@/components/login'],resolve)
const index = resolve=>require(['@/components/index'],resolve)
const home = resolve=>require(['@/components/home'],resolve)
const mine = resolve=>require(['@/components/mine'],resolve)
const statis = resolve=>require(['@/components/statis'],resolve)
const detail = resolve=>require(['@/components/detail'],resolve)
const goodsList = resolve=>require(['@/components/goodsList'],resolve)


Vue.use(Router)

const router = new Router({
  routes: [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/index',
    component: index,
    children:[
    { path: '/home', component: home},
    { path: '/mine', component: mine}
    ]
  },
  {
    path: '/statis',
    component: statis,
  },
  {
    path: '/detail',
    component: detail,
  },
  {
    path: '/goodsList',
    component: goodsList,
  },
  ]
})
// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  let path = to.path;
  if(path == "/detail" || path == "/statis" || path == "/goodsList"){
    store.commit('UPDATE_STATUS', {isLoading: true})
  }
  next()
})
export default router;
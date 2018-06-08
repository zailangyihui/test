// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './vuex/store'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI);

/* eslint-disable no-new */

//router.beforeEach((to, from, next) => {
//if (to.fullPath !== '/') {
//  next({
//    path: '/'
//  })
//  return
//}
//next()
//})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

//router.beforeEach((to, from, next) => {
//window.scrollTo(0, 0)
//console.log(1234)
//if (!to.meta.requiresAuth) {
//  if (!store.state.collectItems.bAuth) {
//    next({
//      path: '/'
//      // query: { redirect: to.fullPath }
//    })
//  } else {
//    next()
//  }
//} else {
//  if (store.state.collectItems.bAuth && to.fullPath === '/') {
//    console.log()
//    next(false)
//    return
//  }
//  next()
//}
//})

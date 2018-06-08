import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import About from '@/views/about'
import accountInfo from '@/views/system/accountInfo'
import logsList from '@/views/system/logsList'
import menuManager from '@/views/system/menuManager'
import blackList from '@/views/system/blackList'
import displaySetting from '@/views/system/displaySetting'
import userManager from '@/views/system/userManager'
import Page2 from '@/views/system/page2'
import Page3 from '@/views/order/page3'
import Page4 from '@/views/order/page4'
import Test from '@/components/Test'
import store from '../vuex/store.js'
import common from '../common/js/common.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
	    path: '/Home',
	    component: Home,
	    name: '系统管理',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [
	    		{ path: '/about.go', component: About, name: '关于页面' },
	        { path: '/sys_accountInfo.go', component: accountInfo, name: '用户管理' },
	        { path: '/sys_logsList.go', component: logsList, name: '日志查询' },
	        { path: '/sys_menuManager.go', component: menuManager, name: '日志查询' },
	        { path: '/sys_blackList.go', component: blackList, name: '黑名单' },
	        { path: '/sys_displaySetting.go', component: displaySetting, name: '显示设置' }, 
	        { path: '/sys_userManager.go', component: userManager, name: '显示设置' }, 
	        { path: '/page2', component: Page2, name: '页面二' },
	        { path: '/page3', component: Page3, name: '页面三' },
	        { path: '/page4', component: Page4, name: '页面四' },
	    ],
	    beforeEnter: (to,from,next)=> {   //导航守卫
            console.log(to)
            console.log(from)
            if(common.getCookie("userinfo")){
              console.log('用户已经登录');
              next();
            }else{
              console.log('用户未登录');
              next({path: '/',query:{ Rurl: ''}});  //未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来
          }
      }
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }
  ]
})

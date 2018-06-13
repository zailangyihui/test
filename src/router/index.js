import Vue from 'vue'
import Router from 'vue-router'

//common module
import Login    from '@/common/login'
import Register from '@/common/register'
import Home     from '@/common/home'
import About    from '@/common/about'

//custom module
//系统管理
import accountInfo from '@/views/system/accountInfo'
import userManager from '@/views/system/userManager'
import logsList from '@/views/system/logsList'
import menuManager from '@/views/system/menuManager'
import blackList from '@/views/system/blackList'
import displaySetting from '@/views/system/displaySetting'

import {getCookie} from '@/utils/Cookie'

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
	        { path: '/sys_accountInfo.go', component: accountInfo, name: '用户信息' },
	        { path: '/sys_logsList.go', component: logsList, name: '日志查询' },
	        { path: '/sys_menuManager.go', component: menuManager, name: '菜单管理' },
	        { path: '/sys_blackList.go', component: blackList, name: '黑名单' },
	        { path: '/sys_displaySetting.go', component: displaySetting, name: '显示设置' }, 
	        { path: '/sys_userManager.go', component: userManager, name: '用户管理' }, 
	    ],
    },
  ]
})

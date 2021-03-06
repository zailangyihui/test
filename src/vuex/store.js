import Vue from 'vue'
import Vuex from 'vuex'

//引入getters与actions
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

//定义各组件需要进行通信的数据
const state = {
    theme: 'bg-blue', //主题
    env: debug, //环境
    menus: [], //菜单
    currentTopMenu: '', //当前顶部菜单
    currentLeftMenu: '',
    asideState: 'unfold', //侧边菜单状态 收起 packup or 展开 unfold
    navi: [{ url: '/about.go', text: '首页' }], //tab菜单
    currentNavi: '/about.go',
    updataRoleList: false, //是否刷新用户角色
    //用户信息
    user: {},
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    strict: debug,
})
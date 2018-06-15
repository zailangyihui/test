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
    navi: [{ id: 0, text: '首页' }], //tab菜单
    currentNavi: '0',
    //用户信息
    user: {
        accounts: "admin",
        balanceA: 0,
        balanceB: 0,
        balanceC: 0,
        createTime: "2018-03-22 17:00:09",
        id: 2,
        img: null,
        ip: "192.168.0.168",
        lastTime: "2018-06-09 10:58:47",
        level: 2,
        loginCount: 12,
        maxSubs: 1000,
        nikeName: "管理员",
        parentId: 1,
        roleId: 2,
        states: "1"
    },
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    strict: debug,
})
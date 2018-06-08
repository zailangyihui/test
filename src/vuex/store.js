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
	theme:'',
    env: debug, //环境
    ajaxerror: false, //POST是否出错
    isjoin: false, //是否登入
    iourl: null,
    rid: '',
    load: {
        show: false,
        mask: false,
        text: 'Loading...'
    },
    //用户信息
    user: {
        isLoginin: false,
        uid: '',//window.sessionStorage.getItem('userId'),
        userno: '', //用户名
        amount: 0, //余额
        useAmount: 0, //可用余额
        blockedAmount: 0, //冻结金额
        credit: 0, //模拟交易金额
        redtot: 0,
    },
    hongbao: {
        show: false,
        title: '新手注册送100元红包',
        subText: '已存入余额',
        img: '',
        money: '100'
    },
    betHistory: []
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    strict: debug,
})

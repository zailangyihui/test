export default {
	// 设置主题颜色
    UPDATA_THEME : function(state, theme){
        state.theme = theme
    },
    //更新用户信息
    UPDATA_USER_INFO: function(state, content) {
        if(content.userno != undefined)  {
            state.user.userno = content.userno
            window.localStorage.setItem('QQJC_USERNO', content.userno)
        }
        if(content.password != undefined){
            window.localStorage.setItem('QQJC_PASSWORD', content.password)
        }
        if(content.uid != undefined)  state.user.uid = content.uid
        if(content.slotName != undefined) state.user.slotName = content.slotName
        if(content.avatar != undefined) state.user.avatar = content.avatar
        if(content.redtot!=undefined) state.user.redtot = content.redtot
        if(content.useAmount != undefined) state.user.useAmount = content.useAmount
        if(content.credit != undefined) state.user.credit = content.credit
        if(content.blockedAmount != undefined) state.user.blockedAmount = content.blockedAmount
        console.log('【更新用户信息】', content);
    },
    //设置房间IO地址
    INIT_ROOM: function(state, content) {
        state.iourl = content
    },
    // axio POST请求是否出错
    UPDATA_AXIOS_ERROR : function(state, msg){
        state.ajaxerror = msg
    },
    //更新房间ID
    UPDATA_RID: function(state, rid){
        state.rid = rid
    },
    //更新loading状态
    UPDATA_LOADING: function(state, content){
        if(content.show != undefined) state.load.show = content.show
        if(content.mask != undefined) state.load.mask = content.mask
        if(content.text != undefined) state.load.text = content.text
    },
    //是否已登入
    UPDATA_JOIN_STATE : function(state, flag){
        state.isjoin = flag;
    },
    //更新红包
    UPDATA_HONGBAO: function(state, content){
        if(content.show != undefined) state.hongbao.show = content.show
        if(content.title != undefined) state.hongbao.title = content.title
        if(content.subText != undefined) state.hongbao.subText = content.subText
        if(content.img != undefined) state.hongbao.img = content.img
        if(content.money != undefined) state.hongbao.money = content.money
    }
}

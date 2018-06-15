export default {
	// 设置主题颜色
    UPDATA_THEME : function(state, theme){
        state.theme = theme
    },
    //更新侧边菜单状态
    UPDATA_ASIDE_MENUS_STATE : function(state, content){
        state.asideState = content
    },
    //更新nai
    UPDATA_NAVI : function(state, id){
        state.navi = state.navi.filter(tab => tab.id !== id);
    },
    UPDATA_CURRENT_NAVI: function(state, id){
        state.currentNavi = String(id)
    },
    ADD_NAVI: function(state, obj){
        let record = state.navi.find(item => item.id === obj.id) //记录
        if (!record) {state.navi.push(obj)}
    },
    UPDATA_TOP_MENUS_CURRENT: function(state, id){ state.currentTopMenu = id },

    UPDATA_CURRENT_LEFT_MENU: function(state, id){ state.currentLeftMenu = id },
    //更新用户信息

    UPDATA_MENUS: (state, content) => { state.menus = content },

    EVENT_GET_ROLE_LIST:  (state, content) => { state.updataRoleList = content },
    
}

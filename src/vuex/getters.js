// 这个 getter 函数会返回 state 的值
export const env = state => state.env
export const user = state => state.user
export const theme = (state) => {
    return state.theme

}
export const asideState = state => state.asideState
export const updataRoleList = state => state.updataRoleList
export const menus = state => state.menus
export const topMenus = (state) => {
    return state.menus.map((item, index) => {
        return {
            id: item.id,
            text: item.text,
            icon: item.icon,
            url: item.url,
            checked: item.checked,
        }
    })
}
export const leftMenus = (state) => {
    if (!state.menus.length) return;
    let menus = state.menus.find(item => item.id === state.currentTopMenu)
    if (!menus) menus = state.menus[0]
    return menus.children.map((item) => {
        return {
            id: item.id,
            pid: item.pid,
            text: item.text,
            icon: item.icon,
            url: item.url,
            children: item.children,
        }
    })
}
export const navi = state => state.navi
export const currentNavi = state => state.currentNavi
export const currentLeftMenu = state => state.currentLeftMenu
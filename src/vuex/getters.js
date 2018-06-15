// 这个 getter 函数会返回 state 的值
export const env = state => state.env
export const user = state => state.user
export const theme = state => state.theme
export const asideState = state => state.asideState
export const topMenus = (state) => {
    return state.menus.map((item, index) => {
        return {
            id: item.id,
            text: item.text,
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
            children: item.children,
        }
    })
}
export const navi = state => state.navi
export const currentNavi = state => state.currentNavi
export const currentLeftMenu = state => state.currentLeftMenu
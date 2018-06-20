import store from '../vuex/store'
import { fetch } from './fetch'

//修改菜单获取权限（角色）下拉列表
const getMenuRole = async(params) => {
    let response = await fetch({ url: 'getMenuRole.go', method: 'POST', params: params, })
    return response.data
}

//新增菜单获取权限（角色）下拉列表
const queryAllRole = async(params) => {
    let response = await fetch({ url: 'queryAllRole.go', method: 'POST', params: params, })
    return response.data
}

//新增菜单
const addMenu = async(params) => {
    let response = await fetch({ url: 'createMenu.go', method: 'POST', params: params, })
    return response
}

//修改菜单
const editorMenu = async(params) => {
    let response = await fetch({ url: 'updateMenu.go', method: 'POST', params: params, })
    return response
}

//获取菜单
const getMenus = async(params) => {
    let response = await fetch({ url: 'meunInit.go', method: 'POST', params: params, })
    return response
}

//删除菜单
const deleteMenu = async(params) => {
    let response = await fetch({ url: 'deleteMenu.go', method: 'POST', params: params, })
    return response
}

export { getMenuRole, queryAllRole, addMenu, editorMenu, getMenus, deleteMenu }
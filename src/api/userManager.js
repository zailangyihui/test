
// common
import store from '../vuex/store'
import {fetch} from './fetch'

//获取角色列表（统计用户数）
const  getRoleList =  async (params) => { 
	let response = await fetch({url: 'roleInit.go', method: 'POST', params: params, })
	return response.data
}

//根据用户ID获取角色
const  getRoleListForUser =  async (params) => { 
	let response = await fetch({url: 'getRoleList.go', method: 'POST', params: params, })
	return response.data
}

//根据角色查用户
const getUserList = async (params) => { 
	let data = fetch({url: 'roleUserList.go', method: 'POST', params: params, }) 
	return data
}


//获取权限设置树
const getRoleTree =  async (params) => { 
	let response = await fetch({url: 'roleShowTree.go', method: 'POST', params: params, })
	return response.data
}

//添加角色
const addRole = async (params) => {
	let response = await fetch({url: 'createRole.go', method: 'POST', params: params, })
	return response
}
//更新角色权限
const updataRole = async (params) => {
	let response = await fetch({url: 'updateRole.go', method: 'POST', params: params, })
	console.log('更新角色权限', response)
	return response
}
//删除角色
const deleteRole = async (params) => {
	console.log('params', params)
	let response = await fetch({url: 'removeRole.go', method: 'POST', params: params, })
	return response
}
//删除用户
const deleteUser = async (params) => {
	let response = await fetch({url: 'removeRole.go', method: 'POST', params: params, })
	return response
}

export { getRoleList, getROleInfo, getUserList, getRoleTree, addRole, updataRole, deleteRole, deleteUser, getRoleListForUser }



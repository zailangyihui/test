
// common
import store from '../vuex/store'
import {fetch} from './fetch'


//获取角色列表
const  getRoleList =  async (params) => { 
	let response = await fetch({url: 'roleInit.go', method: 'POST', params: params, })
	return response.data
}

//根据角色查用户
const getUserList = async (params) => { 
	let data = fetch({url: 'roleUserList.go', method: 'POST', params: params, }) 
	console.log(data)
	return data
}
//获取权限设置树
const getRoleTree =  async (params) => { 
	let response = await fetch({url: 'roleShowTree.go', method: 'POST', params: params, })
	return response.data
}
//更新角色权限
const updataRole = async (params) => {
	let response = await fetch({url: 'updateRole.go', method: 'POST', params: params, })
	console.log('更新角色权限', response)
	return response
}


export { getRoleList, getUserList, getRoleTree, updataRole }



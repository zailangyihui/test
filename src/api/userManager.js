
// common
import store from '../vuex/store'
import {fetch} from './fetch'


//获取角色列表
const  getRoleList =  async (params) => { 
	let response = await fetch({url: 'roleInit.go', method: 'POST', params: params, })
	//console.log(response.data)
	return response.data
}

//根据角色查用户
const getUserList =  (params) => { 
	let data = fetch({url: 'roleUserList.go', method: 'POST', params: params, }) 
	console.log(data)
	return data
}


export { getRoleList, getUserList }




// common
import {fetch} from './fetch'

//获取角色列表（统计用户数）
const  loginIn =  async (params) => { 
	let response = await fetch({url: 'login.go', method: 'POST', params: params, })
	return response.data
}


const getMenus = (params) => { return fetch({url: 'meunInit.go', method: 'POST', params: params, }) }


export { loginIn, getMenus }



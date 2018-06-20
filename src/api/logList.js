//logsList.go
import {fetch} from './fetch'

//获取角色列表（统计用户数）
const  getLogsList =  async (params) => { 
	let response = await fetch({url: 'logsList.go', method: 'POST', params: params, })
	return response.data
}

export { getLogsList }
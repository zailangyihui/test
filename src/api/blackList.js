
// common
import store from '../vuex/store'
import {fetch} from './fetch'

//获取黑名单列表
const getBlackList = async (params) => {
	let response = await fetch({url: 'getBlacklist.go', method: 'POST', params: params, })
	return response.data
}
//删除记录
const deleteBlackRecord = async  (params) => {
	let response = await fetch({url: 'removeBlacklist.go', method: 'POST', params: params, })
	return response
}

//添加记录
const addBlack = async  (params) => {
	let response = await fetch({url: 'setBlacklist.go', method: 'POST', params: params, })
	return response
}
export { getBlackList, addBlack, deleteBlackRecord }



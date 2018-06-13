
// common
import {fetch} from './fetch'


//登陆 
const loginIn =  (params) => { return fetch({url: 'login.go', method: 'POST', params: params, }) }

const getMenus = (params) => { return fetch({url: 'meunInit.go', method: 'POST', params: params, }) }


export { loginIn, getMenus }



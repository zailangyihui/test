// API

import * as axios from 'axios'


//import * as vux from 'vux'

const API = {
    LOGIN: '/admin/login.go', //登录
    LOGSLIST: '/admin/logsList.go', //获取日志列表
    MEUNINIT: '/admin/meunInit.go', //取左侧导航菜单
    ROLEINIT: '/admin/roleInit.go', //取角色列表
    ROLEUSERLIST: '/admin/roleUserList.go', //根据角色查用户
    ROLESHOWTREE: '/admin/roleShowTree.go', //显示菜单树
    CREATEROLE: '/admin/createRole.go', //保存角色
    GETBLACKLIST: '/admin/getBlacklist.go', //查询黑名单
    SETBLACKLIST: '/admin/setBlacklist.go', //添加黑名单
    REMOVEBLACKLIST: '/admin/removeBlacklist.go', //移除黑名单
    UPDATEROLE: '/admin/updateRole.go', //修改角色权限
    REMOVEROLE: '/admin/removeRole.go', //删除角色
    GETROLEINFO: '/admin/getRoleInfo.go', //取角色下拉列表
    MANAGERREGISTER: '/admin/managerRegister.go', //注册用户
    PROJECTSUBMENUINIT: '/admin/projectSubMeunInit.go' //切换一级菜单（切换左侧导航）
}

export const axiosGet = ({ dispatch, commit }, url) => {
    //commit('UPDATA_LOADING', { show: true, mask: false})
    return new Promise((resolve, reject) => {
        axios.get(API[url]).then(response => {
            if (response.data.code == 1) {
                console.group('axios')
                console.log('method: GET');
                console.log('url: ' + API[url]);
                console.log('responseState:', response.data.code)
                console.log('responseData:', response.data.data)
                console.groupEnd();
                resolve(response);
            } else {
                commit('UPDATA_AXIOS_ERROR', response.data.msg)
            }
            //commit('UPDATA_LOADING', { show: false })
        }).catch(error => {
            //commit('UPDATA_LOADING', { show: false })
            commit('UPDATA_AXIOS_ERROR', '请求服务器失败！')
            reject(error);
        })
    })
}

/*
    @url API请求地址
    @params 请求参数 {}
 */
export const axiosPost = ({ dispatch, commit }, data) => {
    //let showLoading = data.params.showLoading===false ? false : true
    //commit('UPDATA_LOADING', { show: showLoading, mask: false })
    return new Promise((resolve, reject) => {
        axios.post(API[data.url], data.params).then(response => {
            console.group('axios')
            console.log('method: POST');
            console.log('url: ' + API[data.url]);
            console.log('data: ', data.params);
            //console.log('showLoading: ', showLoading)
            console.log('responseState:', response.data.code)
            console.log('responseData:', response.data.data)
            console.groupEnd();
            resolve(response);
            //commit('UPDATA_LOADING', { show: false })
        }).catch(error => {
            //commit('UPDATA_LOADING', { show: false })
            commit('UPDATA_AXIOS_ERROR', '请求服务器失败！')
            reject(error);
        })
    })
}
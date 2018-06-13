
// API
import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui';
const instance = axios.create({
    baseURL: '/admin/',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30 * 1000
})

const fetch = function (option) {
    return new Promise((resolve, reject) => {
        instance(option).then(response => {
            //console.log(response)
            if(response.status===200){
                if(response.data.code===0){
                    resolve(response.data)
                }else{
                    console.log(response.data.msg)
                    Message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error',
                        center: true
                    });
                }
            }else{
                Message({
                    showClose: true,
                    message: '请求出错！',
                    type: 'error',
                    center: true
                });
            }
        }).catch(error => {
            Message({
                showClose: true,
                message: '服务端错误！',
                type: 'error',
                center: true
            });
            reject(error)
        })
    })
}


export {fetch}

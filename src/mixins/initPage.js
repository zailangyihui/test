import { mapGetters } from 'vuex'
import {getCookie} from '@/utils/Cookie'

const initPage = {
    data(){
        return {
            
        }
    },
    computed: {
        ...mapGetters(['user', 'theme']),
    },
    methods: {
        initUser(){
            let userStr = getCookie('userinfo')
            console.log(userStr)
            if(userStr != 'undefined') {
                let userinfo = JSON.parse(userStr);
                console.log('user:', userinfo)
            }
        },
        loginOut(){

        }
    },
    created(){
        this.initUser()
    }
}
export { initPage }
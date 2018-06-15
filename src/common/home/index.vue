<template>
	<div class="home">
		<el-container>
			<admin-header></admin-header>
			<admin-aside></admin-aside>
			<admin-navi></admin-navi>
			<el-main :class="packupClass">
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
			</el-main>
			<el-footer style="display: none" :class="packupClass">Footer</el-footer>
			
		</el-container>
	</div>
</template>

<script>
import adminHeader from '@/components/Header'
import adminAside from '@/components/Aside'
import adminNavi from '@/components/Navi'
import {getCookie, setCookie, delCookie} from '@/utils/Cookie'
import { initPage } from '@/mixins/initPage.js'
import { mapGetters } from 'vuex'
export default {
	name: 'Home',
	components: {
		adminHeader, adminAside, adminNavi
	},
	mixins:[initPage],

	data() {
		return {
			packupClass: '',
		}
	},
	computed: {
		...mapGetters(['user', 'asideState']),
	},
	watch:{
		'asideState': function(state){
			console.log(state)
			if(state === 'packup') {
				this.packupClass = 'packup'
			}else{
				this.packupClass = ''
			}
		}
	},
	methods: {
		 
    },
    mounted() {

	},
}
</script>

<style lang="less" scoped>
@import 'element-ui/lib/theme-chalk/display.css';
@import '../../assets/css/base.less';
.el-main{.fix; left: 220px; bottom: 30px; right: 0; top: 100px; padding: 0; z-index: 3; background-color: #F1F4F5; color: #333;
	&.packup {left: 80px;}
}
.el-footer {.fix; bottom: 0; left: 220px; right: 0; .h(30px);.lh(30px);
	&.packup {left: 80px;}
}
</style>
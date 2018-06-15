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
.el-main{.fix; left: 220px; bottom: 30px; right: 0; top: 100px; background-color: #F1F4F5; color: #333;
	&.packup {left: 80px;}
}
.el-footer {.fix; bottom: 0; left: 220px; right: 0; .h(30px);.lh(30px);
	&.packup {left: 80px;}
}
	
	
	.collapse-width .el-aside{
		width: 90px !important;
	}
	.collapse-width .el-footer,
	.collapse-width .el-main,
	.collapse-width .el-nav {
		left: 90px;
	}
	
	.logodiv {
		float: left;
		height: 60px;
		width: 180px;
		line-height: 60px;
		padding: 0 20px;
		text-align: left;
		color: #fff;
		font-size: 20px;
		border-right: 1px solid rgba(238, 241, 146, 0.3);
	}
	.collapse-width .logodiv {
		width: 90px;
		padding: 0;
	}
	
	.el-submenu,
	.el-menu-item {
	    text-align: left;
	}
	.el-submenu .el-menu-item {
		text-align: center;
	}
	.tools {
		width: calc(100% - 420px);
		height: 60px;
		line-height: 60px;
		margin-left: 220px;
		text-align: left;
		padding-left: 30px;
		color: #fff;
		cursor: pointer;
	}
	
	.collapse-width .tools {
		margin-left: 90px;
	}
	.nav-ic {
		height: 56px;
		line-height: 56px;
		position: relative;
	}
	
	.little-nav-ul {
		position: absolute;
		left: 60px;
		top: 0;
		padding: 0;
		margin: 0;
		width: 200px;
		background-color: #e4e8f1;
		display: none;
	}
	.little-nav-ul li {
		height: 56px;
		line-height: 56px;
		text-align: center;
		list-style: none;
		color: #222;
		font-size: 14px;
	}
	.little-nav-ul li:hover {
		background-color: #C3C5CA;
	}
	.el-aside, .el-main{
		overflow: initial !important;
	}
	.nav-ic:hover .little-nav-ul {
		display: block;
	}
	.el-submenu .el-menu-item[data-v-5e265133] {
		text-align: left;
	}
	.lnshow {
		display: none;
	}
	.lnshow .rnlistul {
		padding: 0;
		margin: 0;
		position: absolute;
		top: 60px;
		right: -20px;
		background-color: #fff;
		display: none;
	}
	.lnshow .rnlistul li {
		padding: 10px 20px;
		min-width: 100px;
		font-size: 14px;
	}
	.lnshow:hover .rnlistul {
		display: block;
	}
	.icon-more {
		margin-top: 10px;
		color: #fff;
	}
	.toolsul .lnhid .iconfont {
		margin-right: 0;
	}
	.toolsul .lnhid span {
		position: relative;
		top: -2px;
	}
	@media only screen and (max-width: 768px) {
		.loginout {
			top: 8px;
		}
		.el-main {
			padding: 20px 10px;
		}
		.collapse-width .el-footer,
		.collapse-width .el-main,
		.collapse-width .el-nav {
			left: 0px;
		}
		.collapse-width .logodiv {
			width: 0px;
			padding: 0;
		}
		.collapse-width .tools {
			margin-left: 0px;
		}
		.collapse-width .el-aside{
			width: 0 !important;
		}
		.tools {
			padding-left: 1px;
		}
		.lnhid {
			display: none;
		}
		.lnshow {
			display: block;
		}
		.minhid {
			display: none;
		}
	}
</style>
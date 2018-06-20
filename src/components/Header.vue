<template>
	<el-header :class="theme">
		<div class="logo">点餐后台管理</div>
		<span class="arrow" @click="toggleLeftMenus"><i class="el-icon-menu"></i></span>
		<div class="menu">
			<ul>
				<li class="lnhid" 
				:class="{'active' :  currentID===item.id}"
				v-for="(item,index) in topMenus" 
				:data-id="item.id"  
				@click="changeMenu(item.id)"
				>
					<i class="iconfont icon-diancan1"></i>
					<span>{{item.text}}</span>
				</li>
			</ul>
		</div>
		<div class="toolbar" :class="theme">
			<span class="userno hidden-xs-only">{{user.nikeName}}</span>
			<img src="../assets/header.jpg" width="40px" class="hpic hidden-xs-only"/>
			<span class="loginout"><i class="iconfont icon-tuichu" @click="loginOut"></i></span>
		</div>
	</el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import {getCookie, setCookie, delCookie} from '@/utils/Cookie'

import { getMenus } from '@/api/common.js'
export default {
	name: 'Header',
	
	data() {
		return {
			currentID: '',
		}
	},
	computed: {
		...mapGetters(['user', 'menus', 'topMenus', 'asideState', 'theme']),
	},
    methods:{
    	toggleLeftMenus(){
    		let state = this.asideState === 'unfold' ? 'packup' : 'unfold'
    		this.$store.commit('UPDATA_ASIDE_MENUS_STATE', state)
    	},
    	changeMenu(id){
    		this.currentID = id
    		this.$store.commit('UPDATA_TOP_MENUS_CURRENT', id)
    	},
    	loginOut(){
    		delCookie('userinfo')
    		this.$store.commit('UPDATA_USER', {})
    		this.$router.push({path: '/'});
    	}
    },
    created(){
    	getMenus({uid: this.user.id}).then( res => {
			console.log(res.data,"--------------")
    		this.$store.commit('UPDATA_MENUS', res.data.treeMenu)
    		this.currentID = this.topMenus[0].id
    	})
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/base.less';
.el-header{ .fix; top: 0; left: 0px; right: 0; z-index: 2;.h(60px); background: @blue; color: #333; .tc;.ovh;
	.logo {
		.fl;.tc;.w(220px);.h(60px);.lh(60px); color: @white;.fs(20px); border-right: 1px solid rgba(238, 241, 146, 0.3); 
	}
	.arrow {.fl; .h(60px);.lh(60px);.p(0 15px); color: @white; cursor: pointer;}
	.menu {
		li {.fl;.h(60px);.lh(60px);.p(0 15px); color: @white; cursor: pointer;
			i {.fs(20px);.vm;}
			span {.dib;.vm;}
			&:hover,&.active{background-color: rgba(0,0,0,.1);};
		}
	}
	.toolbar {.abs; right: 0; top: 0;.fr;.pl(10px);
		.userno {color: @white;}
		.hpic {.bdr(50px);}
		.loginout {.dib;.w(50px);.h(60px);.lh(60px);.tc; cursor: pointer;
			.iconfont {color: @white;}
		}
	}
}
</style>
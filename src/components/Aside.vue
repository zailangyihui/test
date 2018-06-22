<template>
	<el-aside :class="asideState">
		<el-row>
			<el-col :span="24">
				<el-menu :default-active="String(currentLeftMenu)" @open="onOpen" @close="onClose" 
				background-color="#22323A" text-color="#93A3AC" active-text-color="#50A8F6"
				>
					<template v-for="(item,index) in leftMenus">
						<el-menu-item :index="String(item.id)" 
						:class="{'active' :  currentLeftMenu==item.url}"
						v-if="!item.children.length" 
						@click="gotoPage(item)">
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title">{{item.text}}</span>
						</el-menu-item>
						<el-submenu :index="String(item.id)" v-else>
							<template slot="title">
								<i class="iconfont" :class="item.icon"></i>
								<span>{{item.text}}</span>
							</template>
							<el-menu-item-group v-if="item.children">
								<template v-for="(itemChild, indexChild) in item.children">
									<el-menu-item :index="String(itemChild.id)" 
									:class="{'active' :  currentLeftMenu==itemChild.url}"
									@click="gotoPage(itemChild)"><i class="iconfont" :class="itemChild.icon"></i>{{itemChild.text}}</el-menu-item>
								</template>
							</el-menu-item-group>
						</el-submenu>
					</template>
				</el-menu>
			</el-col>
		</el-row>
	</el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Aside',
	data() {
		return {
			currentMenuText: '系统管理', 
		}
	},
	computed: {
		...mapGetters(['leftMenus', 'asideState', 'currentLeftMenu']),
	},
	watch:{
		'asideState': function(state){
			console.log(state)
			//if(state === 'packup') this.$menu.close()
		}
	},
    methods:{
    	onOpen(){
    		console.log('open...')
    		this.$store.commit('UPDATA_ASIDE_MENUS_STATE', 'unfold')
    	},
    	onClose(){
    		console.log('close...')
    	},
    	gotoPage(obj){
    		console.log('url:',obj.url)
    		this.$store.commit('ADD_NAVI', obj)
    		this.$store.commit('UPDATA_CURRENT_NAVI', obj.url)
    		this.$store.commit('UPDATA_CURRENT_LEFT_MENU', obj.url)
    	}
    },
    created(){

    }
}

</script>


<style lang="less" >
@import '../assets/css/base.less';
@bgMenus: #22323A;
@bgHover: #2E4350;
@menusColor: #93A3AC;
@menusCurrent: #50A8F6;
.el-aside {.fix; top: 60px; left: 0; bottom: 0; z-index: 1; width: 220px!important; .tl; background-color: @bgMenus;
	.types { .h(56px);.lh(56px);.tl;.pl(45px); color: @white; }
	.el-menu { background: @bgMenus;border:0;
		.el-menu-item {.w(100%);.rel; color:@menusColor;
			.iconfont{.fs(16px);.mr(5px);}
			&.active{ color: #50A8F6 !important;
				i {color: #50A8F6 !important;}
			}
			&:hover{ background: @bgHover };
		}
		.el-submenu { 
			.iconfont{.fs(16px);.mr(5px);}
			span {color: @menusColor !important;}
			&:hover{ background: @bgHover };
		}
		.el-menu-item-group__title {.hide;}
	}
	//收起状态
	&.packup { width: 80px !important;
		.el-menu { 
			.el-menu-item,.el-submenu__title {
				.iconfont { .db;.fs(20px); .abs; left: 28px; top: 0; }
				span {.hide; .w(100%); .abs; left: 0; top: 0;.tc;}
				.el-icon-arrow-down {.hide;}
				&:hover{ 
					.iconfont {.hide;}
					span {.db;  }
				}
			}
			.el-submenu__title+ul{.hide;};
		}
	}
}
@media (max-width: 767px){
	.el-aside.packup {width: 0px !important;}
}
</style>
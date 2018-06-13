<template>
	<el-aside :class="asideState">
		<el-row>
			<el-col :span="24">
				<el-menu default-active="-1" @open="handleOpen" @close="handleClose" 
				background-color="#22323A" text-color="#93A3AC" active-text-color="#50A8F6"
				>
					<template v-for="(item,index) in leftMenus">
						<el-menu-item :index="String(index)" 
						:class="{'active' :  currentLeftMenu==item.id}"
						v-if="!item.children.length" 
						@click="gotoPage(item)">
							<i class="iconfont icon-Management"></i>
							<span slot="title">{{item.text}}</span>
						</el-menu-item>
						<el-submenu :index="String(index)" v-else>
							<template slot="title">
								<i class="iconfont icon-Management" :class="item.icon"></i>
								<span>{{item.text}}</span>
							</template>
							<el-menu-item-group v-if="item.children">
								<template v-for="(itemChild, indexChild) in item.children">
									<el-menu-item :index="String(indexChild)" 
									:class="{'active' :  currentLeftMenu==itemChild.id}"
									@click="gotoPage(itemChild)"><i class="iconfont" :class="item.icon"></i>{{itemChild.text}}</el-menu-item>
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
import { TYPEID } from '@/utils/Link'
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
    	handleOpen(){
    		console.log('open...')
    		this.$store.commit('UPDATA_ASIDE_MENUS_STATE', 'unfold')
    	},
    	handleClose(){
    		console.log('close...')
    	},
    	gotoPage(obj){
    		console.log('url:',obj.id)
    		this.$store.commit('ADD_NAVI', obj)
    		this.$store.commit('UPDATA_CURRENT_NAVI', obj.id)
    		this.$store.commit('UPDATA_CURRENT_LEFT_MENU', obj.id)
    		this.$router.push({'path': TYPEID[obj.id]})
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
	.el-menu { background: @bgMenus;
		.el-menu-item {.w(100%);.rel; color:@menusColor;
			.iconfont{.fs(16px);.mr(5px);}
			&.active{  }
			&:hover{ background: @bgHover };
		}
		.el-submenu { 
			.iconfont{.fs(16px);.mr(5px);}
			span {color: @menusColor}
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
</style>
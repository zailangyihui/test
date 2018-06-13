<template>
	<el-aside>
		<div class="wrap">
			<div class="header" :class="selected ? 'active' : ''" @click="getUserList()">
				<i class="iconfont icon-quanbutouziren"></i>&nbsp;&nbsp;所有用户
				<span class="allcount">
					{{allcount}}
				</span>
			</div>
			<div class="line"></div>
			<div class="content">
				<p class="title">角色</p>
				<ul class="list">
					<li class="item" v-for="(item,index) in roleList" :class="item.selected ? 'active' : ''" @click="getUserList(item.Id,index)">
						<span class="rolename">{{item.roleName}}</span>
						<span class="count">{{item.userCount}}</span>
						<span class="operate">
							<i class="iconfont icon-bianji" @click.stop="editRole(item.Id,item.roleName)"></i>&nbsp;
							<i class="el-icon-close" @click.stop="delRole(item.Id)"></i>
						</span>
					</li>
				</ul>
			</div>
			<div class="line"></div>
			<div class="btn-add-role" @click="addrole">
				<i class="el-icon-plus"></i> 添加新角色
			</div>
		</div>
		<span class="btnToggle" @click="toggleAside">
			<i :class="isopen ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
		</span>
	</el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRoleList } from '@/api/userManager.js'
export default {
	name: 'UserManagerAside',
	data() {
		return {
			isopen:true,
			selected: true,
			roleList:[],
		}
	},
	computed: {
		...mapGetters(['asideState']),
		allcount: function(){
			return this.roleList.reduce((total, item )=>{
  				return total + item.userCount;
			}, 0)
		}
	},
	watch:{
		'asideState': function(state){
			console.log(state)
			//if(state === 'packup') this.$menu.close()
		}
	},
    methods:{
    	async getRole(){
    		this.roleList = await getRoleList()
    	},
    	getUserList(){
    		this.$commit('getuserlist', true)
    	},
    	addRole(){
    		console.log('open...')
    		this.$store.commit('UPDATA_ASIDE_MENUS_STATE', 'unfold')
    	},
    	editRole(){

    	},
    	delRole(){

    	},
    	toggleAside(){

    	}
    },
    created(){
    	this.getRole()
    }
}

</script>


<style lang="less" scoped>
@import '../../assets/css/base.less';
@bdcolor: #e4eaec;
@gray1: #76838f;
@gray2: #526069;
.el-aside {.abs;top: 0;bottom: 0;left: 0;.w(220px);.pt(20px); .fs(14px);border-right: 1px solid @bdcolor;background: @white;z-index: 10;
	.wrap {.abs; bottom: 0;top: 0;left: 0;.w(220px); overflow-y: auto;overflow-x:hidden; 
		.header { padding: 20px;
			.iconfont {}
			.allcount {.fr; color: @blue;}
		}
		.line{border-bottom: 1px solid @bdcolor;margin: 0px 12px;}
		.content { padding: 0 20px;
			.title {color:@gray2; .h(50px); .lh(50px);.fb;}
			.list {
				.item {.rel;.h(40px); .lh(40px);
					.rolename {color: @gray; cursor: pointer;}
					.count {.fr; color: @blue;}
					.operate {.abs; right: 0; top: 0; .hide;
						i {.fs(18px);.fb; color: @gray + 50;
							&:hover {color: @blue; cursor: pointer;}; 
						}
					}
					&.active {color: @blue;}
					&:hover {
						.count {.hide;}
						.operate {.db;}
					};
				}
			}
		}
		.btn-add-role {.h(50px); .lh(50px); .mt(15px); .p(0 20px); color: @gray1; cursor: pointer;
			i {.fs(16px);.fb;}
		}
	}
	.btnToggle {.abs; .fs(20px); .dib; z-index: 1000; .p(15px 8px;);left: calc(100% - 1px);top: calc(50% - 40px);border-radius: 0 100px 100px 0;box-shadow: 1px 0 3px rgba(0,0,0,.2);background-color: #fff;
	}
}
</style>
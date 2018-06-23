<template>
	<div class="aside">
		<div class="aside_content">
			<div class="header" :class="selected ? 'active' : ''" @click="queryUserList()">
				<i class="iconfont icon-quanbutouziren"></i>&nbsp;&nbsp;所有用户
				<span class="allcount">
					{{allcount}}
				</span>
			</div>
			<div class="line"></div>
			<div class="content">
				<p class="title">角色</p>
				<ul class="list">
					<li class="item" v-for="(item,index) in roleList"
					:class="item.selected === 1 ? 'active': ''"
					@click="queryUserList({roleId: item.id})">
						<span class="rolename">{{item.roleName}}</span>
						<span class="count">{{item.userCount}}</span>
						<span class="operate">
							<i class="iconfont icon-bianji" @click.stop="editRole(item.id,item.roleName)"></i>&nbsp;
							<i class="el-icon-close" @click.stop="delRole(item.id)"></i>
						</span>
					</li>
				</ul>
			</div>
			<div class="line"></div>
			<div class="btn-add-role" @click="addRole">
				<i class="el-icon-plus"></i> 添加新角色
			</div>
		</div>
		<span class="btnToggle" @click="toggleAside">
			<i :class="isOpenAside ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
		</span>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRoleList, deleteRole } from '@/api/userManager.js'
export default {
	name: 'UserManagerAside',
	props:['isOpenAside'],
	data() {
		return {
			selected: true,
			roleList:[],
		}
	},
	computed: {
		...mapGetters(['asideState', 'updataRoleList']),
		allcount: function(){
			return this.roleList.reduce((total, item )=>{
  				return total + item.userCount;
			}, 0)
		}
	},
	watch:{
		'updataRoleList': function(state){
			console.log(state)
			if(state) this.getRole()
		}
	},
    methods:{
    	async getRole(){
    		let list =  await getRoleList()
    		this.roleList = list.map((item)=>{
    			return {
    				id: item.id,
    				roleName: item.roleName,
    				userCount: item.userCount,
    				selected: 0,
    			}
    		})
    	},
    	queryUserList(params){
    		if(params!=undefined){
    			let record = null
    			this.roleList.forEach((item) => {
    				item.selected = 0
    				if(item.id === params.roleId) {
    					item.selected = 1
    				}
    			})
    			this.selected = false
    		}else{
    			this.roleList.forEach((item) => {
    				item.selected = 0
    			})
    			this.selected = true
    		}
    		this.$emit('query-user-list', params)
    	},
    	addRole(){
    		console.log("点击添加角色")
    		this.$emit('add-role')
    	},
    	editRole(id, name){
    		console.log(id, name)
    		this.$emit('edit-role', id, name)
    	},
    	delRole(id){
    		this.$confirm('您确定删除该角色吗?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then( async ()  => {
	        	let result = await deleteRole({ 'roleId': id })
	        	if(result.code === 0){
	        		this.$message({type: 'success', message: '删除成功!'}) 
	        		this.getRole()
	        	}
	        }).catch(() => {          
	        });
    	},
    	toggleAside(){	
    		this.$emit('toggle-aside', !this.isOpenAside);
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
.aside {.abs;top: 0;bottom: 0;left: 0;.w(220px);.pt(20px); .fs(14px);border-right: 1px solid @bdcolor;background: @white; z-index: 10;
	.aside_content{.abs;bottom: 0;top: 0;left: 0;.w(220px);overflow-y: auto;overflow-x: hidden;
		.header { .p(25px 20px 35px 20px); cursor: pointer;
			.iconfont {}
			.allcount {.fr; color: @blue;}
			&.active{color: @blue;}
		}
		.line{border-bottom: 1px solid @bdcolor;margin: 0px 12px;}
		.content { padding: 0 20px;
			.title {color:@gray2; .h(50px); .lh(50px);.fb;}
			.list { max-height: 500px; overflow-y: auto;
				.item {.rel;.h(40px); .lh(40px);
					.rolename {color: @gray; cursor: pointer;}
					.count {.fr; color: @blue;}
					.operate {.abs; right: 0; top: 0; .hide;
						i {.fs(18px);.fb; color: @gray + 50;
							&:hover {color: @blue; cursor: pointer;}; 
						}
					}
					&.active {color: @blue; 
						.rolename {color: @blue; }
					}
					&:hover {
						.count {.hide;}
						.operate {.db;}
					};
				}
			}
		}
	}
	.btn-add-role {.h(50px); .lh(50px); .mt(15px); .p(0 20px); color: @gray1; cursor: pointer;
		i {.fs(16px);.fb;}
	}
	.btnToggle {.abs; .hide; .fs(20px); z-index: 1000; .p(15px 8px;); right: -36px;top: calc(50% - 10px);border-radius: 0 100px 100px 0;box-shadow: 1px 0 3px rgba(0,0,0,.2);background-color: #fff; cursor: pointer;
	}
	@media (max-width: 767px){
		.btnToggle {display: block; }
	}
}
&.close{
	.aside{
		.aside_content{width: 0 !important;}
	}
}
</style>
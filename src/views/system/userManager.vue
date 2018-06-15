<template>
	<section class="userManager" :class="isOpenAside ? 'open' : 'close'">
		<user-manager-aside class="el-aside-usermanager"
		v-on:toggle-aside="toggleAside"
		v-on:query-user-list="queryUserList"
		v-on:updata-role-tree="updataRoleTree" 
		v-on:add-role="addRole"
		v-on:edit-role="editRole"></user-manager-aside>

		<div class="main">
			<el-col :span="24" class="filters">
				<el-form :inline="true">
					<el-form-item>
						<el-input v-model="searchKey" size="small" placeholder="输入用户名/昵称查询"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="queryUserList({'roleId': roleId, 'search': searchKey })" size="small">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addUser" size="small">添加</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<template>
			<el-table :data="userList" border style="width: 100%" :height="tableheight">
			    <el-table-column prop="accounts" label="用户名">
			    </el-table-column>
			    <el-table-column prop="nikeName" label="昵称">
			    </el-table-column>
			    <el-table-column prop="createTime" label="注册时间">
			    </el-table-column>
			    <el-table-column prop="lastTime" label="最后登录">
			    </el-table-column>
			    <el-table-column prop="loginCount" label="登录次数">
			    </el-table-column>
			    <el-table-column prop="ip" label="登录IP">
			    </el-table-column>
			    <el-table-column label="操作">
				    <template slot-scope="scope">
				        <el-button @click="eidtUser(scope.row)" type="text" size="small">编辑</el-button>
				        <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
				    </template>
			    </el-table-column>
			</el-table>
			</template>
			<div class="block">
				<el-pagination 
				@size-change="onChangePageSize" 
				@current-change="pageNavi" 
				:current-page="currentPage" 
				:page-sizes="[10, 20, 30, 40]" 
				:page-size="100" 
				:layout="isOpenAside ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'" 
				:total="total"></el-pagination>
			</div>
		</div>

		<dialog-role
		:dialogRole="dialogRole"
		v-on:close-edit-role="dialogRole.show=false"></dialog-role>

		<dialog-user
		:dialogUser="dialogUser"
		v-on:close-add-user="dialogUser.show=false"
		></dialog-user>
	</section>
</template>

<script>
import userManagerAside from '@/components/userManager/aside'
import dialogRole from '@/components/userManager/dialogRole'
import dialogUser from '@/components/userManager/dialogUser'
import { getRoleTree, getUserList } from '@/api/userManager.js'

export default {
	components: {
		userManagerAside, dialogRole, dialogUser
	},
	data() {
		return {
			isOpenAside: true,
			roleId: '',

			userList: [],
			searchKey: '',

			dialogRole: {
				show: false,
				title: '',
				loading: false,
				type: '',
				roleId: '',
				rolename: '',
				menuTree: [],
				checkedTree: [],
			},

			dialogUser: {
				show: false,
				title: '',
				id: '',
				type: '',
				loading: false
			},

			total: 0,
			currentPage: 1,
			pageSize: 10,

			tableheight: "530",
			

	        //count: 1,
		}
	},
	
	methods: {
		async updataRoleTree(params){
			let data = await getRoleTree(params)
			this.dialogRole.menuTree = data.menu
			this.dialogRole.checkedTree = data.defaultMenu
		},
		async queryUserList(params){
			let result = await getUserList(params)
			this.userList = result.data.rows
			this.total = result.data.total
		},
		addRole(){
			this.dialogRole.show = true
			this.dialogRole.title = '添加角色'
			this.dialogRole.loading = true
			this.dialogRole.roleId = ''
			this.dialogRole.roleName = ''
			this.dialogRole.type = 'add'
			this.updataRoleTree({'roleId': ''})
			this.dialogRole.loading = false
		},
		editRole(id, name){
			this.dialogRole.title = `编缉角色（${name}）`
			this.dialogRole.show = true
			this.dialogRole.loading = true
			this.dialogRole.roleId = id
			this.dialogRole.roleName = name
			this.dialogRole.roleType = 'edit'
			this.updataRoleTree({'roleId': id})
			this.dialogRole.loading = false
		},
		addUser(){
			this.dialogUser.show = true;
			this.dialogUser.title = `添加用户`
			this.dialogUser.type = 'add'
	      	console.log('add user...', this.shwoUserDialog)
		},
		eidtUser(row){
			console.log(row)
			this.dialogUser.show = true;
			this.dialogUser.title = `编缉用户（${row.nikeName}）`
			this.dialogUser.type = 'edit'
		},
		deleteUser(row){
			console.log(row)
			this.$confirm('您确定删除该用户吗?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then( async ()  => {
	        	let result = await deleteUser({ 'userId': row.id })
	        	if(result.code === 0){
	        		this.$message({type: 'success', message: '删除成功!'}) 
	        		this.queryUserList({'roleId': this.roleId})
	        	}
	        }).catch(() => {          
	        });
		},
		toggleAside(data){
			if(data==='open'){
				this.isOpenAside = true
			}else{
				this.isOpenAside = false
			}
		},
		onChangePageSize(val) {
			this.pageSize = val;
			if(Math.ceil(this.total / this.pageSize) >= this.currentPage) {
				this.queryUserList({
					'pageCount': (this.currentPage - 1) * this.pageSize, 
					'pageSize': this.pageSize,
				});
			}
		},
		pageNavi(val) {
			this.currentPage = val;
			this.queryUserList({
				'pageCount': (val - 1) * this.pageSize,
				'pageSize': this.pageSize,
			})
		},
		init(){
			var width = document.body.clientWidth;
			//console.log(width)
            if(width <= 767){
				this.isOpenAside = false;
			} else {
				this.isOpenAside = true;
			}
		},
	},
	created() {
		this.queryUserList({
			'pageCount': 0, 
			'pageSize': this.pageSize,
		});
		this.$nextTick(function(){
			var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				this.init();
				var self = this;
				window.onresize=function(){  
					self.init()
	            }  
			this.tableheight = height - 280;
		})
	},
}
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
.userManager {
	.main {.ml(230px); 
		.filters {
			.el-form-item {.m(5px 5px 5px 0);}
			.el-button--small, .el-button--small.is-round {padding: 9px 15px;}
		}
		.el-pagination {text-align: center; margin-top: 10px; }
	}
	
	&.close {
		.el-aside-usermanager {width: 0 !important; overflow: inherit;}
		.main {margin-left:0px !important; }
	}
}
</style>
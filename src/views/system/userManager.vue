<template>
	<section class="userManager" :class="isOpenAside ? 'open' : 'close'">
		<user-manager-aside class="el-aside-usermanager"
		v-on:toggle-aside="toggleAside"
		v-on:query-user-list="getTableData"
		v-on:updata-role-tree="updataRoleTree" 
		v-on:add-role="addRole"
		v-on:edit-role="editRole"></user-manager-aside>

		<div class="main">
			<el-col :span="24" class="filters">
				<el-form :inline="true">
					<el-form-item>
						<el-input v-model="keyWord" size="small" placeholder="输入用户名/昵称查询"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getTableData" size="small">查询</el-button>
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
				@current-change="onGotoPage" 
				:current-page="pagenavi.current" 
				:page-sizes="pagenavi.sizes" 
				:page-size="pagenavi.size" 
				:layout="pagenavi.layout" 
				:total="pagenavi.total"></el-pagination>
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
import { initPage } from '@/mixins/initPage.js'

export default {
	name: 'UserManager',
	mixins:[initPage],
	components: {
		userManagerAside, dialogRole, dialogUser
	},
	data() {
		return {
			roleId: '',
			userList: [],
			keyWord: '',
			dialogRole: {
				show: false,
				title: '',
				loading: false,
				type: '',
				roleId: '',
				roleName: '',
				menuTree: [],
				checkedTree: [],
			},
			dialogUser: {
				show: false,
				title: '',
				name: '',
				id: '',
				type: 'add',
				loading: false
			},
		}
	},
	
	methods: {
		async updataRoleTree(params){
			let data = await getRoleTree(params)
			this.dialogRole.menuTree = data.menu
			this.dialogRole.checkedTree = data.defaultMenu
		},
		async getTableData(params){
			let data = {
				'roleId': this.roleId,
				'pageCount': this.pagenavi.count, 
				'pageSize': this.pagenavi.size, 
				'search': this.keyWord,
			}
			let queryData = Object.assign(data, params)
			if(queryData.roleId){
				this.roleId = queryData.roleId
			}
			let result = await getUserList(queryData)

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
			this.updataRoleTree()
			this.dialogRole.loading = false
		},
		editRole(id, name){
			this.dialogRole.title = `编缉角色（${name}）`
			this.dialogRole.show = true
			this.dialogRole.loading = true
			this.dialogRole.roleId = id
			this.dialogRole.roleName = name
			this.dialogRole.type = 'edit'
			this.updataRoleTree({'roleId': id})
			this.dialogRole.loading = false
		},
		addUser(){
			this.dialogUser.show = true;
			this.dialogUser.title = `添加用户`
			this.dialogUser.type = 'add'
	      	console.log('add user...')
		},
		eidtUser(row){
			console.log(row)
			this.dialogUser.show = true;
			this.dialogUser.title = `编缉用户（${row.nikeName}）`
			this.dialogUser.type = 'edit'
			this.dialogUser.id = row.id
			this.dialogUser.accounts =row.accounts
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
	        		this.getTableData()
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
	},
	created() {
		this.getTableData();
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
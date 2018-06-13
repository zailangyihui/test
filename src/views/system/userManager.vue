<template>
	<section :class="isopen ? '' : 'close'">
		<user-manager-aside 
		v-on:queryUserList="onQueryUserList" 
		v-on:add-role="onAddRole"
		v-on:edit-role="onEditRole"></user-manager-aside>

		<div class="main">
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters">
					<el-form-item>
						<el-input v-model="filters.search" size="small" placeholder="输入用户名/昵称查询"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="querylist(filters.roleId,filters.roleIndex)" size="small">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addOneUser" size="small">添加</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<template>
			<el-table :data="tableData" border style="width: 100%" :height="tableheight">
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
				        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
				        <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
				    </template>
			    </el-table-column>
			</el-table>
			</template>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" :layout="isopen ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'" :total="total">
				</el-pagination>
			</div>
		</div>
		

		<edit-role :show="shwoEditDialog"
		:showLoading='showLoading'
		:roleType="roleType"
		:roleId = "roleId"
		:roleName="roleName" 
		:menuTree="menuTree"
		:checkedTree="checkedTree"
		v-on:close-edit-role="shwoEditDialog=false"></edit-role>
	</section>
</template>

<script>
import userManagerAside from '@/components/userManager/aside'
import editRole from '@/components/userManager/editRole'
import { getRoleTree, getUserList } from '@/api/userManager.js'

	export default {
		components: {
			userManagerAside, editRole
		},
		data() {
			return {
				shwoEditDialog: false,
				showLoading: false,
				roleId: '',
				roleName: '',
				roleType: '',
				menuTree: [],
				checkedTree: [],





				loading: true,
				isopen:true,
				addRoleVisible:false,
				editorRoleVisible:false,
				addUserVisible:false,
				updateUserVisible:false,
				addForm:{
					role:'',
					roleId:''
				},
				addUser:{
					accounts:'',
					nickName:'',
					password:'',
					confirmpsd:'',
					roleId:''
				},
				userInfo: {},
				options:[],
				selected: true,
				filters: {
					search: '',
					roleId:'',
					roleIndex:''
				},
				tableData: [],
				total: 0,
				currentPage: 1,
				pageSize: 10,
				tableheight: "530",
				usertypes:[],
		        props: {
		          label: 'name',
		          children: 'zones',
		          isLeaf: 'leaf'
		        },
		        count: 1,
			}
		},
		
		methods: {
			async onAddRole(){
				this.shwoEditDialog = true
				this.showLoading = true
				this.roleId = ''
				this.roleName = ''
				this.roleType = 'add'
				let data = await getRoleTree({'roleId': ''})
				this.menuTree = data.menu
				this.checkedTree = []
				this.showLoading = false
			},
			async onEditRole(id, name){
				this.shwoEditDialog = true
				this.showLoading = true
				this.roleId = id
				this.roleName = name
				this.roleType = 'edit'
				let data = await getRoleTree({'roleId': id})
				this.menuTree = data.menu
				this.checkedTree = data.defaultMenu
				this.showLoading = false
			},
			async onQueryUserList(){

			},
			init(){
				var w = document.body.clientWidth;
				console.log(w)
                if(w<=767){
					this.isopen = false;
				} else {
					this.isopen = true;
				}
			},
			handleClick(row){
				console.log(row)
				this.userInfo = row
				this.updateUserVisible = true;
			},
			deleteUser(row){
				console.log(row)
			},
			/*getUserList(pageCount,pageSize){
				var me = this;
				this.$store.dispatch('axiosPost', { url: 'ROLEUSERLIST', params: {roleId:this.filters.roleId,pageCount:pageCount,pageSize:pageSize,search:this.filters.search} }).then(res => {
					var data = res.data;
					console.log(res,"===1111")
					if(data.code == 0) {
						var data = data.data;
						var list = [];
						for(var id in data){
							if(data[id].itemtype == "tot"){
								me.total = data[id].counts
							} else {
								list.push(data[id]);
							}
						}
						me.tableData = list;
					}
				});
			},*/
			/*getRoleList(sp,type){
				console.log("4324444444444","取角色列表")
				var me = this;
				this.$store.dispatch('axiosPost', { url: 'ROLEINIT', params: {} }).then(res => {
					var data = res.data;
					console.log(res,"===6666666666666666666666777777777777")
					if(data.code == 0) {
						var data = data.data;
						var tot = 0;
						for(var id in data){
							data[id].selected = false;
							tot += data[id].userCount;
						}
						me.usertypes = data;
						me.allcount = tot;
						if(sp){
							console.log("423daolemeiy",me.filters.roleId)
							var flag = true;
							for(var id in me.usertypes){
								console.log(me.usertypes[id].Id,me.filters.roleId,me.usertypes[id].Id == me.filters.roleId)
				        		if(me.usertypes[id].Id == me.filters.roleId){
				        			me.usertypes[id].selected = true;
				        			me.selected = false;
				        			flag = false;
				        			if(type=="insertuser"){
				        				me.querylist(me.filters.roleId,id);
				        			}
				        			break;
				        		}
							}
							console.log(flag,"flag")
							if (me.filters.roleId == "" || me.filters.roleId == null) {
								if(type=="insertuser"){
					        		me.querylist(me.filters.roleId);
					        	}
					       	} else {
					       		console.log("ladddddddddddddddddddddd",flag)
					       		if(type=="deleterole" && flag){
				        			me.querylist();
				        		}
					       }
						}
					}
				});
			},*/
			changisopen(){
				this.isopen = !this.isopen
			},
			handleSizeChange(val) {
				this.pageSize = val;
				if(Math.ceil(this.total / this.pageSize) >= this.currentPage) {
					this.getUserList((this.currentPage - 1) * this.pageSize,this.pageSize);
				}
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getUserList((val - 1) * this.pageSize,this.pageSize);
			},
			querylist(id,index){
				console.log(id,index,"000000000000000")
				var me = this;
				this.filters.roleId = id;
				this.filters.roleIndex = index;
				this.$store.dispatch('axiosPost', { url: 'ROLEUSERLIST', params: {roleId:id,pageCount:0,pageSize:this.pageSize,search:this.filters.search} }).then(res => {
					var data = res.data;
					console.log(res,"===6666666666666666666666")
					if(data.code == 0) {
						me.selected = false;
						for(var id in me.usertypes){
							me.usertypes[id].selected = false;
						}
						if(index != null){
							me.usertypes[index].selected = true;
						} else {
							me.selected = true;
						}
						var data = data.data;
						var list = [];
						for(var id in data){
							if(data[id].itemtype == "tot"){
								me.total = data[id].counts
							} else {
								list.push(data[id]);
							}
						}
						me.tableData = list;
					}
				});
			},

			saveRole(){  //保存角色
				console.log("保存角色")
				if(!this.addForm.role) {
					this.$message.error('请输入角色名称！');
					return;
				}
				var menu = this.$refs.tree.getCheckedNodes();
				var menuIds = [];
				console.log(menu);
				if(menu.length == 0){
					this.$message.error('请选择角色权限！');
					return;
				} else {
					for(var id in menu){
						menuIds.push(menu[id].id);
					}
				}
				var me = this;
				console.log(this.addForm.role,menuIds.join(","))
				this.$store.dispatch('axiosPost', { url: 'CREATEROLE', params: {roleName:this.addForm.role,menuIds:menuIds.join(",")} }).then(res => {
					console.log(res,"===保存角色及角色树形结构")
					var data = res.data;
					if(data.code == 0) {
						me.$message({
				          message: data.message,
				          type: 'success'
				       });
				       me.getRoleList(true);
					} else {
						me.$message.error(data.message);
					}
				});
			},
		    handleCheckChange(data, checked, indeterminate) {
		        console.log("========3322====",data, checked, indeterminate);
	      	},
	      	handleNodeClick(data) {
	        	console.log(data,"=3354355534");
	      	},
	      	loadNode(node, resolve) {
	      		console.log(node)
	        	if (node.level === 0) {
	          		return resolve([{ name: 'region1',leaf: false }, { name: 'region2',leaf: false }]);
	        	}
	        	if (node.level > 3) return resolve([]);
	
	        	var hasChild;
	        	if (node.data.name === 'region1') {
	          		hasChild = true;
	        	} else if (node.data.name === 'region2') {
	          		hasChild = false;
	        	} else {
	          		hasChild = Math.random() > 0.5;
	        	}
		        setTimeout(() => {
		          var data;
		          if (hasChild) {
		            data = [{
		              name: 'zone' + this.count++
		            }, {
		              name: 'zone' + this.count++
		            }];
		          } else {
		            data = [];
		          }
		
		          resolve(data);
		        }, 500);
	      	},
	      	shanchu(roleid){
	      		console.log("shanchu")
	      		this.$confirm('您确定删除该角色吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	var me = this;//USERMANAGER
					this.$store.dispatch('axiosPost', { url: 'REMOVEROLE', params: {roleId:roleid} }).then(res => {
						var data = res.data;
						console.log(res,"===1111")
						if(data.code == 0) {
							me.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					        me.getRoleList(true,"deleterole");
						}
					});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
	      	},


	      	addOneUser(){
	      	this.addUserVisible = true;
	      	var me = this;
	      	this.$store.dispatch('axiosPost', { url: 'GETROLEINFO', params: {} }).then(res => {
				console.log(res,"==取角色下拉列表")
				var data = res.data;
				if(data.code == 0) {
					console.log(data,"角色下拉列表")
					me.options = data.data;
				} else {
					me.$message.error(data.message);
				}
			});
	      },
	      cancelAddUser(){
	      	this.addUser = {
				accounts:'',
				nickName:'',
				password:'',
				confirmpsd:'',
				roleId:''
			};
			this.addUserVisible = false;
	      },
	      saveUser(){
	      	if(!this.addUser.accounts) {
				this.$message.error('请输入用户账号！');
				return;
			}
	      	if(!this.addUser.accounts) {
				this.$message.error('请输入用户昵称！');
				return;
			}
	      	if(!this.addUser.password) {
				this.$message.error('请输入用户密码！');
				return;
			}
	      	if(!this.addUser.confirmpsd) {
				this.$message.error('请再次输入密码！');
				return;
			}
	      	if(this.addUser.confirmpsd != this.addUser.password) {
				this.$message.error('输入的密码不一致！');
				return;
			}
	      	if(!this.addUser.roleId) {
				this.$message.error('请选择角色！');
				return;
			}
	      	var me = this;
	      	this.$store.dispatch('axiosPost', { url: 'MANAGERREGISTER', params: this.addUser }).then(res => {
				console.log(res,"==保存用户")
				var data = res.data;
				if(data.code == 0) {
					me.$message({
			          message: data.message,
			          type: 'success'
			        });
			        this.getRoleList(true,"insertuser");
			        me.addUser = {
						accounts:'',
						nickName:'',
						password:'',
						confirmpsd:'',
						roleId:''
					};
				} else {
					me.$message.error(data.message);
				}
			});
	      }
		},
		created() {
			//this.getUserList(0,10);
			this.$nextTick(function(){
				var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
					this.init();
					var self = this;
					window.onresize=function(){  
						self.init()
		            }  
				this.tableheight = h - 280;
			})
		},
	}
</script>

<style>
	.maxheight {
		max-height: 400px;overflow-y: auto;
	}
	.adduserbox {
		position: fixed;right: 25px;bottom: 45px;
	}
	.adduserbtn {
		width: 56px;height: 56px;border-radius: 50%;color: #fff;background-color: #46be8a;border-color: #46be8a;outline: none;box-shadow: 0 0 10px 0 rgba(60,60,60,.1);border: 1px solid transparent;
	}
	.adduserbox:hover .adduserbtn {
		background-color: #60dea7;border-color: #60dea7;
	}
	.litem {
		color: #76838f;
		cursor: pointer;
	}
	.litem:hover .rolename {
		color: #62a8ea;
	}
	.el-form-item {
	    margin-bottom: 5px;
	}
	table {
		width: initial !important;
	}
	table th,
	table td {
		padding: 10px 0px !important;
	}
	.el-dialog__wrapper {
		background-color: rgba(0,0,0,0.6);
	}
	.aside {
		position: absolute;top: 0;bottom: 0;left: 0;width: 220px;padding-top: 20px;border-right: 1px solid #e4eaec;background: #fff;font-size: 14px;z-index: 10;
	}
	
	
	
	.title {
		
	}
	.main {
		margin-left:220px;
	}
	.toolbar {
		padding-bottom: 0px;
	}
	
	.el-pagination {
		text-align: center;
		margin-top: 10px;
	}
	.close .aside,
	.close .aside_content {
		width: 0;
	}
	.close .main {
		margin-left:0px;
	}
	@media (max-width: 767px){
		.el-dialog {
			width: 100% !important;
		}
		.aside_open_close {
			display: block;
		}
	}
	@media (min-width: 768px){
		.aside_open_close {
			display: none;
		}
	}
</style>
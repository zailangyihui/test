<template>
	<section class="menuManager" :class="isOpenAside ? '' : 'close'">
		<menu-manager-aside 
		@add-menu="addMenu"
		@editor-menu="editorMenu"
		@show-menu-tree="showMenuTree"
		@toggle-aside="toggleAside"></menu-manager-aside>

		<div class="main">
			<el-row :gutter="30">
				<el-col :span="14">
					<el-tree 
					ref="tree"
					:data="menuTreeData" 
					node-key="id"
					:expand-on-click-node="false" 
					:props="defaultProps" 
					:highlight-current="true" 
					default-expand-all
					@node-click="nodeclick" >
						<div class="custom-tree-node" :data-id="data.id" :class="{'is-current': data.id === currentMenu.id}" slot-scope="{ node, data }">
					        <span><i class="iconfont" :class="node.icon"></i>&nbsp;&nbsp;{{ node.label }}</span>
					        <span>
							  <el-button
					            type="text"
					            size="mini"
					            @click.stop="editorMenu(data)">
					            编辑
					          </el-button>
					          <el-button
					            type="text"
					            size="mini"
					            @click.stop="() => addMenu(data.pid)">
					            添加
					          </el-button>
					          <el-button
					            type="text"
					            size="mini"
					            @click.stop="() => remove(node, data)">
					            删除
					          </el-button>
					        </span>
					      </div>
					</el-tree>
				</el-col>
				<el-col :span="10">
					<menu-manager-right-part :MenuDetail="MenuDetail"></menu-manager-right-part>
				</el-col>
			</el-row>
		</div>
		<!--修改角色模态框-->
		<menu-manager-dialog :dialogMenu="dialogMenu" @update-current-menu="updateCurrentMenu"></menu-manager-dialog>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
    import menuManagerAside from '@/components/menuManager/aside'
	import menuManagerDialog from '@/components/menuManager/dialogMenu'
	import menuManagerRightPart from '@/components/menuManager/rightPart'
	import { queryAllRole, getMenuRole, deleteMenu, getMenus } from '@/api/menuManager.js'
	import { initPage } from '@/mixins/initPage.js'
	export default {
		name: 'menuManager',
		mixins: [initPage],
		components:{
			menuManagerAside, menuManagerDialog, menuManagerRightPart
		},
		data() {
			return {
				dialogMenu: {
					show:false,
					title:'',
					loading:true,
					menuName:'',
					menuIcon:'',
					type:'',
					roleArr:[]
				},
				MenuDetail:{
					show:true,
					menuName:'',
					menuUrl:'',
					roleArr:[],
					roleList:[],
				},
				isOpenAside: true,
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				menuTreeData:[],
				currentMenuId:0,
			}
		},
		computed:{
			...mapGetters(['menus','user'])
		},
		created(){
			if(this.menus.length){
				this.menuTreeData = [this.menus[0]];
			}
			this.$nextTick(function(){
			})
		},
		watch: {
			'menus':function(arr){
				if(arr && arr.length){
					this.menuTreeData = [arr[0]];
					this.menuName = '';
					this.MenuDetail.roleList = [];
					this.MenuDetail.roleArr = [];
				}
			},
		},
		methods: {
			async deleteMenu(menuId){
				let data = await deleteMenu({'menuId': menuId});
				this.$message({
					message: data.message,
					type: 'success'
				});
				this.updateMenu();
			},
			async updateMenu(){
                let data = await getMenus({uid: this.user.id});
				this.$store.commit('UPDATA_MENUS', data.data.treeMenu);
            },
            async nodeclick(menus){
				console.log(menus)
				this.MenuDetail.menuName = menus.text;
				this.currentMenu = menus;
				let data = await getMenuRole({menuId:menus.id});
				this.MenuDetail.roleList = data.roleList;
				this.MenuDetail.roleArr = data.roleIds;
			},
			async addMenu(parentId) {
				console.log('parentId', parentId)
				this.initMenuDialog();
				this.dialogMenu.title = "添加菜单";
				this.dialogMenu.type = "add";
				this.dialogMenu.menuUrl = '/';
				this.dialogMenu.parentId = parentId;
				let list = await queryAllRole();
				this.dialogMenu.roleIds = [];
				this.dialogMenu.roleArr = list;
				this.dialogMenu.loading = false;
			},
			async editorMenu(menuData){
				this.initMenuDialog();
				this.dialogMenu.menuName = menuData.text;
				this.dialogMenu.title = "修改菜单";
				this.dialogMenu.type = "editor";
				this.dialogMenu.menuId = menuData.id;
				this.dialogMenu.menuUrl = menuData.url;
				let data = await getMenuRole({menuId:menuData.id});
				this.dialogMenu.roleArr = data.roleList;
				this.dialogMenu.roleIds = data.roleIds;
				this.dialogMenu.loading = false;
				
			},
			initMenuDialog(){
				this.dialogMenu.roleArr = [];
				this.dialogMenu.loading = true;
				this.dialogMenu.show = true;
				this.dialogMenu.menuName = '';
				this.dialogMenu.menuIcon = "icon-Management";
			},
			toggleAside(data){
				if(data==='open'){
					this.isOpenAside = true
				}else{
					this.isOpenAside = false
				}
			},
			showMenuTree(menuId){
				let record = this.menus.find(item => item.id == menuId);
				this.menuTreeData = [record];
			},
			nodeclick(menus){
				console.log(menus)
				this.MenuDetail.menuName = menus.text;
				this.currentMenuId = menus.id;
				this.getMenuRoleList();
			},
			async getMenuRoleList(){
				let data = await getMenuRole({menuId:this.currentMenuId});
				this.MenuDetail.roleList = data.roleList;
				this.MenuDetail.roleArr = data.roleIds;
			},
			append(data) {
				this.addMenu();
		    },
		    remove(node, data) {
				this.$confirm('您确定删除该菜单吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(data.id == 0){
						const parent = node.parent;
						const children = parent.data.children || parent.data;
						const index = children.findIndex(d => d.id === data.id);
						children.splice(index, 1);
					} else {
						this.deleteMenu(data.id);
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			updataCurrentMenu(){
				console.log('updata-current-menu:')
				this.$refs.tree.setCurrentNode(this.currentMenu)
			},
		},
		created(){
			if(this.menus.length){
				this.menuTreeData = [this.menus[0]];
			}
		},
	}
</script>

<style lang="less">
@import '../../assets/css/base.less';
.menuManager{
	.main {.ml(220px);.p(15px);
		.shownavdetail{
			hr {.mt(22px);.mb(22px);border: 0;border-top: 1px solid #e4eaec;}
			h5 {font-weight: 500;.fs(16px);.m(11px 0);}
			label {font-weight: 400;.fs(14px);color: #606266;.mb(5px);.dib;
			}
		} 
		.custom-tree-node {flex: 1;display: flex;align-items: center;justify-content: space-between;.fs(14px);.pr(8px);
			&.is-current {color: #20A0FF;}
		}
		.el-tree-node__content {.m(5px 0);border: 1px solid #e4eaec;.h(30px);line-height: 30px;border-radius: 3px;}
	}
	&.close{
		.main {margin-left: 0px;}
		.aside,.aside_content{width: 0 !important;}
	}
}

@media (max-width: 767px){
	.el-dialog {width: 100% !important; }
}
</style>
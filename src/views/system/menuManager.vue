<template>
	<section class="menuManager" :class="isOpenAside ? '' : 'close'">
		<menu-manager-aside 
		:isOpenAside="isOpenAside"
        :cid = "cid"
		@add-menu="addMenu"
		@editor-menu="editorMenu"
		@show-menu-tree="showMenuTree"
		@toggle-aside="toggleAside"
        @clasr-form="clearForm"
        @change-res-from="changeResFrom"></menu-manager-aside>
		<div class="main">
			<el-row :gutter="30">
				<el-col :xs="24" :sm="14">
					<el-tree :data="menuTreeData" ref="menuTree" node-key="id" :check-strictly="true" :expand-on-click-node="false" :props="defaultProps" :highlight-current="true" default-expand-all @node-click="nodeclick">
						<span class="custom-tree-node" :class="data.id == currentMenuId ? 'is-current' : ''" slot-scope="{ node, data }">
					        <span><i class="iconfont" :class="node.icon"></i>&nbsp;&nbsp;{{ node.label }}</span>
					        <span>
							  <el-button
					            type="text"
					            size="mini"
					            @click="editorMenuEvent(data)">
					            编辑
					          </el-button>
					          <el-button
					            type="text"
					            size="mini"
					            @click="() => addMenuEvent(data.id)">
					            添加
					          </el-button>
					          <el-button
					            type="text"
					            size="mini"
					            @click.stop="() => remove(node, data)">
					            删除
					          </el-button>
					        </span>
					      </span>
					</el-tree>
				</el-col>
				<el-col :xs="0" :sm="10">
					<menu-manager-right-part :MenuDetail="MenuDetail"></menu-manager-right-part>
				</el-col>
			</el-row>
		</div>
		<!--修改角色模态框-->
		<menu-manager-dialog :dialogMenu="dialogMenu" @update-current-menu="updateCurrentMenu" @change-current-id="changeCurrentId"></menu-manager-dialog>
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
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				menuTreeData:[],
                currentMenuId:0,
                cid:0,
                resFrom:''
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
            addMenuEvent(parentId){
                this.resFrom = '';
                this.addMenu(parentId);
            },
            editorMenuEvent(menuData){
                this.resFrom = '';
                this.editorMenu(menuData);
            },
			async addMenu(parentId) {
				this.initMenuDialog();
				this.dialogMenu.title = "添加菜单";
				this.dialogMenu.type = "add";
                this.dialogMenu.menuUrl = '/';
                this.dialogMenu.menuRem = '';
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
                this.dialogMenu.menuRem = menuData.menuRem;
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
				this.isOpenAside = data;
			},
			showMenuTree(menu){
				let record = this.menus.find(item => item.id == menu.id);
                this.menuTreeData = [record];
                if(this.resFrom == "aside"){
                    this.currentMenuId = menu.id;
                    this.MenuDetail.menuName = menu.text;
                }
                this.getMenuRoleList();
			},
			nodeclick(menus){
                console.log("menus",menus)
                this.MenuDetail.menuRem = menus.menuRem;
				this.MenuDetail.menuName = menus.text;
				this.currentMenuId = menus.id;
				this.getMenuRoleList();
			},
			async getMenuRoleList(){
				let data = await getMenuRole({menuId:this.currentMenuId});
				this.MenuDetail.roleList = data.roleList;
				this.MenuDetail.roleArr = data.roleIds;
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
			async deleteMenu(menuId){
                let data = await deleteMenu({'menuId': menuId});
                this.MenuDetail.menuName = '';
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
            updateCurrentMenu(menuData){
                this.MenuDetail.menuName = menuData.menuName;
                this.MenuDetail.menuRem = menuData.menuRem;
				this.getMenuRoleList();
			},
            changeCurrentId(id){
                this.currentMenuId = id;
                if(!this.dialogMenu.parentId){
                    this.cid = id;
                } 
            },
            changeResFrom(data){
                this.resFrom = data;
            },
            clearForm(){
                this.MenuDetail.menuName = '';
            }
		}
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
<template>
	<section class="menuManager" :class="isOpenAside ? '' : 'close'">
		<menu-manager-aside 
		@add-menu="addMenu"
		@show-menu-tree="showMenuTree"
		@toggle-aside="toggleAside"></menu-manager-aside>

		<div class="main">
			<el-row :gutter="30">
				<el-col :span="14">
					<el-tree :data="menuTreeData" node-key="id" :expand-on-click-node="false" :props="defaultProps" :highlight-current="true" default-expand-all @node-click="nodeclick" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop" :allow-drag="allowDrag">
						<span class="custom-tree-node" slot-scope="{ node, data }">
					        <span>{{ node.label }}</span>
					        <span>
					          <el-button
					            type="text"
					            size="mini"
					            @click="() => append(data)">
					            Append
					          </el-button>
					          <el-button
					            type="text"
					            size="mini"
					            @click="() => remove(node, data)">
					            Delete
					          </el-button>
					        </span>
					      </span>
					</el-tree>
				</el-col>
				<el-col :span="10">
					<menu-manager-right-part :MenuDetail="MenuDetail"></menu-manager-right-part>
				</el-col>
			</el-row>
		</div>
		<!--修改角色模态框-->
		<menu-manager-dialog :dialogMenu="dialogMenu"></menu-manager-dialog>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex'
    import menuManagerAside from '@/components/menuManager/aside'
	import menuManagerDialog from '@/components/menuManager/dialogMenu'
	import menuManagerRightPart from '@/components/menuManager/rightPart'
	export default {
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
				},
				MenuDetail:{
					show:true,
					menuName:'',
					menuUrl:'',
					roleArr:'',
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
			...mapGetters(['menus'])
		},
		mounted() {
			//console.log("234444444444",this.$store)
			//console.log(this.$store.state.load,"======================")
			this.init();
			var me = this;
			window.onresize = function() {
				me.init()
			}
		},
		watch: {
			'menus':function(arr){
				console.log('1212121',arr)
				if(arr && arr.length > 0){
					console.log('392382')
					this.menuTreeData = [arr[0]];
				}
			},
			'currentMenuId':function(id){
				console.log(id, '====================')
				let record = this.menus.find(item => item.id == id)
				console.log(record, '111111111')
				this.menuTreeData = [record];
			}
		},
		methods: {
			addMenu() {
				console.log("点击添加菜单")
				this.dialogMenu.show = true;
				this.dialogMenu.title = "添加菜单";
			},
			toggleAside(data){
				if(data==='open'){
					this.isOpenAside = true
				}else{
					this.isOpenAside = false
				}
			},
			showMenuTree(menuId){
				console.log('menuId', menuId)
				this.currentMenuId = menuId;
			},
			init() {
				var w = document.body.clientWidth;
				console.log(w)
				if(w <= 767) {
					this.isOpenAside = false;
				} else {
					this.isOpenAside = true;
				}
			},
			querylist(e, index) {
				for(var id in this.usertypes) {
					this.usertypes[id].selected = false;
				}
				this.usertypes[index].selected = true;
				console.log(e.target.getAttribute("data-index"), index)
			},
			saveMenu() {
				console.log("保存角色", this.valueqx)
			},
			saveMenu2() {
				console.log("保存角色", this.valueqx)
			},
			shanchu() {
				console.log("shanchu")
				this.$confirm('您确定删除该菜单吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			bianji(item) {
				this.editorRoleVisible = true;
				this.menuname = item.name;
				this.selecticon = item.icon
			},
			handleDragStart(node, ev) {
				console.log('drag start', node);
			},
			handleDragEnter(draggingNode, dropNode, ev) {
				console.log('tree drag enter: ', dropNode.label);
			},
			handleDragLeave(draggingNode, dropNode, ev) {
				console.log('tree drag leave: ', dropNode.label);
			},
			handleDragOver(draggingNode, dropNode, ev) {
				console.log('tree drag over: ', dropNode.label);
			},
			handleDragEnd(draggingNode, dropNode, dropType, ev) {
				console.log('tree drag end: ', dropNode && dropNode.label, dropType);
			},
			handleDrop(draggingNode, dropNode, dropType, ev) {
				console.log('tree drop: ', dropNode.label, dropType);
			},
			allowDrop(draggingNode, dropNode, type) {
				if(dropNode.data.label === '二级 3-1') {
					return type !== 'inner';
				} else {
					return true;
				}
			},
			allowDrag(draggingNode) {
				console.log(draggingNode)
				return true;
			},
			nodeclick(a,b,c){
				console.log(a,b,c)
			},
			append(data) {
		        const newChild = { id: this.id++, menuName: 'testtest', children: [] };
		        if (!data.children) {
		          this.$set(data, 'children', []);
		        }
		        data.children.push(newChild);
		    },
		    remove(node, data) {
		        const parent = node.parent;
		        const children = parent.data.children || parent.data;
		        const index = children.findIndex(d => d.id === data.id);
		        children.splice(index, 1);
		    },
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
		.custom-tree-node {flex: 1;display: flex;align-items: center;justify-content: space-between;.fs(14px);.pr(8px);}
		.el-tree-node__content {.m(5px 0);
			border: 1px solid #e4eaec;
			border-radius: 3px;
		}
	}
	&.close{
		.main {margin-left: 0px;}
		.aside,.aside_content{width: 0 !important;}
	}
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
	color: #20A0FF;
}
@media (max-width: 767px){
	.el-dialog {width: 100% !important; }
}
</style>
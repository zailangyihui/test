<template>
	<section :class="isopen ? '' : 'close'">
		<menu-manager-aside></menu-manager-aside>
		<div class="main">
			<el-row :gutter="30">
				<el-col :span="14">
					<el-tree :data="data6" node-key="id" :expand-on-click-node="false" :props="defaultProps" :highlight-current="true" default-expand-all @node-click="nodeclick" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop" :allow-drag="allowDrag">
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
					<div class="shownavdetail" v-show="shownavdetail">
						<h5>{{navdetail.menuName}}</h5>
						<hr />
						<div class="from-item">
							<label>名称：</label>
							<el-input v-model="navdetail.menuName" auto-complete="off"></el-input>
						</div>
						<div class="">
							<label>权限分配：</label>
							<el-select v-model="navdetail.valueqx" multiple collapse-tags style="width: 100%;" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<!--添加角色模态框-->
		<el-dialog title="Dialog" :visible.sync="addRoleVisible" :close-on-click-modal="true" :modal="false" width="500px">
			<div class="from-item">
				<label>图标&名称：</label>
				<el-input placeholder="请输入菜单名" v-model="menuname">
					<template slot="prepend">
						<div class="zwdiv" @click="iconpopover=false"><i class="iconfont" :class="selecticon"></i></div>
					</template>
				</el-input>
				<div class="popover" :hidden="iconpopover">
					<div class="popover-title">
						请选择图标
						<i class="el-icon-close closepopover" @click.stop="iconpopover=true"></i>
					</div>
					<div class="popover-content">
						<span class="iconbox" v-for="item in icons" @click.stop="selecticon=item"><i class="iconfont" :class="item"></i></span>
					</div>
				</div>
			</div>
			<div class="">
				<label>权限分配：</label>
				<el-select v-model="valueqx" multiple collapse-tags style="width: 100%;" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addRoleVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveMenu">确定</el-button>
			</div>
		</el-dialog>
		<!--修改角色模态框-->
		<menu-manager-dialog></menu-manager-dialog>
	</section>
</template>

<script>
    import menuManagerAside from '@/components/menuManager/aside'
    import menuManagerDialog from '@/components/menuManager/editorMenu'
	export default {
		components:{
			menuManagerAside, menuManagerDialog
		},
		data() {
			return {
				id:1000,
				navdetail:{menuName:"自定义菜单",valueqx: ''},
				shownavdetail: true,
				iconpopover: true,
				isopen: true,
				usertypes: [{
					name: "系统管理",
					icon: 'icon-diancan1',
					selected: true
				}, {
					name: "点餐管理",
					icon: "icon-diancan1",
					selected: false
				}],
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '子马虎'
				}],
				valueqx: '',
				menuname: '',
				selecticon: 'icon-diancan1',
				data6: [{
					id: 1,
					menuName: '一级 1',
					children: [{
						id: 4,
						menuName: '二级 1-1',
						children: [{
							id: 9,
							menuName: '三级 1-1-1'
						}, {
							id: 10,
							menuName: '三级 1-1-2'
						}]
					}]
				}, {
					id: 2,
					menuName: '一级 2',
					children: [{
						id: 5,
						menuName: '二级 2-1'
					}, {
						id: 6,
						menuName: '二级 2-2'
					}]
				}, {
					id: 3,
					menuName: '一级 3',
					children: [{
						id: 7,
						menuName: '二级 3-1'
					}, {
						id: 8,
						menuName: '二级 3-2',
						children: [{
							id: 11,
							menuName: '三级 3-2-1'
						}, {
							id: 12,
							menuName: '三级 3-2-2'
						}, {
							id: 13,
							menuName: '三级 3-2-3'
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'menuName'
				}
			}
		},
		mounted() {
			console.log("234444444444",this.$store)
			console.log(this.$store.state.load,"======================")
			this.init();
			var me = this;
			window.onresize = function() {
				me.init()
			}
		},
		methods: {
			init() {
				var w = document.body.clientWidth;
				console.log(w)
				if(w <= 767) {
					this.isopen = false;
				} else {
					this.isopen = true;
				}
			},
			changisopen() {
				this.isopen = !this.isopen
			},
			querylist(e, index) {
				for(var id in this.usertypes) {
					this.usertypes[id].selected = false;
				}
				this.usertypes[index].selected = true;
				console.log(e.target.getAttribute("data-index"), index)
			},
			addmenu() {
				console.log("点击添加菜单")
				this.addRoleVisible = true;
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

<style>
	.custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    padding-right: 8px;
	  }
	.shownavdetail label {
		font-weight: 400;
		font-size: 14px;
		color: #606266;
		margin-bottom: 5px;
		display: inline-block;
	}
	hr {
	    margin-top: 22px;
	    margin-bottom: 22px;
	    border: 0;
	    border-top: 1px solid #e4eaec;
	}
	h5 {
		font-weight: 500;
		font-size: 16px;
		margin: 11px 0;
	}
	.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
	    color: #20A0FF;
	}
	.from-item {
		margin-bottom: 12px;
		position: relative;
	}
	
	table {
		width: initial !important;
	}
	
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, 0.6);
	}
	
	/* .aside {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 220px;
		padding-top: 20px;
		border-right: 1px solid #e4eaec;
		background: #fff;
		font-size: 14px;
		z-index: 10;
	}
	
	.aside_content {
		overflow-y: auto;
		overflow-x: hidden;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		width: 220px;
	} */
	
	.aside_open_close {
		position: absolute;
		font-size: 20px;
		z-index: 1000;
		display: inline-block;
		padding: 15px 8px;
		left: calc(100% - 1px);
		top: calc(50% - 40px);
		border-radius: 0 100px 100px 0;
		box-shadow: 1px 0 3px rgba(0, 0, 0, .2);
		background-color: #fff;
	}
	
	/* .line {
		border-bottom: 1px solid #e4eaec;
		margin: 0px 12px;
	} */
	
	/* .left-header {
		padding: 25px 20px 35px 20px;
	} */
	
	/* .litem.active {
		color: #62a8ea;
	} */
	
	/* .left-content {
		padding: 0 20px;
	} */
	
	/* .left-content-list {
		padding: 0;
	} */
	
	/* .left-content-list li {
		list-style: none;
		height: 44px;
		line-height: 44px;
	} */
	
	
	/* .left-content-list li .operate {
		position: absolute;
		right: 0;
		display: none;
	} */
	
	/* .left-content-list li .operate i {
		font-size: 18px;
		font-weight: 700;
	} */
	
	/* .left-content-list li .operate i:hover {
		color: #20A0FF;
		cursor: pointer;
	} */
	
	/* .left-content-list li:hover .count {
		display: none;
	} */
	
	/* .left-content-list li:hover .operate {
		display: initial;
	} */
	
	.title {
		color: #526069;
		height: 30px;
		line-height: 30px;
	}
	
	.main {
		margin-left: 220px;
	}
	
	.toolbar {
		padding-bottom: 0px;
	}
	
	.addrolebtn {
		height: 50px;
		line-height: 50px;
		margin-top: 15px;
		text-indent: 10px;
		color: #76838f;
		cursor: pointer;
	}
	
	.addrolebtn i {
		font-size: 15px;
		font-weight: 700;
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
		margin-left: 0px;
	}
	
	.iconbox {
		display: inline-block;
		width: 14px;
		height: 14px;
		line-height: 14px;
		padding: 8px;
		margin: 0 8px 8px 0;
		font-size: 14px;
		text-align: center;
		border-radius: 2px;
		box-shadow: 0 0 0 1px #e4eaec;
	}
	
	.popover {
		position: absolute;
		top: 70px;
		width: 230px;
		background-color: #f3f7f9;
		z-index: 2;
		border: solid 1px #e4eaec;
		border-radius: 4px;
	}
	
	.popover-title {
		text-align: center;
		height: 30px;
		line-height: 30px;
		border-bottom: solid 1px #e4eaec;
	}
	
	.popover-content {
		background-color: #fff;
		padding: 10px;
		max-height: 200px;
	}
	
	.closepopover {
		position: absolute;
		right: 5px;
		top: 7px;
	}
	
	.zwdiv {
		width: 70px;
		height: 36px;
		line-height: 36px;
		text-align: center;
	}
	
	.el-input-group__prepend {
		padding: 0;
	}
	
	.el-tree-node__content {
    	margin: 5px 0;
    	border: 1px solid #e4eaec;
    	border-radius: 3px;
	}
	/* @media (max-width: 767px) {
		.el-dialog {
			width: 100% !important;
		}
		.aside_open_close {
			display: block;
		}
	}
	
	@media (min-width: 768px) {
		.aside_open_close {
			display: none;
		}
	} */
</style>
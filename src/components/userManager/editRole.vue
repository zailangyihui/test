<template>
	<el-dialog title="Dialog" :visible.sync="show" :close-on-click-modal="true" :modal="false" width="500px">
		<el-form  label-width="80px" ref="addForm">
			<el-form-item label="角色名称" prop="role">
				<el-input v-model="roleName" auto-complete="off" :disabled="roleType==='edit' ? true : false "></el-input>
			</el-form-item>
			<el-form-item label="权限分配" prop="quanxian" v-loading="showLoading" class="maxheight">
				<el-tree
				  :data="menuTree"
				  show-checkbox
				  node-key="id"
				  ref="editortree"
				  default-expand-all
				  :default-checked-keys="checkedTree"
				  :check-strictly="true"
				  :props="defaultProps">
				</el-tree>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('close-edit-role')">取 消</el-button>
			<el-button type="primary" @click="entry">确定</el-button>
		</div>
	</el-dialog>
</template>
<script>
import { updataRole } from '@/api/userManager.js'

export default {
	props: ['show', 'showLoading', 'roleId', 'roleName', 'roleType', 'menuTree', 'checkedTree' ],
	data(){
		return {
			defaultProps: {
	          	children: 'children',
	          	label: 'text'
	        },
		}
	},
	methods: {
		async entry(){
			console.log("保存编辑角色")
			var menu = this.$refs.editortree.getCheckedNodes();
			var menuIds = [];
			console.log(menu);
			if(menu.length == 0){
				this.$message.error('请选择角色权限！');
				return;
			} else {
				for(let key in menu){
					menuIds.push(menu[key].id);
				}
			}
			let data = await updataRole({'roleId': this.roleId, 'menuIds': menuIds.join(",") })
			if(data.code === 0){
				this.$message({
		          	message: data.message,
		          	type: 'success'
		        });
			}
			this.$emit('close-edit-role')
		}
	}
}
</script>
<style lang="less" scoped>

</style>
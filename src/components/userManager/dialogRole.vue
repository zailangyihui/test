<template>
	<el-dialog :title="dialogRole.title" :visible.sync="dialogRole.show" :close-on-click-modal="true" :modal="false" width="500px">
		<el-form  label-width="80px" ref="addForm">
			<el-form-item v-if="dialogRole.type === 'edit'" label="角色名称" prop="role">
				<el-input v-model="dialogRole.roleName" auto-complete="off" disabled></el-input>
			</el-form-item>
			<el-form-item label="角色名称" prop="role" v-else>
				<el-input v-model="inputRoleName" auto-complete="off" :disabled="false"></el-input>
			</el-form-item>
			<el-form-item label="权限分配" prop="quanxian" v-loading="dialogRole.loading" class="maxheight">
				<el-tree
				  :data="dialogRole.menuTree"
				  show-checkbox
				  node-key="id"
				  ref="editortree"
				  default-expand-all
				  :default-checked-keys="dialogRole.checkedTree"
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
import { updataRole, addRole } from '@/api/userManager.js'
export default {
	props: ['dialogRole'],
	data(){
		return {
			inputRoleName: '',
			defaultProps: {
	          	children: 'children',
	          	label: 'text'
	        },
		}
	},
	methods: {
		async entry(){
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
			if(this.dialogRole.type === 'edit'){
				let data = await updataRole({'roleId': this.dialogRole.roleId, 'menuIds': menuIds.join(",") })
				if(data.code === 0){
					this.$message({
			          	message: data.message,
			          	type: 'success'
			        });
				}
			}else if(this.dialogRole.type === 'add'){
				console.log('add')
				let data = await addRole({'roleName': this.inputRoleName, 'menuIds': menuIds.join(",") })
				if(data.code === 0){
					this.$message({
			          	message: data.message,
			          	type: 'success'
			        });
				}
			}
			this.$emit('close-edit-role')
			this.$store.commit('EVENT_GET_ROLE_LIST', true)
		}
	},
	mounted(){
	}
}
</script>
<style lang="less" scoped>
@media (max-width: 767px){
	.el-dialog {width: 100% !important; }
}
</style>
<template>
	<el-dialog :title="dialogUser.title" :visible.sync="dialogUser.show" width="500px" :show-close="false" :close-on-click-modal="false" :append-to-body="true">
		<el-form label-width="80px" ref="addUser">
			<el-form-item label="用户账号" prop="accounts" v-if="dialogUser.type === 'add'">
				<el-input v-model="accounts" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户昵称" prop="nickName">
				<el-input v-model="nickName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="password">
				<el-input v-model="password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="confirmpsd" v-if="dialogUser.type === 'add'">
				<el-input v-model="confirmpsd" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色选择" prop="role">
				<el-select v-model="roleId" placeholder="请选择">
				    <el-option
				      v-for="item in roleList"
				      :key="item.roleName"
				      :label="item.roleName"
				      :value="item.Id">
				    </el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('close-add-user')">取 消</el-button>
			<el-button type="primary" @click="entry">确定</el-button>
		</div>
	</el-dialog>
</template>
<script>
import { getROleInfo } from '@/api/userManager.js'

export default {
	props: ['dialogUser' ],
	data(){
		return {
			accounts:'',
			nickName:'',
			password:'',
			confirmpsd:'',
			roleId:'',
			roleList: []
		}
	},

	methods: {
		async getRole(){
    		let list =  await getROleInfo()
    		this.roleList = list.map((item)=>{
    			return {
    				id: item.id,
    				roleName: item.roleName,
    				userCount: item.userCount,
    				selected: 0,
    			}
    		})
    	},
		esc(){

		},
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
	},
	created(){
		this.getRole()
	}
}
</script>
<style lang="less" scoped>

</style>
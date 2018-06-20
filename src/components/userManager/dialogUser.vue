<template>
	<el-dialog :title="dialogUser.title" :visible.sync="dialogUser.show" :close-on-click-modal="true" :modal="false" width="500px">
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
				      :key="item.id"
				      :label="item.roleName"
				      :value="item.id">
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
import { getRoleListForUser } from '@/api/userManager.js'

export default {
	props: ['dialogUser' ],
	data(){
		return {
			accounts:'',
			nickName:'',
			password:'',
			confirmpsd:'',
			roleId:'',
			roleName: '',
			roleList: []
		}
	},
	watch: {
		'dialogUser.show': function(val){
			if(val){
				if(this.dialogUser.type === 'add'){
					this.getRole()
				}else{
					this.getRole({'uid': this.dialogUser.id})
				}
			}else{
				this.roleId = ''
			}
		}
	},

	methods: {
		async getRole(params){
    		let data =  await getRoleListForUser(params)
    		console.log(data)
    		this.roleList = data.roleList.length &&　data.roleList.map((item)=>{
    			return {
    				id: item.id,
    				roleName: item.roleName,
    				userCount: item.userCount,
    				selected: 0,
    			}
    		})
    		if(data.roleId!==undefined) {
    			//let record = this.roleList.find(item => item.id === data.roleId)
    			this.roleId = data.roleId
    		}
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
		
		
	}
}
</script>
<style lang="less" scoped>

</style>
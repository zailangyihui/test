<template>
	<el-dialog :title="dialogUser.title" :visible.sync="dialogUser.show" :close-on-click-modal="true" :modal="false" width="500px">
		<el-form label-width="80px" ref="addUser">
			<el-form-item label="用户账号" prop="accounts" v-if="dialogUser.type === 'add'">
				<el-input v-model="dialogUser.accounts" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户昵称" prop="nikeName">
				<el-input v-model="dialogUser.nikeName" auto-complete="off"></el-input>
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
import { getRoleListForUser, addUser } from '@/api/userManager.js'

export default {
	props: ['dialogUser' ],
	data(){
		return {
			password:'',
			confirmpsd:'',
			roleId:'',
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

		async entry(){
			console.log("保存编辑用户")
			let submit = true
			if(this.dialogUser.accounts === ''){
				this.$message({message: '请输入用户账号', type: 'error'});
				return;
			}else if(this.dialogUser.nickName === ''){
				this.$message({message: '请输入j昵称', type: 'error'});
				return;
			}else if(this.password === ''){
				this.$message({message: '请输入密码', type: 'error'});
				return;
			}else if(this.password !== this.confirmpsd){
				this.$message({message: '两次输入密码不一置', type: 'error'});
				return;
			}else if(this.roleId === ''){
				this.$message({message: '请选择角色', type: 'error'});
				return;
			}
			let result = null
			if(this.dialogUser.type === 'add'){
				result = await addUser({
					'accounts': this.dialogUser.accounts, 
					'password': this.password,
					'roleId': this.roleId,
					'nickName': this.dialogUser.nickName 
				})
				console.log('add user...',result)
			}else{
				result = await updataUser({
					'nickName': this.dialogUser.nikeName,
					'password': this.password,
					'roleId': this.roleId,
					'uid': this.dialogUser.id
				})
			}
			if(result.code === 0){
				this.$message({
		          	message: result.message,
		          	type: 'success'
		        });
			}
			this.$emit('query-user-list')
			this.$emit('close-add-user')
		}
	},
	created(){
		
		
	}
}
</script>
<style lang="less" scoped>

</style>
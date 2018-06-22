<template>
	<div class="accountInfo">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-col :span="6">
					<div class="aside">
						<div class="inside text-center">
							<img src="../../assets/header.jpg" width="100px" class=""/>
							<h3>{{user.nikeName}}</h3>
							<p>上次登录：2018-5-16 15:34:36</p>
						</div>
					</div>
				</el-col>
				<el-col :span="18">
					<div class="right-part">
						<el-tabs v-model="tabValue" @tab-click="onChangeTab">
						    <el-tab-pane label="密码修改" name="password">
						    	<el-row :gutter="20" class="inputbox">
						    		<el-col :span="10" :offset="4">
						    			<el-input v-model="psdData.oldPsd" placeholder="请输入原来的密码" size="small"></el-input>
						    			<el-input v-model="psdData.newPsd" placeholder="请输入新密码" size="small"></el-input>
						    			<el-input v-model="psdData.newPsdAgain" placeholder="请再次输入新密码" size="small"></el-input>
								  	</el-col>
								  	<el-col :span="20" :offset="4">
								  		<el-button type="primary" size="small" @click="updatePassword">保存</el-button>
								  	</el-col>
						    	</el-row>
						    </el-tab-pane>
						</el-tabs>
					</div>
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { initPage } from '@/mixins/initPage.js'
import { modifyPassword } from '@/api/userManager.js'
export default {
	name: 'AccountInfo',
	mixins:[initPage],
	data() {
		return {
			tabValue: 'password',
			psdData:{
				oldPsd:"",
				newPsd:"",
				newPsdAgain:""
			}
		}
	},
	methods: {
		async updatePassword(){
			if(!this.psdData.oldPsd){
				this.$message.error('请输入旧密码！');
				return;
			}
			if(!this.psdData.newPsd){
				this.$message.error('请输入新密码！');
				return;
			}
			if(!this.psdData.newPsdAgain){
				this.$message.error('请再次输入新密码！');
				return;
			}
			if(this.psdData.newPsd != this.psdData.newPsdAgain){
				this.$message.error('两次密码不一致！');
				return;
			}
			let data = await modifyPassword(this.psdData);
			this.$message({message: data.message,type: 'success'});
			this.psdData = {oldPsd:"",newPsd:"",newPsdAgain:""};
		},
		onChangeTab(){
			
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/base.less';
.accountInfo { .p(10px);
	.aside {padding: 20px 15px; background-color: #fff;
		h3 {.fs(16px); margin: 20px 0 10px; color: #263238; font-weight: 500; }
		p {.fs(14px); line-height: 1.6; color: #76838f; }
	}
	.inputbox { .mt(30px);.mb(20px);
		.el-input {.mb(10px) }
	}
	.right-part {padding: 20px; background-color: #fff; }
}
</style>
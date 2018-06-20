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
						    			<el-input v-model="oldpassword" placeholder="请输入原来的密码" size="small"></el-input>
						    			<el-input v-model="newpassword" placeholder="请输入新密码" size="small"></el-input>
						    			<el-input v-model="newpassword2" placeholder="请再次输入新密码" size="small"></el-input>
								  	</el-col>
								  	<el-col :span="20" :offset="4">
								  		<el-button type="primary" size="small">保存</el-button>
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
export default {
	name: 'AccountInfo',
	mixins:[initPage],
	data() {
		return {
			tabValue: 'password',
			oldpassword:"",
			newpassword:"",
			newpassword2:""
		}
	},
	methods: {
		selectTheme(index,bgclass){
			for(var id in this.theme){
				this.theme[id].selected = false;
			}
			this.theme[index]["selected"] = true;
			this.$emit('changebg',bgclass)
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
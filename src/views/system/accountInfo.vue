<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-col :span="6">
					<div class="left-part">
						<div class="headerpicbox text-center">
							<img src="../../assets/header.jpg" width="100px" class=""/>
							<h3>{{username}}</h3>
							<p>上次登录：2018-5-16 15:34:36</p>
						</div>
					</div>
				</el-col>
				<el-col :span="18">
					<div class="right-part">
						<el-tabs v-model="activeName" @tab-click="handleClick">
						    <el-tab-pane label="密码修改" name="modifypwd">
						    	<el-row :gutter="20" class="inputbox">
						    		<el-col :span="10" :offset="4">
						    			<el-input v-model="oldpdw" placeholder="请输入原来的密码" size="small"></el-input>
						    			<el-input v-model="oldpdw" placeholder="请输入新密码" size="small"></el-input>
						    			<el-input v-model="oldpdw" placeholder="请再次输入新密码" size="small"></el-input>
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
	import common from '../../common/js/common.js'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				activeName: 'modifypwd',
				username:"",
				oldpdw:"",
				newpdw:"",
				newpdw2:""
			}
		},
		mounted() {
			var userinfo = common.getCookie('userinfo');
			userinfo = JSON.parse(userinfo)
			this.username =userinfo.accounts;
		},
		methods: {
			selectTheme(index,bgclass){
				for(var id in this.theme){
					this.theme[id].selected = false;
				}
				this.theme[index]["selected"] = true;
				this.$emit('changebg',bgclass)
			},
			handleClick(){
				
			}
		}
	}
</script>

<style scoped>
	.inputbox {
		margin-top: 30px;
		margin-bottom: 20px;
	}
	.inputbox .el-input {
		margin-bottom: 10px;
	}
	.left-part {
		padding: 40px 15px;
    	background-color: #fff;
	}
	.right-part {
		padding: 20px;
		background-color: #fff;
	}
	.headerpicbox h3 {
		margin: 20px 0 10px;
    	color: #263238;
    	font-weight: 500;
    	font-size: 16px;
	}
	.headerpicbox p {
		font-size: 14px;
    	line-height: 1.6;
    	color: #76838f;
	}
</style>
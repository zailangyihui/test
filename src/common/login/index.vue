<template>
	<el-form :model="ruleForm2" ref="ruleForm2" status-icon :rules="rules" label-width="0px" class="demo-ruleForm">
		<h3 class="title">系统登录</h3>
		<el-form-item label="" prop="accounts">
			<el-input v-model="ruleForm2.accounts" placeholder="请输入用户名"></el-input>
		</el-form-item>
		<el-form-item label="" prop="password" style="margin-bottom: 10px;">
			<el-input type="password" v-model="ruleForm2.password" placeholder="请输入密码" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item style="margin-bottom: 10px;">
			<el-checkbox v-model="checked" class="" @click="checked=!checked">记住密码</el-checkbox>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm2')" style="width: 100%;">登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import {getCookie, setCookie, delCookie} from '@/utils/Cookie'
import { loginIn } from '@/api/common.js'

export default {
	data() {
		var checkUserno = (rule, value, callback) => {
			if(!value) {
				return callback(new Error('请输入用户名'));
			}
			if(value.length > 15 || value.length < 3) {
				callback(new Error('字符长度为3-15'));
			} else {
				callback();
			}
		};
		var validatePass = (rule, value, callback) => {
			if(value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		};
		return {
			checked: false,
			ruleForm2: {
				accounts: '',
				password: '',
			},
			rules: {
				password: [{
					validator: validatePass,
					trigger: 'blur'
				}],
				accounts: [{
					validator: checkUserno,
					trigger: 'blur'
				}]
			}
		};
	},
	mounted: function() {
		if(getCookie('user') && getCookie('pswd')) {
			console.log(getCookie('user'))
			this.ruleForm2.accounts = getCookie('user');
			this.ruleForm2.password = getCookie('pswd');
			this.checked = true;
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					var self = this;
					loginIn(this.ruleForm2).then((res)=>{
						console.log(res)
						if(self.checked) {
							setCookie('user', self.ruleForm2.accounts, 360); //保存帐号到cookie，有效期360天
							setCookie('pswd', self.ruleForm2.password, 360); //保存帐号到cookie，有效期360天
						} else {
							delCookie('user');
							delCookie('pswd');
						}
						setCookie('userinfo', JSON.stringify(res.data.data), 360);
						self.$router.push('/about.go');
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-form {
		margin: 200px auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
	}
	
	.title {
		text-align: center;
		margin: 0px auto 40px auto;
	}
</style>
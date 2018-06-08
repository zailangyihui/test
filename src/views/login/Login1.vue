<template>
	<el-form :model="ruleForm2" ref="ruleForm2" status-icon :rules="rules2" label-width="0px" class="demo-ruleForm">
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
	import common from '../../common/js/common.js'
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
				rules2: {
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
			if(this.getCookie('user') && this.getCookie('pswd')) {
				console.log(this.getCookie('user'))
				this.ruleForm2.accounts = this.getCookie('user');
				this.ruleForm2.password = this.getCookie('pswd');
				this.checked = true;
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(valid)
					if(valid) {
						console.log('submit!');
						var me = this;
						this.$store.dispatch('axiosPost', { url: 'LOGIN', params: this.ruleForm2 }).then(res => {
							console.log(res,"==")
							var data = res.data;
							if(data.code == 0) {
								if(me.checked) {
									me.setCookie('user', me.ruleForm2.accounts, 360); //保存帐号到cookie，有效期360天
									me.setCookie('pswd', me.ruleForm2.password, 360); //保存帐号到cookie，有效期360天
								} else {
									me.delCookie('user');
									me.delCookie('pswd');
								}
								me.$router.push('/adminUser');
							} else {
								this.$message({
						          	showClose: true,
						          	message: data.message,
						          	type: 'error',
						          	center: true
						        });
							}
						})
//						this.$http.post('/admin/login.go', params)
//							.then(function(res) {
//								console.log(res,"=====")
//								var data = res.data;
//								if(data.code == 1) {
//									if(me.checked) {
//										me.setCookie('user', me.ruleForm2.userno, 360); //保存帐号到cookie，有效期360天
//										me.setCookie('pswd', me.ruleForm2.pass, 360); //保存帐号到cookie，有效期360天
//									} else {
//										me.delCookie('user');
//										me.delCookie('pswd');
//									}
//									//me.$router.push('/adminUser');
//								}
//
//							})
//							.catch(function(error) {
//								console.log(error)
//							})
//						this.$http.get('/admin/login.go', {params: param})
//							.then(function(res) {
//								console.log(res,"=====")
//								var data = res.data;
//								if(data.code == 1) {
//									if(me.checked) {
//										me.setCookie('user', me.ruleForm2.userno, 360); //保存帐号到cookie，有效期360天
//										me.setCookie('pswd', me.ruleForm2.pass, 360); //保存帐号到cookie，有效期360天
//									} else {
//										me.delCookie('user');
//										me.delCookie('pswd');
//									}
//									//me.$router.push('/adminUser');
//								}
//
//							})
//							.catch(function(error) {
//								console.log(error)
//							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			setCookie(name, value, day) {
				var date = new Date();
				date.setDate(date.getDate() + day);
				document.cookie = name + '=' + value + ';expires=' + date;
			},
			getCookie(name) {
				var reg = RegExp(name + '=([^;]+)');
				var arr = document.cookie.match(reg);
				if(arr) {
					return arr[1];
				} else {
					return '';
				}
			},
			delCookie(name) {
				this.setCookie(name, null, -1);
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
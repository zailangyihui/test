<template>
	<el-form :model="ruleForm2" ref="ruleForm2" status-icon :rules="rules2" label-width="100px" class="demo-ruleForm">
		<el-form-item label="用户名" prop="age">
			<el-input v-model.number="ruleForm2.age"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm2')" style="width: 100%;">提交</el-button>
			<!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			var checkAge = (rule, value, callback) => {
				console.log("1111111111111")
				if(!value) {
					return callback(new Error('用户名不能为空'));
				}
				//setTimeout(() => {
					if(!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						value = String(value);
						if(value.length > 15 || value.length < 5) {
							callback(new Error('字符长度为5-15'));
						} else {
							callback();
						}
					}
				//}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				console.log("222222222222222")
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				console.log("333333333333")
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: '',
					checkPass: '',
					age: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					age: [{
						validator: checkAge,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(valid)
					if(valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				console.log(this.$refs)
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-form {
		width: 400px;
		margin: 300px auto;
	}
</style>
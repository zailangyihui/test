<template>
	<el-dialog title="Dialog" :visible.sync="dialogBlack.show" :close-on-click-modal="true" :modal="false" width="500px">
		<el-form label-width="80px" ref="addForm">
			<el-form-item label="IP" prop="ip">
				<el-input v-model="ip" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="rem">
				<el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="rem">
				</el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('close-add-black')">取 消</el-button>
			<el-button type="primary" @click="entry">确定</el-button>
		</div>
	</el-dialog>
</template>
<script>
import { addBlack } from '@/api/blackList.js'
export default {
	props: ['dialogBlack'],
	data(){
		return {
			ip: '',
			rem: ''
		}
	},
	methods: {
		async entry(){
			if(!this.ip){
				this.$message.error("请输入IP");
				return
			}else if(!this.rem){
				me.$message.error("请输入备注");
				return
			}
			let result = await addBlack({'ip': this.ip, 'rem': this.rem})

			if(result.code === 0){
				this.ip = ''
				this.rem = ''
				if(this.currentPage == Math.ceil(this.total/this.pageSize) && this.total%this.pageSize == 0){
		        	this.currentPage += 1;
		        }
		        this.$emit('updata-black-list')
		        this.$emit('close-add-black')
			}
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
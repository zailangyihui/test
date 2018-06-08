<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.search" placeholder=""></el-input>
				</el-form-item>
					<el-form-item>
				<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="accounts" label="用户名" width="180">
			</el-table-column>
			<el-table-column prop="nikeName" label="昵称" width="180">
			</el-table-column>
			<el-table-column prop="img" label="头像" width="180">
				<template slot-scope="scope"> 
					<img :src="scope.row.img" width="50" height="50"/> 
				</template> 
			</el-table-column>
			<el-table-column prop="balanceA" label="金额">
			</el-table-column>
			<el-table-column prop="types" label="类型">
			</el-table-column>
			<el-table-column
		      fixed="right"
		      label="操作"
		      width="300">
		      <template slot-scope="scope">
		        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
		        <el-button @click="handleTopup(scope.row)" type="text" size="small">充值</el-button>
		        <el-button @click="handleWithdrawal(scope.row)" type="text" size="small">提现</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
		<el-dialog title="外层 Dialog" :visible.sync="editFormVisible" :close-on-click-modal="false" :modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="editForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input-number v-model="editForm.phone" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="金额">
					<el-input v-model="editForm.money"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="">确定</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
	export default {
		data() {
			return {
				filters:{
					search:''
				},
				tableData: [],
				total: 900,
				currentPage: 1,
				pageSize: 10,
				editFormVisible: false,
				search:'',
				editForm: {
					username: '',
					phone: '',
					money: 0
				},
			}
		},
		mounted() {
			console.log("2222222222222")
			var me = this;
			this.$http.get('static/datas/userlist.json')
				.then(function(response) {
					console.log(response.data, "-----", typeof(response.data));
					me.tableData = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			handleEdit(index, row) {
				this.editFormVisible = true;
				console.log(index, row)
			},
			handleDel(index, row) {
				console.log(index, row)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pageSize = val;
				console.log(val, this.currentPage, "00000000000")
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				console.log(this.currentPage, "11111111111111", this.pageSize)
				//请求table数据
//				this.$http.post('http://192.168.0.124:9900/initstockholderregisterdata.html', {
//						pageCount: val,
//						pageSize: this.pageSize
//					}, {
//						headers: {
//							'Content-Type': 'application/x-www-form-urlencoded'
//						}
//					})
//					.then(function(res) {
//						console.log(res.data, "====");
//					})
//					.catch(function(error) {
//						console.log(error)
//					})
			}
		}
	}
</script>

<style>
	.el-pagination {
		text-align: center;
		margin-top: 10px;
	}
</style>
<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-date-picker size="small" v-model="filters.dates" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.search" size="small" placeholder="输入事件/内容进行搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="querydata" size="small">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="tableData" border style="width: 100%" :height="tableheight">
			<el-table-column prop="accounts" label="用户名" width="180">
			</el-table-column>
			<el-table-column prop="events" label="事件" width="180">
			</el-table-column>
			<el-table-column prop="contents" label="内容" width="180">
			</el-table-column>
			<el-table-column prop="results" label="结果">
			</el-table-column>
			<el-table-column prop="dateTime" label="时间">
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
		
	</section>
</template>

<script>
	import common from '../../common/js/common.js'
	export default {
		data() {
			return {
				filters:{
					search:'',
					dates: ''
				},
				tableData: [],
				total: 0,
				currentPage: 1,
				pageSize: 10,
				tableheight: "530"
			}
		},
		mounted() {
			var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.$nextTick(function(){
				this.tableheight = h - 280
			})
			
		},
		methods: {
			getLogList(pageCount,pageSize){
				var me = this;
				this.$store.dispatch('axiosPost', { url: 'LOGSLIST', params: {pageCount:pageCount,pageSize:pageSize,search:this.filters.search,dates:this.filters.dates} }).then(res => {
					console.log(res)
					var data = res.data;
					if(data.code == 0) {
						var data = data.data;
						var list = [];
						for(var id in data){
							if(data[id].itemtype == "tot"){
								me.total = data[id].counts
							} else {
								list.push(data[id]);
							}
						}
						me.tableData = list;
					}
				});
			},
			handleSizeChange(val) {
				this.pageSize = val;
				if(Math.ceil(this.total / this.pageSize) >= this.currentPage) {
					this.getLogList((this.currentPage - 1) * this.pageSize,this.pageSize);
				}
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getLogList((val - 1) * this.pageSize,this.pageSize);
			},
			querydata(){
				console.log(this.filters.dates)
				this.getLogList((this.currentPage - 1) * this.pageSize,this.pageSize);
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
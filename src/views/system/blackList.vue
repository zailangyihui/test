<template>
	<section class="blackList">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="keyWords" size="small" placeholder="输入事件/内容进行搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryData" size="small">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="dialogBlack.show=true" size="small">添加</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="blackList" border style="width: 100%" :height="tableheight">
			<el-table-column prop="ip" label="IP" width="">
			</el-table-column>
			<el-table-column prop="creteTime" label="加入时间" width="">
			</el-table-column>
			<el-table-column prop="rem" label="备注" width="">
			</el-table-column>
			<el-table-column
		      fixed="right"
		      label="操作">
		      <template slot-scope="scope">
		        <el-button @click="deleteRecord(scope.row)" type="text" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<div class="block">
			<el-pagination 
				@size-change="onChangePageSize" 
				@current-change="pageNavi" 
				:current-page="currentPage" 
				:page-sizes="[10, 20, 30, 40]" 
				:page-size="100" 
				:layout="isOpenAside ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'" 
				:total="total"></el-pagination>
		</div>

		<dialog-black 
		:dialogBlack="dialogBlack"
		v-on:updata-black-list="queryBackList"
		v-on:close-add-black="dialogBlack.show=false"></dialog-black>
	</section>
</template>

<script>
import dialogBlack from '@/components/blackList/dialogBlack'
import { getBlackList, deleteBlackRecord } from '@/api/blackList.js'

export default {
	components: { dialogBlack },
	data() {
		return {
			isOpenAside: true,
			keyWords: '',
			blackList: [],
			dialogBlack : {
				show: false,
			},
			total: 0,
			currentPage: 1,
			pageSize: 10,
			tableheight: "530"
		}
	},
	methods: {
		async queryBackList(params){
			let result = await getBlackList(params)
			this.blackList = result.rows
			this.total = result.total
		},
		deleteRecord(row){
			console.log(row.id)
			this.$confirm('您确定删除该黑名单吗?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then( async () => {
	        	console.log('1111')
	        	let result = await deleteBlackRecord({ 'id': row.id })
	        	if(result.code === 0){
	        		this.$message({type: 'success', message: '删除成功!'})
	        		if(this.currentPage == Math.ceil(this.total/this.pageSize) && this.total%this.pageSize == 1){
			        	this.currentPage -= 1;
			        }
	        		this.queryData()
	        	}
	        }).catch(() => {});
		},
		queryData(){
			this.queryBackList({
				'pageCount': (this.currentPage - 1) * this.pageSize, 
				'pageSize': this.pageSize,
			});
		},
		onChangePageSize(val) {
			this.pageSize = val;
			if(Math.ceil(this.total / this.pageSize) >= this.currentPage) {
				this.queryUserList({
					'pageCount': (this.currentPage - 1) * this.pageSize, 
					'pageSize': this.pageSize,
				});
			}
		},
		pageNavi(val) {
			this.currentPage = val;
			this.queryUserList({
				'pageCount': (val - 1) * this.pageSize,
				'pageSize': this.pageSize,
			})
		},
	},
	created() {
		this.queryBackList({
			'pageCount': 0,
			'pageSize': this.pageSize
		});
		this.$nextTick(function(){
			var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.tableheight = h - 280
		})
		
	},
}
</script>

<style lang="less" scoped>
@import '../../assets/css/base.less';
.blackList {.pl(10px);
	.el-form { .p(15px 0);
		.el-form-item {.mb(0px)}
	}
	.el-pagination {.tc;.mt(10px)}
}
</style>
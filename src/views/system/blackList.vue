<template>
	<section class="blackList">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="keyWords" size="small" placeholder="输入事件/内容进行搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTableData" size="small">查询</el-button>
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
				@current-change="onGotoPage" 
				:current-page="pagenavi.current" 
				:page-sizes="pagenavi.sizes" 
				:page-size="pagenavi.size" 
				:layout="pagenavi.layout" 
				:total="pagenavi.total"></el-pagination>
		</div>

		<dialog-black 
		:dialogBlack="dialogBlack"
		v-on:updata-black-list="getTableData"
		v-on:close-add-black="dialogBlack.show=false"></dialog-black>
	</section>
</template>

<script>
import { initPage } from '@/mixins/initPage.js'
import dialogBlack from '@/components/blackList/dialogBlack'
import { getBlackList, deleteBlackRecord } from '@/api/blackList.js'

export default {
	name: 'BlackList',
	mixins:[initPage],
	components: { dialogBlack },
	data() {
		return {
			keyWords: '',
			blackList: [],
			dialogBlack : {
				show: false,
			},
		}
	},
	methods: {
		async getTableData(params){
			let data = {
				'pageCount': this.pagenavi.count, 
				'pageSize': this.pagenavi.size, 
				'search': this.keyWord
			}
			let queryData = Object.assign(data, params)
			let result = await getBlackList(queryData)

			this.blackList = result.rows
			this.pagenavi.total = result.total
		},
		deleteRecord(row){
			console.log(row.id)
			this.$confirm('您确定删除该黑名单吗?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then( async () => {
	        	let result = await deleteBlackRecord({ 'id': row.id })
	        	if(result.code === 0){
	        		this.$message({type: 'success', message: '删除成功!'})
	        		this.queryData()
	        	}
	        }).catch(() => {});
		},

	},
	created() {
		this.getTableData();
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
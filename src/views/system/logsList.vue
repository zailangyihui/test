<template>
	<section class="logs">
		<el-col :span="24" class="filter">
			<el-form :inline="true">
				<el-form-item>
					<el-date-picker size="small" v-model="day" type="date" placeholder="选择日期" format="yyyy-MM-dd" >
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-input v-model="keyWord" size="small" placeholder="输入事件/内容进行搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTableData" size="small">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="logsList" border style="width: 100%" :height="tableheight">
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
			<el-pagination 
				@size-change="onChangePageSize" 
				@current-change="onGotoPage" 
				:current-page="pagenavi.current" 
				:page-sizes="pagenavi.sizes" 
				:page-size="pagenavi.size" 
				:layout="pagenavi.layout" 
				:total="pagenavi.total"></el-pagination>
		</div>
		
		
	</section>
</template>

<script>
import { initPage } from '@/mixins/initPage.js'
import { getLogsList } from '@/api/logList.js'
import moment from 'moment'
export default {
	name: 'LogsList',
	mixins:[initPage],
	data() {
		return {
			keyWord: '',
			day: moment(new Date()).format('YYYY-MM-DD'),
			logsList: [],
		}
	},
	methods: {
		async getTableData(params){ //dates
			let data = {
				'pageCount': this.pagenavi.count, 
				'pageSize': this.pagenavi.size, 
				'search': this.keyWord,
				'dates': this.day
			}
			let queryData = Object.assign(data, params)
			let result = await getLogsList(queryData)
			this.logsList = result.rows;
			this.pagenavi.total = result.total;
		},
	},
	created(){
		//this.getTableData();
		console.log(this.day)
	}
}
</script>

<style lang="less">
@import '../../assets/css/base.less';
.logs{.p(10px);
	.filter{
		.el-form-item {.mb(10px);}
	}	
	.el-pagination {
		text-align: center;
		margin-top: 10px;
	}
}
</style>
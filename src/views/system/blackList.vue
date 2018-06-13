<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.search" size="small" placeholder="输入事件/内容进行搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="querydata" size="small">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addBlackVisible=true" size="small">添加</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="tableData" border style="width: 100%" :height="tableheight">
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
		        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<!--添加黑名单模态框-->
		<el-dialog title="Dialog" :visible.sync="addBlackVisible" :close-on-click-modal="true" :modal="false" width="500px">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="IP" prop="ip">
					<el-input v-model="addForm.ip" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="rem">
					<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入备注"
					  v-model="addForm.rem">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addBlackVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveBlack">确定</el-button>
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
				addForm:{
					ip:"",
					rem:""
				},
				addBlackVisible:false,
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
			this.getBlackList(0,this.pageSize);
		},
		methods: {
			getBlackList(pageCount,pageSize){
				var me = this;
				console.log(this.filters.search)
				this.$store.dispatch('axiosPost', { url: 'GETBLACKLIST', params: {pageCount:pageCount,pageSize:pageSize,search:this.filters.search} }).then(res => {
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
					this.getBlackList((this.currentPage - 1) * this.pageSize,this.pageSize);
				}
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getBlackList((val - 1) * this.pageSize,this.pageSize);
			},
			querydata(){
				this.getBlackList((this.currentPage - 1) * this.pageSize,this.pageSize);
			},
			saveBlack(){
				var me = this;
				if(!this.addForm.ip){
					me.$message.error("请输入IP");
					return
				}
				if(!this.addForm.rem){
					me.$message.error("请输入备注");
					return
				}
				this.$store.dispatch('axiosPost', { url: 'SETBLACKLIST', params: this.addForm }).then(res => {
					var data = res.data;
					if(data.code == 0) {
						me.$message({
				          message: data.message,
				          type: 'success'
				        });
				        me.addForm = {
							ip:"",
							rem:""
						};
						if(me.currentPage == Math.ceil(me.total/me.pageSize) && me.total%me.pageSize == 0){
				        	me.currentPage += 1;
				        }
				        me.getBlackList((me.currentPage - 1) * me.pageSize,me.pageSize);
					} else {
						me.$message.error(data.message);
					}
				});
			},
			handleDelete(id){
				var me = this;
				this.$confirm('您确定删除该黑名单吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.$store.dispatch('axiosPost', { url: 'REMOVEBLACKLIST', params: {id:id} }).then(res => {
						var data = res.data;
						if(data.code == 0) {
					        if(me.currentPage == Math.ceil(me.total/me.pageSize) && me.total%me.pageSize == 1){
					        	me.currentPage -= 1;
					        }
					        me.getBlackList((me.currentPage - 1) * me.pageSize,me.pageSize);
					        me.$message({
					          message: data.message,
					          type: 'success'
					        });
						} else {
							me.$message.error(data.message);
						}
					});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
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
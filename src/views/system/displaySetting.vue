<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="descbox">
					<el-col :span="4" class="text-right">
						主题颜色：
					</el-col>
					<el-col :span="20">
						<template v-for="(item,index) in theme">
							<span class="themecolor" :class="item.selected ? item.bgclass : ''" :style="item.bcolor" @click="selectTheme(index,item.bgclass)"></span>
						</template>
					</el-col>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="btnrow">
		  <el-col :span="20" :offset="4">
		  		<el-button type="primary" size="small" @click="saveTheme()">保存</el-button>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				theme: [
					{bcolor:"border:1px solid #62a8ea",bgclass:"bg-blue",selected:true},
					{bcolor:"border:1px solid #46be8a",bgclass:"bg-green",selected:false},
					{bcolor:"border:1px solid #8d6658",bgclass:"bg-brown",selected:false},
					{bcolor:"border:1px solid #57c7d4",bgclass:"bg-cyan",selected:false},
					{bcolor:"border:1px solid #757575",bgclass:"bg-grey",selected:false},
					{bcolor:"border:1px solid #677ae4",bgclass:"bg-indigo",selected:false},
					{bcolor:"border:1px solid #f2a654",bgclass:"bg-orange",selected:false},
					{bcolor:"border:1px solid #f96197",bgclass:"bg-pink",selected:false},
					{bcolor:"border:1px solid #926dde",bgclass:"bg-purple",selected:false},
					{bcolor:"border:1px solid #f96868",bgclass:"bg-red",selected:false},
					{bcolor:"border:1px solid #3aa99e",bgclass:"bg-teal",selected:false},
					{bcolor:"border:1px solid #f9cd48",bgclass:"bg-yellow",selected:false}
				]
			}
		},
		mounted() {

		},
		methods: {
			selectTheme(index,bgclass){
				for(var id in this.theme){
					this.theme[id].selected = false;
				}
				this.theme[index]["selected"] = true;
				this.$emit('refreshTheme',bgclass);
			},
		}
	}
</script>

<style scoped>
	.themecolor {
		display: inline-block;width: 20px;height: 20px;border-radius: 50%;margin-right: 10px;
	}
	.btnrow {
		margin-top: 40px;
	}
	.descbox h3 {
		font-size: 16px;
    	color: #37474f;
    	font-weight: 500;
	}
	.descbox {
		overflow: hidden;
		padding: 40px 15px;
		background-color: #fff;
	}
	
	.descbox h3 {
		color: #777;
		margin: 0;
	}
	
	.content {
		padding: 15px;
	}
	.content ol {
		margin: 0;
		padding: 0;
	}
</style>
<template>
	<div class="theme">

		<div class="descbox">
			<el-col :span="4" class="text-right">
				主题颜色：
			</el-col>
			<el-col :span="20">
				<template v-for="(item,index) in themeList">
					<span class="item" :class="item.selected ? item.bgclass : ''" :style="item.bcolor" @click="selectTheme(index,item.bgclass)"></span>
				</template>
			</el-col>
		</div>
	</div>
</template>

<script>
import { initPage } from '@/mixins/initPage.js'

export default {
	name: 'Theme',
	mixins:[initPage],
	data() {
		return {
			themeList: [
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
			],
			selectedTheem: 'bg-blue',
		}
	},
	methods: {
		selectTheme(index,bgclass){
			for(var id in this.themeList){
				this.themeList[id].selected = false;
			}
			this.themeList[index]["selected"] = true;
			this.selectedTheem = bgclass
			this.$store.commit('UPDATA_THEME', bgclass);
			localStorage.setItem('ADMIN-THEME', this.selectedTheem)
		},
	},
	created(){
		
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/base.less';
.theme {.p(0px);
	.btn-save {.mt(40px); .ml(150px) }
	.descbox {padding: 40px 15px; background-color: #fff;
		h3 { .fs(16px); color: #37474f; font-weight: 500; }
		.item { .dib; .w(20px);.h(20px);.bdr(50%);.mr(10px); }
	}
}
</style>
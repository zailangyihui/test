<template>
	<div class="el-nav" :class="packupClass">
		<el-tabs :value="currentNavi" type="card" closable @tab-click="gotoPage"  @tab-remove="removeTab">
		  	<el-tab-pane
		    	v-for="(item, index) in navi"
		    	:key="index"
		    	:label="item.text"
		    	:name="item.url"
		  	>
		  	</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Navi',
	computed: {
		...mapGetters(['navi', 'asideState', 'currentNavi']),
	},
	data() {
		return {
			packupClass: '',
		}
	},
	
	watch:{
		'asideState': function(state){
			console.log(state)
			if(state === 'packup') {
				this.packupClass = 'packup'
			}else{
				this.packupClass = ''
			}
		},
		'currentNavi': function(url){
			console.log('-----------',url)
			this.$store.commit('UPDATA_CURRENT_LEFT_MENU', url)
			this.$router.push({'path': url})
		}
	},
    methods:{
    	gotoPage(tab){
    		console.log(tab)
    		this.$store.commit('UPDATA_CURRENT_NAVI', tab.name) //url
    	},
    	removeTab(url) {
    		console.log('url:', url)
	        let navis = this.navi;
	        let currentUrl = this.currentNavi;
	        console.log('currentUrl:',currentUrl, url)
	        if (currentUrl === url) {
	        	console.log('--------------')
	          	navis.forEach((item, index) => {
	            	if (item.url === url) {
	            		console.log('yes')
	              		let nextTab = navis[index + 1] || navis[index - 1];
	              		if (nextTab) {
	                		currentUrl = nextTab.url;
	              		}
	            	}
	          	});
	        }
	        this.$store.commit('UPDATA_CURRENT_NAVI', currentUrl)
	        this.$store.commit('UPDATA_NAVI', url)
	      //  this.$router.push({path: TYPEID[id]})
	     }
    },
    created(){
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/base.less';
.el-nav {.fix; top: 60px; left: 220px; right: 0; .h(40px); border-bottom: 1px solid #e4eaec;
	li {.rel;.fl;.h(40px);.lh(40px);.fs(14px);.tc; min-width: 105px;
		a {.dib;.p(0 28px 0 12px); cursor: pointer; color: #76838f;}
		i {.abs; top: 12px; right: 10px; color: #76838f;}
		&.active {background: #f1f4f5; }
	}
	&.packup {left: 80px;}
}
</style>
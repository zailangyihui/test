<template>
	<div class="el-nav" :class="packupClass">
		<el-tabs :value="currentNavi" type="card" closable @tab-click="gotoPage"  @tab-remove="removeTab">
		  	<el-tab-pane
		    	v-for="(item, index) in navi"
		    	:key="index"
		    	:label="item.text"
		    	:name="String(item.id)"
		  	>
		  	</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TYPEID } from '@/utils/Link'

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
		'currentNavi': function(value){
			console.log('-----------',value)
			this.$store.commit('UPDATA_CURRENT_LEFT_MENU', value)
			this.$router.push({'path': TYPEID[value]})
		}
	},
    methods:{
    	gotoPage(tab){
    		console.log(tab.name, TYPEID[tab.name])
    		this.$store.commit('UPDATA_CURRENT_NAVI', tab.name)
    	},
    	removeTab(id) {
    		console.log('id:', id)
	        let tabs = this.navi;
	        let activeName = this.currentNavi;
	        if (activeName == Number(id)) {
	          	tabs.forEach((tab, index) => {
	            	if (tab.id === Number(id)) {
	              		let nextTab = tabs[index + 1] || tabs[index - 1];
	              		if (nextTab) {
	                		activeName = nextTab.id;
	              		}
	            	}
	          	});
	        }
	        this.$store.commit('UPDATA_CURRENT_NAVI', activeName)
	        this.$store.commit('UPDATA_NAVI', Number(id))
	        this.$router.push({path: TYPEID[id]})
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
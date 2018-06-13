<template>
	<div class="home" :class="collapsed?'collapse-width':''">
		<el-container>
			<el-header :class="theme">
				<div class="logodiv">
					{{collapsed?'':'点餐后台管理'}}
				</div>
				<div class="tools">
					<ul class="toolsul">
						<li @click.prevent="collapse"><i class="el-icon-menu"></i></li>
						<template v-for="(item,index) in maimMenus">
							<li class="lnhid" @click="changeMenu(item.parentId)"><i class="iconfont icon-diancan1"></i><span>{{item.menuName}}</span></li>
						</template>
						 
					</ul>
				</div>
				<div class="h_right">
					<div class="lnhid">
						<span class="userno hidden-xs-only">{{userName}}</span>
						<img src="../assets/header.jpg" width="40px" class="hpic hidden-xs-only"/>
						<i class="iconfont icon-tuichu loginout" @click="loginout"></i>
					</div>
					<div class="lnshow rnlist">
						<i class="el-icon-more icon-more"></i>
						<ul class="rnlistul">
							<template v-for="(item,index) in maimMenus">
							<li @click="changeMenu(item.parentId)"><i class="iconfont icon-diancan1"></i>{{item.menuName}}</li>
							</template>
							<li @click="loginout">退出</li>
						</ul>
					</div>
				</div>
			</el-header>
			
			<el-aside>
				<el-row class="tac" style="height: 100%;" v-show="!collapsed">
					<el-col :span="24">
						<el-menu default-active="-1" style="height: 100%;" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
							<div class="types">{{types}}</div>
							<template v-for="(item,index) in leftnav">
								<el-menu-item :index="String(index)" v-if="item.url != '#'" @click="lineTo(item.url)">
									<i class="iconfont" :class="item.icon"></i>
									<span slot="title">{{item.text}}</span>
								</el-menu-item>
								<el-submenu :index="String(index)" v-else>
									<template slot="title">
										<i class="iconfont" :class="item.icon"></i>
										<span>{{item.text}}</span>
									</template>
									<el-menu-item-group v-if="item.children">
										<template v-for="(items,indexs) in item.children">
											<el-menu-item :index="index+'-'+indexs" @click="lineTo(items.url)"><i class="iconfont" :class="item.icon"></i>{{items.text}}</el-menu-item>
										</template>
									</el-menu-item-group>
								</el-submenu>
							</template>
						</el-menu>
					</el-col>
				</el-row>
				<div class="tac minhid" style="height: 100%;" v-show="collapsed">
					<div class="types">{{types}}</div>
					<ul class="mininav">
						<template v-for="(item,index) in leftnav">
							<li v-if="item.url != '#'" @click="lineTo(item.url)">
								<i class="iconfont" :class="item.icon"></i>
								<span class="hidden mininavspan">{{item.text}}</span>
							</li>
							<li class="navlistli" v-else>
								<i class="iconfont" :class="item.icon"></i>
								<span class="hidden mininavspan">{{item.text}}</span>
								<ul class="navlist2" v-if="item.children">
									<template v-for="(items,indexs) in item.children">
										<li @click="lineTo(items.url)">{{items.text}}</li>
									</template>
								</ul>
							</li>
						</template>
					</ul>
				</div>
			</el-aside>
			<div class="el-nav">
				<ul>
					<li><router-link  to="/about.go">首页</router-link></li>
					<li v-for="(item,index) in navs">
						<router-link  :to="item.url">{{item.name}}</router-link>
						<i class="el-icon-close" @click="close"></i>
					</li>
				</ul>
			</div>
			<el-main>
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view @refreshTheme="onRefresTheme"></router-view>
					</transition>
				</el-col>
			</el-main>
			<el-footer>Footer</el-footer>
			
		</el-container>
	</div>
</template>

<script>
	import common from '../common/js/common.js'
	export default {
		name: 'Home',
		data() {
			return {
				theme:"bg-blue",
				userName:"",
				types:"",
				collapsed:false,
				leftnav:[],
				navs:[],
				maimMenus:[],
			}
		},
		mounted() {
			var userinfo = common.getCookie('userinfo');
			userinfo = JSON.parse(userinfo);
			console.log("-==495439",userinfo,userinfo.Id);
			this.userName = userinfo.nikeName;
			var me = this;
			this.$store.dispatch('axiosPost', { url: 'MEUNINIT', params: {uid:userinfo.Id} }).then(res => {
				console.log(res,"=左侧导航=")
				var data = res.data;
				if(data.code == 0) {
					var treeMenu = data.data.treeMenu;
					me.types = treeMenu[0].text;
					me.leftnav = treeMenu[0].children;
					me.maimMenus = data.data.mainMenu;
					console.log(me.maimMenus,"=22222222222222222223333333311111111113")
				}
			});
			console.log(this.$store.state.user,"ppppppppppppppppp")
		},
		methods: {
		  changeMenu (pid) {
		  	var me = this;
			this.$store.dispatch('axiosPost', { url: 'PROJECTSUBMENUINIT', params: {pid:pid} }).then(res => {
				console.log(res,"=切换左侧导航=")
				var data = res.data;
				if(data.code == 0) {
					var treeMenu = data.data;
					me.types = treeMenu[0].text;
					me.leftnav = treeMenu[0].children;
				}
			})
		  },
		  lineTo (href) {
		  	this.$router.push(href);
		  },
		  onRefresTheme (theme) {
            this.theme = theme;
          },
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleSelect(key, keyPath){
	      	console.log(key, keyPath);
	      },
	      collapse(){
	      	this.collapsed = !this.collapsed;
	      },
	      close(){
	      	console.log("----------")
	      },
	      loginout(){
	      	console.log("点击退出")
	      	this.$router.push('/');
	      },
	      changebg(theme){
	      	console.log("22222222222222")
	      	this.theme = theme;
	      }
	    }
	}
</script>

<style scoped>
	@import '../common/css/iconfont.css';
	@import 'element-ui/lib/theme-chalk/display.css';
	.home {
		font-family: "Helvetica Neue",Helvetica,Tahoma,Arial,"Microsoft Yahei","Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;
	}
	.el-menu-item {
		height: 37px;
		line-height: 37px;
	}
	.navlistli:hover .navlist2 {
		display: block;
	}
	.navlist2 {
		position: absolute;top: 0;left: 90px;background-color: #545c64;padding: 0 30px;
		display: none;
	}
	.navlist2 li {
		min-width: 80px;
	}
	.types {
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		text-align: left;
		color: #eee;
		font-size: 12px;
		margin-top: 15px;
		color: #76838f;
	}
	li {
		list-style: none;
	}
	.toolsul li {
		float: left;
		padding: 0px 15px;
		height: 60px;
		line-height: 60px;
	}
	.toolsul li:hover {
		background-color: rgba(0,0,0,.1);
	}
	.toolsul,
	.mininav {
		padding: 0;
		margin: 0;
	}
	.mininav li {
		height: 56px;
		line-height: 56px;
		color: #fff;
		cursor: pointer;
		position: relative;
	}
	.mininav li i {
		color: #909399;
	}
	.mininav li span {
		font-size: 14px;
	}
	.mininav li:hover i {
		display: none;
	}
	.mininav li:hover .mininavspan {
		display: block;
	}
	.mininav .router-link-active i {
		display: none;
	}
	.mininav .router-link-active .mininavspan {
		display: block;
		color: rgb(255, 208, 75);
	}
	.hidden {
		display: none;
	}
	.iconfont {
		margin-right: 10px;
		font-size: 18px;
	}
	.loginout {
		margin-right: 0px;
		margin-left: 10px;
		font-size: 20px;
		color: rgba(255,255,255,0.9);
		position: relative;
		top: -10px;
	}
	.hpic {
		border-radius: 50%;
	}
	a {
		text-decoration: none;
	}
	.h_right {
		position: absolute;right: 20px;top: 0;padding-top: 10px;height: 44px;
	}
	.userno {
		position: relative;top: -13px;left: -10px;
		color: #fff;
	}
	.el-menu {
		border: 0;
	}
	.el-submenu .el-menu-item {
	     min-width: initial; 
	}
	.el-header,
	.el-footer {
		background-color: #20a0ff;
		color: #333;
		text-align: center;
		padding: 0;
	}
	
	.el-header {
		height: 60px;
		position: fixed;
		top: 0;
		left: 0px;
		right: 0;
		z-index: 2;
		background-color: #62a8ea;
	}
	
	.el-footer {
		position: fixed;
		bottom: 0;
		left: 220px;
		right: 0;
		height: 30px !important;
		line-height: 30px;
	}
	
	.el-aside {
		background-color: #263238;
		text-align: center;
		line-height: 200px;
		position: fixed;
		top: 60px;
		left: 0;
		bottom: 0;
		z-index: 1;
	}
	.el-menu-item {
		color: rgba(163,175,183,.9) !important;
	}
	.el-menu-item.is-active {
		color: rgb(255, 208, 75) !important;
	}
	.el-menu-vertical-demo.el-menu,
	.el-menu-item, 
	.el-submenu__title {
		background-color: #263238 !important;
	}
	.el-submenu .iconfont,
	.el-menu-item .iconfont {
		margin-right: 5px;
		font-weight: 400;
		font-size: 14px;
	}
	.el-nav {
		position: fixed;
		top: 60px;
		left: 220px;
		right: 0;
		height: 39px;
		border-bottom: solid 1px #e4eaec;
	}
	.el-nav ul {
		margin: 0;
		padding: 0;
	}
	.el-nav ul li {
		float: left;
		height: 39px;
		line-height: 39px;
		list-style: none;
		min-width: 105px;
		text-align: center;
		font-size: 14px;
		position: relative;
	}
	.el-nav ul li a {
		display: inline-block;
		height: 39px;
		line-height: 39px;
		min-width: 65px;
		padding: 0 28px 0 12px;
		text-align: center;
		font-size: 14px;
		color: #76838f;;
	}
	.el-nav ul li i {
		position: absolute;
    	top: 12px;
    	right: 10px;
    	color: #76838f;
	}
	.el-nav ul li.active {
		background: #f1f4f5;
	}
	.el-main {
		background-color: #F1F4F5;
		color: #333;
		position: fixed;
		top: 100px;
		bottom: 30px;
		left: 220px;
		right: 0;
	}
	.el-aside{
		width: 220px !important;
	}
	.collapse-width .el-aside{
		width: 90px !important;
	}
	.collapse-width .el-footer,
	.collapse-width .el-main,
	.collapse-width .el-nav {
		left: 90px;
	}
	
	.logodiv {
		float: left;
		height: 60px;
		width: 180px;
		line-height: 60px;
		padding: 0 20px;
		text-align: left;
		color: #fff;
		font-size: 20px;
		border-right: 1px solid rgba(238, 241, 146, 0.3);
	}
	.collapse-width .logodiv {
		width: 90px;
		padding: 0;
	}
	
	.el-submenu,
	.el-menu-item {
	    text-align: left;
	}
	.el-submenu .el-menu-item {
		text-align: center;
	}
	.tools {
		width: calc(100% - 420px);
		height: 60px;
		line-height: 60px;
		margin-left: 220px;
		text-align: left;
		padding-left: 30px;
		color: #fff;
		cursor: pointer;
	}
	
	.collapse-width .tools {
		margin-left: 90px;
	}
	.nav-ic {
		height: 56px;
		line-height: 56px;
		position: relative;
	}
	
	.little-nav-ul {
		position: absolute;
		left: 60px;
		top: 0;
		padding: 0;
		margin: 0;
		width: 200px;
		background-color: #e4e8f1;
		display: none;
	}
	.little-nav-ul li {
		height: 56px;
		line-height: 56px;
		text-align: center;
		list-style: none;
		color: #222;
		font-size: 14px;
	}
	.little-nav-ul li:hover {
		background-color: #C3C5CA;
	}
	.el-aside, .el-main{
		overflow: initial !important;
	}
	.nav-ic:hover .little-nav-ul {
		display: block;
	}
	.el-submenu .el-menu-item[data-v-5e265133] {
		text-align: left;
	}
	.lnshow {
		display: none;
	}
	.lnshow .rnlistul {
		padding: 0;
		margin: 0;
		position: absolute;
		top: 60px;
		right: -20px;
		background-color: #fff;
		display: none;
	}
	.lnshow .rnlistul li {
		padding: 10px 20px;
		min-width: 100px;
		font-size: 14px;
	}
	.lnshow:hover .rnlistul {
		display: block;
	}
	.icon-more {
		margin-top: 10px;
		color: #fff;
	}
	.toolsul .lnhid .iconfont {
		margin-right: 0;
	}
	.toolsul .lnhid span {
		position: relative;
		top: -2px;
	}
	@media only screen and (max-width: 768px) {
		.loginout {
			top: 8px;
		}
		.el-main {
			padding: 20px 10px;
		}
		.collapse-width .el-footer,
		.collapse-width .el-main,
		.collapse-width .el-nav {
			left: 0px;
		}
		.collapse-width .logodiv {
			width: 0px;
			padding: 0;
		}
		.collapse-width .tools {
			margin-left: 0px;
		}
		.collapse-width .el-aside{
			width: 0 !important;
		}
		.tools {
			padding-left: 1px;
		}
		.lnhid {
			display: none;
		}
		.lnshow {
			display: block;
		}
		.minhid {
			display: none;
		}
	}
</style>
<template>
	<div class="">
		<div class="media account-info" style="overflow: hidden;">
			<div class="media-left" style="float: left;">
				<div class="avatar avatar-online">
					<img src="/static/img/header.c01eb4f.jpg" alt="admin" style="width: 50px;height: 50px;border-radius: 50%;">
				</div>
			</div>
			<div class="media-body" style="float: left;">
				<h4 class="media-heading">欢迎您，xiaxuan@admui_demo<small>系统管理员</small></h4>
				<p class="media-content">
					<i class="icon icon-color wb-bell" aria-hidden="true"></i> 这是您第 160130 次登录，上次登录日期：2018-5-15 9:05:10，详细信息请查看
					<router-link  to="/logsList.go">日志</router-link>
					，如果不是您本人登录，请及时
					<router-link  to="/logsList.go">修改密码</router-link>
					。
				</p>
			</div>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="descbox">
					<h3>基本介绍</h3>
					<div class="content">
						<ol>
							<li>123456</li>
							<li>123456</li>
							<li>123456</li>
							<li>123456</li>
						</ol>
					</div>
				</div>

			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: "这是关于页面"
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.descbox h3 {
		font-size: 16px;
    	color: #37474f;
    	font-weight: 500;
	}
	.media-heading {
		color: #37474f;
		font-size: 16px;
		font-weight: 500;
	}
	.media-heading small {
		margin-left: 5px;
		font-size: 12px;
		font-weight: 400;
	    color: #a3afb7;
	}
	.media-content {
		font-size: 14px;
    	color: #76838f;
	}
	.media-content a {
		text-decoration: none;
		color: #62a8ea;
	}
	.media-content a:hover {
		text-decoration: underline;
		color: #89bceb;
	}
	.media-body {
		margin-left: 10px;
	}
	h4 {
		margin: 0 0 5px 0 !important;
	}
	p {
		margin: 10px 0;
	}
	.descbox {
		margin: 20px 0px;
		padding: 15px;
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
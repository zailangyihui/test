<template>
	<div class="about">
		<el-row>
			<div class="avatar avatar-online">
				<img src="/static/img/header.c01eb4f.jpg" alt="admin" style="width: 50px;height: 50px;border-radius: 50%;">
			</div>
			<div class="detail">
				<h4>欢迎您，xiaxuan@admui_demo<small>系统管理员</small></h4>
				<p>
					<i class="icon icon-color wb-bell" aria-hidden="true"></i> 这是您第 <span class="blue">{{count}}</span> 次登录，上次登录日期：<span class="blue">{{time}}</span>，详细信息请查看
					<router-link  to="/logsList.go">日志</router-link>
					，如果不是您本人登录，请及时
					<router-link  to="/logsList.go">修改密码</router-link>
					。
				</p>
			</div>
		</el-row>
		<el-row class="clearfix">
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
		name: 'About',
		data() {
			return {
				count: 160130,
				time: '2018-5-15 9:05:10'
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
@import '../../assets/css/base.less';
.about{ .p(10px); .pt(50px);
	.avatar{ .fl; .mr(20px) }
	.detail {.fl; .w(80%);
		.blue {color: #50A8F6}
	}
	.descbox { background: @white; .p(10px); .mt(30px);
		h3 {}
		.content {
			li {.lh(30px)}
		}
	}
}
</style>
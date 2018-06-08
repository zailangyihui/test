<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<h2>66666666666</h2>
		<ul>
			<li>
				<router-link to="/">
					Core Docs
				</router-link>
			</li>
			<li>
				<a href="https://vuejs.org" target="_blank">
					Core Docs
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'test',
		data() {
			return {
				msg: 'Welcome 6666e.js App'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>
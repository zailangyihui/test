<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/iconfont.css';
#app {
  font-family: "Helvetica Neue",Helvetica,Tahoma,Arial,"Microsoft Yahei","Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.v-modal{opacity: .2}

	.bg-green {
    background-color: #46be8a!important;
	}
	.bg-blue {
    background-color: #62a8ea!important;
	}
	.bg-brown {
    background-color: #8d6658!important;
	}
	.bg-cyan {
    background-color: #57c7d4!important;
	}
	.bg-grey {
    background-color: #757575!important;
	}
	.bg-indigo {
    background-color: #677ae4!important;
	}
	.bg-orange {
    background-color: #f2a654!important;
	}
	.bg-pink {
    background-color: #f96197!important;
	}
	.bg-purple {
    background-color: #926dde!important;
	}
	.bg-red {
    background-color: #f96868!important;
	}
	.bg-teal {
    background-color: #3aa99e!important;
	}
	.bg-yellow {
    background-color: #f9cd48!important;
	}
</style>

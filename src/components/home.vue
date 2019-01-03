<template>
	<div class="homeBox">现在啥都没有。。。</div>
</template>
<style lang="less" scoped>
.homeBox{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	font-size: .26rem;
}

</style>
<script>
	export default{
		created(){
			document.title = "首页";
		}
	}
</script>
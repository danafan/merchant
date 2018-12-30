<template>
	<div class="null">
		<div class="content">
			<img src="../assets/kong.png">
			<div class="txt">{{txt}}</div>
		</div>
		
	</div>
</template>
<style lang="less" scoped>
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	img{
		width: 1.2rem;
		height: 1.2rem;
	}
	.txt{
		font-size: .26rem;
		color: #999;
	}
}
</style>
<script>
	export default{
		props:{
			txt:{
				default:"列表为空"
			}
		}
	}
</script>
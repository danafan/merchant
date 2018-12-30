<template>
	<div class="box">
		<div class="loading">
			<div class="icon"><img src="../assets/loading.png"></div>
			<div class="txt">加载中...</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.box{
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	.loading{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.icon{
			margin-bottom: .2rem;
			position: relative;
			width: 1rem;
			height: 1rem;
			animation:1s linear 0s myrotate infinite;
			-webkit-animation:1s linear 0s myrotate infinite;/* Safari and Chrome */
			-moz-animation:1s linear 0s myrotate infinite;
			-o-animation:1s linear 0s myrotate infinite;
			img{
				position: absolute;
				widows: 100%;
				height: 100%;
			}
		}
		@keyframes myrotate{
			0% {
				transform:rotate(0deg);
			}    
			100% {
				transform:rotate(360deg);
			}
		}
		@-webkit-keyframes myrotate{/* Safari and Chrome */
			0% {
				transform:rotate(0deg);
			}    
			100% {
				transform:rotate(360deg);
			}
		}
		

		@-moz-keyframes myrotate {	/* Firefox */
			0% {
				transform:rotate(0deg);
			}    
			100% {
				transform:rotate(360deg);
			}
		}

		@-o-keyframes myrotate{ /* Opera */
			0% {
				transform:rotate(0deg);
			}    
			100% {
				transform:rotate(360deg);
			}
		}
		.txt{
			font-size: .28rem;
			color: #666;
		}
	}
}
</style>
<script>
	export default{


	}
</script>
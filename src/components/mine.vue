<template>
	<div class="mineBox">
		<div class="userInfo">
			<img :src="userInfo.headimgurl">
			<div class="wxname">{{userInfo.nickname}}</div>
			<div class="phone">tel：{{userInfo.phone}}</div>
		</div>
		<div class="pageItem" @click="jump('statis')">
			<div class="title">
				<img class="icon" src="../assets/statis.png">
				退货统计
			</div>
			<img class="right" src="../assets/right.png">
		</div>
		<div class="pageItem" @click="jump('detail')">
			<div class="title">
				<img class="icon" src="../assets/detail.png">
				退货详情
			</div>
			<img class="right" src="../assets/right.png">
		</div>
	</div>
</template>
<style lang="less" scoped>
.mineBox{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.userInfo{
		padding-top: 1rem;
		padding-bottom: .4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background: #ff5858;
		img{
			border-radius: 50%;
			width: 2rem;
			height:2rem;
		}
		.wxname,.phone{
			margin-top:.32rem;
			color: #fff;
			font-size: .3rem;
		}
	}
	.pageItem{
		border-bottom: 1px solid #ccc;
		display:flex;
		align-items: center;
		justify-content: space-between;
		padding-left: .4rem;
		padding-right: .4rem;
		width: 100%;
		height:.88rem;
		.title{
			display:flex;
			align-items: center;
			font-size:.26rem;
			.icon{
				margin-right: .32rem;
				width: .4rem;
				height:.42rem;
			}
		}
		.right{
			width: .32rem;
			height:.32rem;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				userInfo:{},		//用户信息
			}
		},
		created(){
			document.title = "我的";
			//获取用户信息
			this.getUserInfo();
		},
		methods:{
			//获取用户信息
			getUserInfo(){
				resource.userInfo().then(res => {
					if(res.data.code == "1"){
						this.userInfo = res.data.data;
					}else{
						this.$toast(res.data.msg);
					}
				});
			},
			//跳转
			jump(routers){
				this.$router.push(`/${routers}`);
			}
		}
	}
</script>
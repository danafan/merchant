<template>
	<div class="indexBox">
		<div class="pageWarp">
			<router-view></router-view>
		</div>
		<div class="navbar">
			<div class="barItem" @click="tab = '/home'">
				<img v-if="tab == '/home'" class="icon" src="../assets/home1.png">
				<img v-else class="icon" src="../assets/home.png">
				<div class="txt" :class="{'selTxt':tab == '/home'}">首页</div>
			</div>
			<div class="barItem" @click="tab = '/mine'">
				<img v-if="tab == '/mine'" class="icon" src="../assets/mine1.png">
				<img v-else class="icon" src="../assets/mine.png">
				<div class="txt" :class="{'selTxt':tab == '/mine'}">我的</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.indexBox{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.pageWarp{
		position: relative;
		width: 100%;
		flex:1;
	}
	.navbar{
		border-top:1px solid #999; 
		width: 100%;
		height:1.04rem;
		display:flex;
		justify-content: space-around;
		align-items: center;
		.barItem{
			display:flex;
			flex-direction: column;
			justify-content:space-around;
			align-items: center;
			font-size: .26rem;
			.icon{
				width: .4rem;
				height:.4rem;
				margin-bottom: .1rem;
			}
			.txt{
				color: #999;
			}
			.selTxt{
				color: #ff5858;
			}
		}
	}
}
</style>
<script>
	import store from '../store'
	export default{
		data(){
			return{
				tab:'/home',					//默认选中首页
			}
		},
		created(){
			//默认加载首页
			let tab = sessionStorage.getItem("tab");
			if(!!tab){
				this.tab = tab;
				this.$router.push(tab);
			}else{
				this.$router.push('/home');
			}
		},
		mounted(){
			store.commit('UPDATE_STATUS', {isLoading: false});
		},

		watch:{
			tab:function(n,o){
				if(n != o){
					sessionStorage.setItem("tab",n);
					this.$router.push(n);
				}
			}
		},
		methods:{
			
		}
	}
</script>










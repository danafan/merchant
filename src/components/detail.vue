<template>
	<div class="detailBox">
		<div class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" v-if="packageList.length > 0">
			<div class="pageItem" v-for="item in packageList" @click="list(item.id)">
				<div class="title">包裹号码：{{item.id}}（{{item.status}}）</div>
				<div class="content">
					<div class="contentItem">供应商：{{item.gys}}</div>
					<div class="contentItem">类型：<span class="difference">{{item.type}}</span></div>
					<div class="contentItem">件数：{{item.num}}</div>
					<div class="contentItem">日期：{{item.time}}</div>
				</div>
				<div class="foot">详情</div>
			</div>
		</div>
		<nulls v-else txt="包裹列表为空"></nulls>
	</div>
</template>
<style lang="less" scoped>
.detailBox{
	.list{
		background: #f4f4f4;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.pageItem{
		background:#fff;
		border:1px solid #f4f4f4;
		border-radius: .1rem;
		margin: .2rem auto;
		width: 88%;
		.title{
			border-bottom: 1px solid #f4f4f4;
			width: 100%;
			padding-left: .2rem;
			height:.8rem;
			line-height: .8rem;
			font-size: .28rem;
			font-weight: bold;
		}
		.content{
			border-bottom: 1px solid #f4f4f4;
			width: 100%;
			padding-left: .2rem;
			.contentItem{
				height:.6rem;
				line-height: .6rem;
				font-size:.26rem;
			}
			.difference{
				color: #ff5858;
			}
		}
		.foot{
			width: 100%;
			padding-left: .2rem;
			height:.8rem;
			line-height: .8rem;
			font-size: .28rem;
			color: #03abff;
		}
	}
}
</style>
<script>
	import nulls from '../components/null.vue'
	import resource from '../api/resource.js'
	import store from '../store'
	export default{
		data(){
			return{
				packageList:[],
				page:1,
				isLoad:true
			}
		},
		created(){
			document.title = "包裹列表";
			let id = this.$route.query.id;
			let obj = {
				page:this.page
			}
			if(!!id){
				obj.id = id;
			}
			//获取包裹列表
			this.getPackage(obj);		
		},
		methods:{
			//上拉加载
			loadMore(){
				if(this.isLoad == true){
					this.page += 1;
					let id = this.$route.query.id;
					let obj = {
						page:this.page
					}
					if(!!id){
						obj.id = id;
					}
					//获取包裹列表
					this.getPackage(obj);
				}
			},
			//获取包裹列表
			getPackage(obj){
				resource.packageList(obj).then(res => {
					if(res.data.code == "1"){
						let packageList = res.data.data;
						this.packageList = this.packageList.concat(Array.from(packageList));
						if(this.page == res.data.lastpage){
							this.isLoad = false;
						}else{
							this.isLoad = true;
						}
					}else{
						this.$toast(res.data.msg)
					}
				}).then(() => {
					store.commit('UPDATE_STATUS', {isLoading: false});
				})
			},
			//点击查看商品列表
			list(id){
				this.$router.push(`/goodsList?id=${id}`);
			}
		},
		components:{
			nulls
		}
	}
</script>
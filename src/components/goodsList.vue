<template>
	<div class="goodsList">
		<div class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" v-if="goodslist.length > 0">
			<div class="styleItem" v-for="item in goodslist">
				<div class="code">{{item.sku_id}}</div>
				<div class="num">{{item.count}}件</div>
			</div>
		</div>
		<nulls v-else txt="商品列表为空"></nulls>
	</div>
</template>
<style lang="less" scoped>
.goodsList{
	.list{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding-right: .2rem;
		padding-left: .2rem;
		overflow-y: scroll;
	}
	.styleItem{
		border-bottom:1px solid #ccc;
		width: 100%;
		height:.8rem;
		display:flex;
		justify-content:space-between;
		align-items: center;
		font-size:.28rem;
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
				goodslist:[],
				page:1,
				isLoad:true
			}
		},
		created(){
			document.title = "商品列表"
			let id = this.$route.query.id;
			let obj = {
				id:id,
				page:this.page
			}
			//获取商品列表
			this.getGoodsList(obj)
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
					this.getGoodsList(obj);
				}
			},
			//获取商品列表
			getGoodsList(obj){
				resource.goodsList(obj).then(res => {
					if(res.data.code == "1"){
						let goodslist = res.data.data;
						this.goodslist = this.goodslist.concat(Array.from(goodslist));
						if(this.page == res.data.lastpage){
							this.isLoad = false;
						}else{
							this.isLoad = true;
						}
					}else{
						this.$toast(res.data.msg);
					}
				}).then(() => {
					store.commit('UPDATE_STATUS', {isLoading: false});
				});
			}
		},
		components:{
			nulls
		}
	}
</script>










<template>
	<div class="box">
		<div class="selTime" @click="openPicker">
			<img src="../assets/left.png">
			<div class="title">{{title}}</div>
			<img src="../assets/right.png">
		</div>
		<div class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" v-if="style.length > 0">
			<div class="styleItem" v-for="item in style">
				<div class="code">{{Object.keys(item)[0]}}</div>
				<div class="num">{{Object.values(item)[0]}}件</div>
			</div>
		</div>
		<nulls v-else txt="款式列表为空"></nulls>
		<mt-datetime-picker
		ref="picker"
		type="date"
		:startDate=startdate
		:endDate=enddate
		v-model="pickerValue"
		@confirm="handleConfirm(1)"
		>
	</mt-datetime-picker>
</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.selTime{
		border-bottom: 1px solid #ccc;
		width: 100%;
		height:.8rem;
		display:flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		.title{
			margin-left: .32rem;
			margin-right: .32rem;
			font-size: .28rem;
		}
		img{
			width: .4rem;
			height:.4rem;
		}
	}
	.list{
		flex:1;
		padding-right: .2rem;
		padding-left: .2rem;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
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
}
</style>
<script>
	import nulls from '../components/null.vue'
	import resource from '../api/resource.js'
	import { DatetimePicker } from 'mint-ui';
	import store from '../store'
	export default{
		data(){
			return{
				startdate:new Date("2018/12/01"),
				enddate:new Date(),
				title:"",
				pickerValue:"",					//选中的时间
				style:[],						//款式列表
				page:1,
				isLoad:true
			}
		},
		created(){
			document.title = "款式列表";
			//获取今天的日期
			this.handleConfirm(0);
		},
		methods:{
			//上拉加载
			loadMore(){
				if(this.isLoad == true){
					this.page += 1;
					//获取款式列表
					this.getStyleList();
				}
			},
			//获取款式列表
			getStyleList(){
				let obj = {
					time:this.title,
					page:this.page
				}
				resource.styleList(obj).then(res => {
					if(res.data.code == "1"){
						let obj = res.data.data;
						let arr = [];
						for (let i in obj) {
							let o = {};
							o[i] = obj[i];
							arr.push(o)
						}
						this.style = this.style.concat(Array.from(arr));
						if(this.page == res.data.lastpage){
							this.isLoad = false;
						}else{
							this.isLoad = true;
						}
					}else{
						this.style = [];
						this.$toast(res.data.msg);
					}
				}).then(() => {
					store.commit('UPDATE_STATUS', {isLoading: false});
				});
			},
			//点击弹出时间选择框
			openPicker() {
				this.$refs.picker.open();
			},
			//获取某个时间
			handleConfirm(type){
				if(type == 0){
					var time = new Date();
				}else{
					var time = this.pickerValue;
				}
				let year = time.getFullYear();
				let month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1:"0" + (time.getMonth() + 1);
				let day = time.getDate() >= 10 ? time.getDate():"0" + time.getDate();
				this.title = year + "-" + month + "-" + day;
				this.page = 1;
				this.style = [];
				//获取款式列表
				this.getStyleList();
			}
		},
		components:{
			DatetimePicker,
			nulls
		}
	}
</script>
<template>
	<div>
		<div class="logo"></div>
		<div class="title">德儿退货</div>
		<div class="inputBox">
			<input class="phone" type="number" placeholder="请输入手机号" v-model="phone"/>
			<div class="code">
				<input type="number" placeholder="输入验证码" v-model="code">
				<div class="codeBut" @click="getCode" :class="{'selbutCode':notBut == false}">{{codebutTxt}}</div>
			</div>
		</div>
		<div class="an" :class="{'login':isLogin == true}" @click="login">登录</div>
	</div>
</template>
<style lang="less" scoped>
.logo{
	margin: 1rem auto 0;
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	background: red;
}
.title{
	font-weight: bold;
	width: 100%;
	text-align: center;
	margin-top: .4rem;
	font-size: .32rem;
}
.inputBox{
	margin: 1rem auto;
	width: 5.6rem;
	.phone{
		outline: none;
		margin-bottom: .2rem;
		border: 1px solid #666;
		border-radius:.05rem;
		width: 5.45rem;
		height:.8rem;
		padding-left: .1rem;
		font-size:.28rem;
	}
	.code{
		display: flex;
		margin-bottom: .2rem;
		width: 5.6rem;
		height:.8rem;
		.codeBut{
			border-radius:0 .05rem .05rem 0;
			background:#ff5858;
			width: 2rem;
			text-align:center;
			height:.8rem;
			line-height: .8rem;
			font-size:.26rem;
			color: #fff;
		}
		.selbutCode{
			background:#999;
			color: #fff;
		}
		input{
			border-top: 1px solid #666;
			border-bottom: 1px solid #666;
			border-left: 1px solid #666;
			border-right: none;
			border-radius:.05rem 0 0 .05rem;
			outline: none;
			flex:1;
			padding-left: .1rem;
			font-size:.28rem;
		}
	}
}
.an{
	margin:0 auto;
	background:#f4f4f4;
	border-radius:.05rem;
	width: 5.6rem;
	text-align:center;
	height:.8rem;
	line-height: .8rem;
	font-size:.28rem;
	color: #fff;
}
.login{
	margin:0 auto;
	background:#ff5858;
	border-radius:.05rem;
	width: 5.6rem;
	text-align:center;
	height:.8rem;
	line-height: .8rem;
	font-size:.28rem;
	color: #fff;
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				phone:"",						//手机号
				code:"",						//验证码
				codebutTxt: "获取验证码",     	//按钮文字
				time:60,							//倒数时间
				notBut:true,					//默认获取二维码按钮可以点击
				isLogin:false,					//默认登陆按钮不可点击
			}
		},
		watch:{
			phone:function(n,o){
				this.loginState();
			},
			code:function(n,o){
				this.loginState();
			}
		},
		methods:{
			//登录按钮状态展示
			loginState(){
				if(this.judgmentPhone.test(this.phone) && this.judgmentCode.test(this.code)){
					this.isLogin = true;
				}else{
					this.isLogin = false;
				}
			},
			//点击获取验证码
			getCode(){
				if(!this.judgmentPhone.test(this.phone)){
					this.$toast("请输入正确的手机号");
				}else{
       				if(this.notBut == true){				//如果按钮可以点击
       					let userInfo = {
       						phone: this.phone
       					}
       					resource.getCode(userInfo).then(res => {
            				if(res.data.code == '1'){ 		//发送成功
            					this.$toast("已发送");
              					this.timeDown();
              				}else{
              					this.$toast(res.data.msg);
              				}
              			});
       				}else{
       					this.$toast("操作频繁");
       				}
       			}
       		},
    		// 倒计时
    		timeDown () {
    			var _this = this;
    			if (_this.time > 0) {
        			_this.notBut = false;   //按钮不可点击
        			_this.time --;
        			_this.codebutTxt = "重新发送" + _this.time + "秒";
        			setTimeout(_this.timeDown, 1000);
        		} else {
        			_this.notBut = true;    //按钮可以点击
        			_this.time = 60;
        			_this.codebutTxt = "获取验证码";
        		}
        	},
        	//点击登录
        	login(){
        		if(!this.judgmentPhone.test(this.phone)){
					this.$toast("请输入正确的手机号");
				}else if(!this.judgmentCode.test(this.code)){
					this.$toast("请输入正确的验证码");
				}else{
					let obj = {
						phone:this.phone,
						code:this.code,
						openid:this.userObj.openid,
						nickname:this.userObj.nickname,
						headimgurl:this.userObj.headimgurl
					}
					resource.login(obj).then(res => {
						if(res.data.code == '1'){
							this.$toast("登录成功");
							this.$router.replace("/index");
						}else{
							this.$toast(res.data.msg);
						}
					});
				}
        	}


        }


    }
</script>
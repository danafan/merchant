import http from './request.js'
let path = {	
	authUrl:"login/getwechaturl",						//微信授权
	callback:"login/getuseropenid",						//获取用户信息
	loginCheck:"login/logincheck",						//判断用户状态
	getCode:"sms/send",									//获取验证码
	login:"sms/login",									//绑定
	packageList:"return/detail",						//退货详情
	goodsList:"return/goodslist",						//商品列表
	styleList:"my/stylelist",							//款式列表
	userInfo:"/my/index",								//获取用户信息

}
export default{
	//验证是否登录
	authUrl(params){
		return http.get(path.authUrl, params)
	},
	//获取用户信息
	callback(params){
		return http.get(path.callback, params)
	},
	//判断用户状态
	loginCheck(params){
		return http.get(path.loginCheck, params)
	},
	//获取验证码
	getCode(params){
		return http.get(path.getCode, params)
	},
	//绑定
	login(params){
		return http.get(path.login, params)
	},
	//包裹列表
	packageList(params){
		return http.get(path.packageList, params)
	},
	//商品列表
	goodsList(params){
		return http.get(path.goodsList, params)
	},
	//款式列表
	styleList(params){
		return http.get(path.styleList, params)
	},
	//获取用户信息
	userInfo(params){
		return http.get(path.userInfo, params)
	}
}










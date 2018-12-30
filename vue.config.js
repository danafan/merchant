module.exports = {	
	devServer: {
		host: '192.168.1.112', 			//主机名
		port: 8080, 					//端口号（默认8080）
		proxy: {
			'/wechat': {
				target: 'http://ceshi.ppg8090.com',
				ws: false,
				changOrigin: true,		//是否跨域
			}
		}
	}
}
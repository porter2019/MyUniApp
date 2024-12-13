// 默认配置（可以是开发环境或生产环境，取决于你的需求）
let config = {
	baseUrl: 'http://192.168.1.6:6100',
	tokenHeaderName: 'Authorization',
};

// 开发环境 && 开发工具中，临时将接口改为线上，方便快速调试线上的问题
if(process.env.NODE_ENV === 'development')
{
	//  && uni.getSystemInfoSync().platform === 'devtools'
	// config = {
	// 	baseUrl: 'https://api.domainm.com',
	// 	tokenHeaderName: 'Authorization',
	// };
}

// 正式环境
if (process.env.NODE_ENV === 'production') {
	// 正式环境配置
	config = {
		baseUrl: 'https://api.domainm.com',
		tokenHeaderName: 'Authorization',
	};
}

module.exports = config;
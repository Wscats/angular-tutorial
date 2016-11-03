//来自百度的API历史上的今天
//http://apistore.baidu.com/apiworks/servicedetail/1728.html
var http = require('http');
//处理字符串的模块
var querystring = require('querystring');
var data = {
	channelId: '5572a109b3cdc86cf39001db',
	channelName: '%E5%9B%BD%E5%86%85%E6%9C%80%E6%96%B0',
	title: '%E4%B8%8A%E5%B8%82',
	needContent: '0',
	needHtml: '0',
	page: '1',
};
http.request({
	//域名
	hostname: 'apis.baidu.com',
	//端口号
	port: '80',
	//路由和参数  后面是需要提交的数据
	path: '/showapi_open_bus/channel_news/search_news?' + querystring.stringify(data),
	//请求方法 可以为post
	method: 'GET',
	//这里放期望发送出去的请求头
	//注意百度是把API KEY放在请求头里面
	headers: {
		'apiKey': '0aea38d1a7c4443f2f00adc86c4c3e72'
	}
}, function(resquest) {
	resquest.setEncoding('utf8');
	resquest.on('data', function(data) {
		console.log('相应的内容为: ' + data);
	});
}).on('error', function(e) {
	console.log('problem with request: ' + e.message);
}).end();
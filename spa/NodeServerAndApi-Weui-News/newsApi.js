//module.exports才是真正的接口，exports只不过是它的一个辅助工具
exports.newsApi = newApi;
//module.exports = function(name, age) {
//	this.name = name;
//	this.age = age;
//	this.about = function() {
//		console.log(this.name + ' is ' + this.age + ' years old');
//	};
//};
//module.exports = newApi;
exports.name = 'wsscat';
//如果你想你的模块是一个特定的类型就用module.exports。如果你想的模块是一个典型的"实例化对象"就用exports
var http = require('http'),
	querystring = require('querystring');

function newApi(param, response) {
	var data = {
		channelId: '5572a109b3cdc86cf39001db',
		channelName: '国内最新',
		title: '上市',
		needContent: '0',
		needHtml: '0',
		page: param.page,
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
		var str = '';
		//不断监听，不然会丢失数据
		resquest.on('data', function(data) {
			str += data;
		});
		resquest.on('end', function() {
			response.end(param.callback + "(" + JSON.stringify(str) + ")");
		})
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	}).end();
}
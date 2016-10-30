//http
//fs IO
//url
//querystring 
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
console.log('开启服务器');
//console.log(http);
//console.log(url);
//http.get('http.js')
http.createServer(function(request, response) {
	request.setEncoding('utf-8');
	//request.url
	//获取url参数 http://127.0.0.1:8888/index?callback=JSON_CALLBACK
	var paramStr = url.parse(request.url).query;
	//获取url路由 /   /index
	var pathname = url.parse(request.url).pathname;
	console.log(pathname);
	//php $_GET 拿get请求的参数 ?callback=JSON_CALLBACK {callback:'JSON_CALLBACK'}
	var param = querystring.parse(paramStr);
	console.log(param);
	console.log(paramStr);
	//响应状态码
	//响应头
	response.writeHead(200, {
		//设置响应头的编码格式
		'content-Type': 'text/html;charset=utf-8',
	});
	//相应体
	switch(pathname) {
		//www1.ttplus.cn/publish/app/list//day/2016-08-09.json
		case '/page01':
			page(response,param,"www1.ttplus.cn","80","/publish/app/list//day/2016-08-09.json");
			break;
			//http://www1.ttplus.cn/publish/app/list//olympic/42.json；第二个页面的列表请求接口
		case '/page02_detil':
			page(response,param,"www1.ttplus.cn","80","/publish/app/list//olympic/42.json");
			break;
			//http://www1.ttplus.cn/publish/app/list/newsHandle/newsHandleList.json，第二个页面的轮播请求接口
			case '/page02':
			page(response,param,"www1.ttplus.cn","80","/publish/app/list/newsHandle/newsHandleList.json");
			break;
			//导航的请求接口
		case '/nav':
			tuling(response,param);
			break;
			//24H请求接口http://www1.ttplus.cn/publish/app/list//live/752.json
		case '/hours':
			page(response,param,"www1.ttplus.cn","80","/publish/app/list//live/752.json");
			break;
			//足球页面请求接口http://www1.ttplus.cn/publish/app/list//fb/907.json
		case '/football':
			page(response,param,"www1.ttplus.cn","80","/publish/app/list//fb/907.json");
			break;
			//篮球页面请求接口http://www1.ttplus.cn/publish/app/list//bk/294.json
		case '/basketball':
			page(response,param,"www1.ttplus.cn","80","/publish/app/list//bk/294.json");
			break;
			//首页详情页面接口http://resource.ttplus.cn/publish/app/data/2016/08/09/16877/detail.json
		case '/detial_index':
			page(response,param,"www1.ttplus.cn","80",param.bianlian);
			break;
	}
	//response.end(jsonp);
	//监听端口号
}).listen(8888);

//function routeHtml(response, pathname){
//	console.log(pathname)
//	fs.readFile(pathname+".html", function(err, data) {
//		//console.log(data.toString());
//		response.end(data);
//	})
//}
function tuling(response,param) {
	http.request({
		//域名
		hostname: 'app.ttplus.cn',
		//端口号
		port: '1102',
		//路由和参数
		path: '/news/menu2?userid=YnPuVNDYlrU%3D',
		method: 'GET',
	}, function(resquest) {
		//设置请求头的编码格式
		resquest.setEncoding('utf8');
		//on===addEventlistener
		//监听请求结果
		var str ='';
		resquest.on('data', function(data) {
			console.log(data);
			console.log('反馈成功')
			str+=data;
		})
		//监听请求结束的事件
		resquest.on('end', function() {
			response.end(param['callback'] + "(" + str + ")");
			//response.end(str);
		})
	}).on('error', function(e){
		console.log(e);
		console.log('请求失败');
	}).end();
}
//各个切换页面
function page(response,param,a,b,c) {
	//www1.ttplus.cn/publish/app/list//day/2016-08-09.json
	http.request({
		//域名
		hostname: a,
		//端口号
		port: b,
		//路由和参数
		path: c,
		method: 'GET',
	}, function(resquest) {
		//设置请求头的编码格式
		resquest.setEncoding('utf8');
		//on===addEventlistener
		//监听请求结果
		var str='';
		resquest.on('data', function(data) {
			console.log(data);
			console.log('反馈成功');
			str += data;
			//response.end(param['callback2'] + "(" + data + ")");
		})
		//监听请求结束的事件
		resquest.on('end', function() {
			response.end(param['callback'] + "(" + str + ")");
			//response.end(str);
		})
	}).on('error', function(e){
		console.log(e);
		console.log('请求失败');
	}).end();
}

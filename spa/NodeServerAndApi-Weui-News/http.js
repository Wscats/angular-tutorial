/* Final Server */
var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring');
	path = require('path'),
	mime = require('./mime'),
	//引入newsApi模块
	newsApi = require('./newsApi.js');
	console.log(newsApi);

http.createServer(function(request, response) {
	//路由
	//get path from request's url
	var pathname = url.parse(request.url).pathname;
	//map the path to server path
	var absPath = __dirname + "/webroot" + pathname;
	//test whether the file is exists first
	//path.exists已经剔除现在改用fs.exists
	//判断文件是否存在
	fs.exists(absPath, function(exists) {
		if(exists) {
			//二进制方式读取文件
			fs.readFile(absPath, 'binary', function(err, data) {
				//our work is here
				if(err) throw err;
				//获取合适的 MIME 类型并写入 response 头信息
				var ext = path.extname(pathname);
				//把.html处理成html
				ext = ext ? ext.slice(1) : 'unknown';
				var contentType = mime.types[ext] || "text/plain";
				response.writeHead(200, {
					'Content-Type': contentType
				});
				//console.log(data);
				//使用二进制模式写
				response.write(data, 'binary');
				response.end();
			});
		} else {
			//show 404
			//response.end('404 File not found.');
		}
	});
	var paramStr = url.parse(request.url).query;
	//将参数转化为json对象
	//例如把?callback=JSON_CALLBACK&name=yao 转化为对象{callback:'JSON_CALLBACK',name:'yao'}
	var param = querystring.parse(paramStr);
	console.log(pathname)
	switch(pathname) {
		case '/indexTest':
			//在首页时候的默认相应 JSON.stringify()转字符串
			response.end(param.callback + "(" + JSON.stringify(datas) + ")");
			break;
		case '/rebot':
			//执行代理请求，请求图灵机器人接口，并返回jsonp
			//responseRebotMessage(param, response);
			break;
		case '/api':
			//执行代理请求，请求图灵机器人接口，并返回jsonp
			newsApi.newsApi(param, response);
			break;
		default:
			//读文件的方式，展示html页面
			//responseIndex(response);
			break;
	}
}).listen(8889);
console.log('Server start in port 8889');
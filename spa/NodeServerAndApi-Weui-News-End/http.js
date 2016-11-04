//require属于AMD加载方案 seajs属于CMD加载方案
//创建服务器模块
var http = require('http');
//读取文件的模块
var fs = require('fs');
//处理url的模块
var url = require('url');
//解析url的信息
var path = require('path');
//mime格式content-type格式
var mime = require('./mime.js')
//处理字符串的模块
var querystring = require('querystring')

//把获取获取信息的函数拿回来
var newsApi = require('./newsApi.js');
//用nodejs的原生模块http的createServer方法创建一个服务器
http.createServer((request, response) => {
	//处理字符串，避免中文或者符号的识别问题
	var pathname = url.parse(request.url).pathname;
	//拿url的参数
	var paramStr = url.parse(request.url).query;
	//把url拿回来的参数处理成对象
	var param = querystring.parse(paramStr)
	console.log(pathname);
	//拼接绝对路径
	var absPath = __dirname + '/webroot' + pathname
	//注意/webroot/index.html资源路径是错误的
	//这个才是正确的./webroot/index.html
	//判断是否存在我们要请求的文件
	fs.exists(absPath, function(exists) {
		//exists返回一个布尔值，根据布尔值判断文件是否存在，如果存在则fs.readFile读取该文件，并把读取的结果返回给浏览器
		if(exists) {
			//读取webroot服务器文件夹的某个资源，以二进制的方式读取
			fs.readFile(absPath, 'binary', function(err, data) {
				if(err) throw err;
				//获取文件的后缀格式，格式如.css .html .js
				var ext = path.extname(pathname);
				//处理后缀，例如把.css处理成css
				ext = ext.slice(1);
				var contentType = mime.types[ext];
				//写文件的请求头
				response.writeHead(200, {
					'Content-Type': contentType
				})
				//以二进制的方式解析结果，并输出到浏览器
				response.end(data, 'binary');
			})
		}
	})
	//根据路由判断进入到那个分支
	switch(pathname) {
		case '/newsApi':
			//请求新闻的内容
			newsApi.newsApi(param,response);
			break;
		default:
			break;
	}
}).listen(12345);
//监听12345端口，端口号可以自定义
console.log('开启服务器，然后在浏览器里面打开http://localhost:12345/news/index.html#/index/a');
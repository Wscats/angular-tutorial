//document.getElementById("text").innerHTML = "123";
//module的服务其实就是一些我们用到的方法，他可以是对象
//用angular对象的module方法来创建名字为angularDemo的ng程序
//ng===angular
//第一步:就是要创建一个angular.module("angularDemo",[]);
//比如我在<html>标签里面写ng-app我们就会在这一个html标签里面让angular程序生效
//又如我们在<body>标签里面写ng-app我们这个angular程序就会在body标签里面生效
//第二部:就是在DOM页面里面把名字赋给ng-app属性->ng-app="angularDemo"
//上面全部的写法就是为了定义这个angular程序运行的作用域
//$.each(function(){	
//})
//jQuery.each(function(){}). jQuery(),$();
var app = angular.module("angularDemo", []);
//第三部是写一个控制器，控制器方法controller()需要传两个参数，一个是控制器的名字，一个是控制器所要执行的回调方法
//$scope,
app.controller('studentCtrl', function($scope, $rootScope) {
	//$http.get(function(){
	//});
	//var text, name ,func = function(){alert("124")}; js所在函数的作用域
	//用$scope定义的变量，方法，对象等等都只是在这个函数的范围内，生命周期就是所在的这个function里面
	//var text1="456";
	//document.getElementById("text").innerHTML = text1;
	$scope.text = "进入学生的第一个页面";
	$scope.name = ""; //被ng-model获取道德yao给覆盖
	//$scope.$watch('name',function(){
	//	console.log($scope.name);
	//})

	//$rootScope是所有的$scope的老爸，就是所有$scope都是指向同一个$rootScope
	//$scope只是控制器所在的作用域
	//$rootScope可以在两个控制器之间传递数据
	//要用$rootScope的话，就要在回调函数传入$rootScope的服务

	//使用$rootScope
	//var change;
	$rootScope.change = "123";
	$scope.word = "abc";
	$scope.money = 123
	$scope.data = 1448864369815;
	console.log($rootScope.change);
	$scope.jsonObj = {
		"name": "yao"
	};
	$scope.jsonArr = '{"name":"yao"}';
	$scope.article = "limitTo过滤器用来截取数组或字符串，接收一个参数用来指定截取的长度。个人觉得这个filter有点鸡肋，首先只能从数组或字符串的开头进行截取，其次，js原生的函数就可以代替它了";
	//display:none跟display:block
	//ng-show跟ng-hide
	//document.getElementById().style.display = ""
	$scope.isexpand = true
	$scope.expend = function() {
		$scope.articleExpend = $scope.article;
		$scope.article = '';
		$scope.isexpand = false;
	}
	$scope.imgUrl = "../img/3812b31bb051f81972832628ddb44aed2e73e72a.jpg";
	$scope.style = {
		'border': '1px solid blue'
	};
	
	$scope.myNumber = 0;
	$scope.isEven = function(value) {
		if(value % 2 == 0)
			return true;
		else
			return false;
	};

});
app.controller('student2Ctrl', function($scope, $rootScope) {
	$scope.text = "进入学生的第二个页面";
	console.log($rootScope.change);
	$scope.pStyle = "pStyle";
});
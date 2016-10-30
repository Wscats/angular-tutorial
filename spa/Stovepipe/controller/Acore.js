var app=angular.module('fia',['ngRoute']);
app.config(function($routeProvider){
	$routeProvider.when('/index',{
		controller:'indexCtrl',
		templateUrl:'view/index.html'
	}).when('/recipe',{
		controller:'recipeCtrl',
		templateUrl:'view/recipe.html'
	}).otherwise({//如果找不到对应的路由就跳到index模板文件
		redirectTo:'/index',
	});
});

var nav = document.getElementById('nav');
var navs = nav.getElementsByTagName('a');
Tap(navs);
var footer= document.getElementById('footer');
var fnavs=footer.getElementsByTagName('a');
Tap(fnavs);
function Tap(objArr){
	objArr[0].className = 'isNavRed';
	for(var i = 0; i < objArr.length; i++) {
		objArr[i].onclick = function() {
			for(var j = 0; j < objArr.length; j++) {
				objArr[j].className = '';
			};
			this.className = 'isNavRed';
		};
	};
};


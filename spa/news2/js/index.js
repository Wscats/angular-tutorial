var app = angular.module('qingwen',['ionic']);
app.controller('mainCtrl',['$scope','getNewsData','$ionicScrollDelegate','$rootScope',function($scope,getNewsData,$ionicScrollDelegate,$rootScope){
	//页面一加载就获取菜单列表
	$scope.newnav = getNewsData.getMenu();
	$scope.tab = function(idx){
		$ionicScrollDelegate.scrollTop();
		var allLi = angular.element(document.querySelectorAll('.allLi'));
		for(var i=0;i<allLi.length;i++ ){
			allLi[i].classList.remove('active');
		}
		allLi[idx].classList.add('active');
	};
	//搜索的显示与隐藏
	$scope.propo = false;
	$scope.search = function(){
		$scope.propo = true;
	};
	$scope.close = function(){
		$scope.propo = false;
	};
	$rootScope.close = $scope.close;
	//夜间模式
	$scope.nightcalss = false;
	$scope.night = function(){
		$scope.nightcalss = !$scope.nightcalss;
	};


}]);
//构建路由
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
	$stateProvider
	.state('index',{
		url:'/index',
		templateUrl:'temp/index.html',
		// controller:'indexCtrl'
	})
	.state('index.newlist',{
		url:'/newlist/:navsindex',
		templateUrl:'temp/newlist.html',
		controller:'newlistCtrl'
	})
	.state('detail',{
		url:'/detail/:id',
		templateUrl:'temp/detail.html',
		controller:'newdetailCtrl'
	});
	$urlRouterProvider.when('', '/index/newlist/0');
}]);

app.controller('newlistCtrl', ['$scope','$http','getNewsData','$state','$rootScope', function ($scope,$http,getNewsData,$state,$rootScope) {
	//获取新闻菜单
	//$scope.newnav = getNewsData.getMenu();
	// var headerbg = document.getElementById('headerbg');
	if ($rootScope.bgcolor) {
		$scope.newcolor = $rootScope.bgcolor ;
	}
	//获取新闻列表
	var navsindex = $state.params.navsindex;//获取新闻频道的id
	console.log(navsindex);
	apiurl = navsindex in $scope.newnav ? $scope.newnav[navsindex].apiurl:'';
	if (!apiurl) {
		return ;
	}
	getNewsData.curPage = 1;
	$scope.newslist = null;
	getNewsData.newslist = [] ;//每次切换路由的时候清空数组内容
	getNewsData.getNewsList(apiurl).then(function(res){
		$scope.newslist = getNewsData.newslist;
	});

	//下拉刷新最新新闻内容
	$scope.doRefresh = function(){
		getNewsData.curPage = 1;
		getNewsData.newslist = [] ;//清空数组内容
		getNewsData.getNewsList(apiurl).then(function(res){
			$scope.newslist = getNewsData.newslist;
			console.log("刷新的列表:"+$scope.newslist);
		}).finally(function(){
			//下拉刷新后loading弹回
			$scope.$broadcast('scroll.refreshComplete');
		});
	}

	//加载更多
	$scope.loadMore = function () {
		if (getNewsData.curPage>=getNewsData.allPage) {
			return ;
		}
        getNewsData.curPage++;
		getNewsData.getNewsList(apiurl).then(function(res){
			$scope.newslist = getNewsData.newslist;
			console.log("当前页："+getNewsData.curPage);
		}).finally(function (error) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        });
    };


    // 搜索内容
	document.onkeydown = function(e){
		if (e.keyCode==13) {
			$rootScope.close();
			var input = angular.element(document.getElementById('search'));
			var val = input[0].value ;
			console.log(val);
			apiurl = 'http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title='+val+'&needContent=1&maxResult=20';
			getNewsData.curPage = 1;
			$scope.newslist = null;
			getNewsData.newslist = [] ;
			getNewsData.getNewsList(apiurl).then(function(res){
				$scope.newslist = getNewsData.newslist;
				input[0].value = '';
			});
		}
	};


}]);

function randomNum(min,max){
	var result = parseInt(Math.random()*(max-min+1)) + min;//0~1
	return result;
}
//获取随机的颜色
function randomColor(){
	//var str = '0123456789abcdef'; 完整的色彩
	var str = '0123456789';//比较淡的色彩
	var result = '#';
	for(var i=0;i<6;i++){
		result += str[randomNum(0,str.length-1)];
	}
	return result;
}

//新闻详情页控制器
app.controller('newdetailCtrl', ['$scope','getNewsData','$state', function ($scope,getNewsData,$state) {
	var newsId = $state.params.id;//获取新闻的列表的id
	$scope.detail = getNewsData.newslist[newsId];
	var detailHeader = document.querySelector('.detail-header');
	var detailTitle = document.querySelector('.detail-title');
	var tbgcolor = randomColor();
	detailHeader.style.background = tbgcolor;
	detailTitle.style.background = tbgcolor;
	
}]);

//封装新闻获取
app.factory('getNewsData', ['$http',function ($http) {
	return {
		curPage:1,
		allPage:'3',
		getMenu:function(){
			return [
			{title:'热门',apiurl:"http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title=热门&needContent=1&maxResult=20"},
			{title:'推荐',apiurl:"http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title=推荐&needContent=1&maxResult=20"},
			{title:'科技',apiurl:"http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title=科技&needContent=1&maxResult=20"},
			{title:'数码',apiurl:"http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title=数码&needContent=1&maxResult=20"},
			{title:'娱乐',apiurl:"http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title=娱乐&needContent=1&maxResult=20"},
			{title:'国内',apiurl:"http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title=国内&needContent=1&maxResult=20"},
			{title:'国际',apiurl:"http://route.showapi.com/109-35?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&title=国际&needContent=1&maxResult=20"},
			{title:'图片',apiurl:"http://route.showapi.com/255-1?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&type=10"},
			{title:'段子',apiurl:"http://route.showapi.com/255-1?showapi_appid=25350&showapi_sign=499321e69f444a25b436cafb9173f6c0&type=29"}]
		},
		newslist:[],
		getNewsList:function(apiurl){
			var _this = this ;
			apiurl+="&page="+this.curPage;
			console.log("当前页的api链接："+apiurl);
			return $http({
				method:'GET',
				url:apiurl,
			}).then(function(res){
				if (res.data.showapi_res_body.pagebean.allNum==0) {
					_this.newslist = [{title:"您搜索的内容为空...",source:'...'}];
				}
				var data = res.data.showapi_res_body.pagebean.contentlist;
				_this.allPage = res.data.showapi_res_body.pagebean.allPages;
				//每次我们加载下一页的数据的时候我们就往arrs合并
				// _this.newslist = data;
				_this.newslist = _this.newslist.concat(data);

			},function(err){
				_this.newslist = [{title:"获取数据失败..."}];
			});
		}
	};
}]);
//侧边栏控制器
app.controller('ContentController', ['$scope', '$ionicPopup','$rootScope',function($scope, $ionicPopup,$rootScope){
	/*$scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	  };*/
   // 自定义弹窗 更换主题
   $scope.bgc={oldbgcolor:null,newcolor:null};
   $scope.showPopup = function(){
   		 var myPopup = $ionicPopup.show({
	     template: '<ul id="getcolor"><li ng-click="theme(1)"></li><li ng-click="theme(2)"></li><li ng-click="theme(3)"></li><li ng-click="theme(4)"></li><li ng-click="theme(5)"></li><li ng-click="theme(6)"></li><li ng-click="theme(7)"></li></ul>',
	     title: '请选择主题色彩',
	     subTitle: '根据自己喜欢的颜色搭配吧！',
	     scope: $scope,
	     buttons: [
	       { text: '取消' },
	       {
	         text: '<b>保存</b>',
	         type: 'button-positive',
	         onTap: function(e) {
	         	console.log(e);
	         	console.log($scope.bgc);
	           if (!$scope.bgc) {
	             // 不允许用户关闭，除非输入 wifi 密码
	             e.preventDefault();
	           } else {
	             return $scope.bgc;
	           }
	         }
	       },
	     ]
	   });	

	   myPopup.then(function(res) {
         console.log('Tapped!', res);
         if (res) {
         	$scope.newcolor = 'background:'+ res.newcolor ;
         	$rootScope.bgcolor ='background:'+ res.newcolor ;
         }else {
         	headerbg.style.background = $scope.bgc.oldbgcolor;
         }
       });
       var headerbg = document.getElementById('headerbg');
       $rootScope.headerbg = headerbg ;
       //设置主题配色
	   $scope.theme = function(themenum){
	   		
	   		var oldbgcolor = headerbg.style.background;
	   		switch (themenum) {
	   			case 1:
	   				headerbg.style.background = "#28908a";
	   				return $scope.bgc = {oldbgcolor:oldbgcolor,newcolor:"#28908a"};
	   				break;
	   			case 2:
	   				headerbg.style.background = "#FB7299";
	   				return $scope.bgc = {oldbgcolor:oldbgcolor,newcolor:"#FB7299"};
	   				break;
	   			case 3:
	   				headerbg.style.background = "#3F51B5";
	   				return $scope.bgc = {oldbgcolor:oldbgcolor,newcolor:"#3F51B5"};
	   				break;
	   			case 4:
	   				headerbg.style.background = "#673AB7";
	   				return $scope.bgc = {oldbgcolor:oldbgcolor,newcolor:"#673AB7"};
	   				break;
	   			case 5:
	   				headerbg.style.background = "#2196F3";
	   				return $scope.bgc = {oldbgcolor:oldbgcolor,newcolor:"#2196F3"};
	   				break;
	   			case 6:
	   				headerbg.style.background = "#795548";
	   				return $scope.bgc = {oldbgcolor:oldbgcolor,newcolor:"#795548"};
	   				break;
	   			case 7:
	   				headerbg.style.background = "#607D8B";
	   				return $scope.bgc = {oldbgcolor:oldbgcolor,newcolor:"#607D8B"};
	   				break;
	   			default:
	   				// statements_def
	   				break;
	   		}
	   }
   }

}]);

//头部导航组件
app.directive('mheader', function() {
	return {
		templateUrl: 'temp/header.html'
	}
});

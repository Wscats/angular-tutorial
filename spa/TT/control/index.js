var app = angular.module('sua', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/index', {
			controller: 'indexCtrl',
			templateUrl: 'view/index.html'
		}).when('/zuixin', {
			controller: 'page02Ctrl',
			templateUrl: 'view/zuixin.html'
		}).when('/hours', {
			controller: 'hoursCtrl',
			templateUrl: 'view/hours.html'
		}).when('/football', {
			controller: 'footballCtrl',
			templateUrl: 'view/football.html'
		}).when('/basketball', {
			controller: 'basketballCtrl',
			templateUrl: 'view/basketball.html'
		}).when('/detial_index/:id', {
			controller: 'detial_indexCtrl',
			templateUrl: 'view/detial_index.html'
		}).when('/mine_page', {
			controller: 'mine_pageCtrl',
			templateUrl: 'view/mine_page.html'
		}).when('/denglu_page', {
			controller: 'denglu_pageCtrl',
			templateUrl: 'view/denglu_page.html'
		}).when('/phone_denlu_page', {
			controller: 'phone_denlu_pageCtrl',
			templateUrl: 'view/phone_denlu_page.html'
		}).when('/phone_zuce_page', {
			controller: 'phone_zuce_pageCtrl',
			templateUrl: 'view/phone_zuce_page.html'
		})
		.otherwise({
			redirectTo: '/index'
		})
});
//---------------------------------------导航页面控制器
app.controller('navCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
	$rootScope.menu = true;
	$http.jsonp('http://127.0.0.1:8888/nav?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功');
		console.log(data);
		$scope.mesgs = data;
	})

	//	$rootScope.fnck = function(e) {
	//		//this.style.color='red';
	//		console.log(e.target);
	//		angular.element(e.target).parent().parent().children().children().removeClass('nav_active');
	//		angular.element(e.target).addClass("nav_active");
	//
	//	}
}]);
//-------------------------------------导航组件化
//组件的应用，在组件中操作DOM
app.directive('navs', ['$location', function($location) {
	return {
		restrict: 'AECM',
		repalce: true,
		transclude: true,
		template: '<a href="#/index" class="nav_active">{{mesgs[0].name}}</a>' +
			'<a href="#/zuixin">{{mesgs[1].name}}</a>' +
			'<a href="#/hours">{{mesgs[2].name}}</a>' +
			'<a href="#/football">{{mesgs[3].name}}</a>' +
			'<a href="#/basketball">{{mesgs[4].name}}</a>',
		link: function(scope, element, attrs) {
			var oBox = document.getElementById('a_box');
			var aAs = oBox.getElementsByTagName('a');
			//console.log(location.hash);
			switch(location.hash) {
				case "#/index":
					angular.element(aAs).removeClass('nav_active');
					angular.element(aAs[0]).addClass('nav_active');
					break;
				case "#/zuixin":
					angular.element(aAs).removeClass('nav_active');
					angular.element(aAs[1]).addClass('nav_active');
					break;
				case "#/hours":
					angular.element(aAs).removeClass('nav_active');
					angular.element(aAs[2]).addClass('nav_active');
					break;
				case "#/football":
					angular.element(aAs).removeClass('nav_active');
					angular.element(aAs[3]).addClass('nav_active');
					break;
				case "#/basketball":
					angular.element(aAs).removeClass('nav_active');
					angular.element(aAs[4]).addClass('nav_active');
					break;
			}
			angular.element(aAs).on('click', function(e) {
				angular.element(aAs).removeClass('nav_active');
				angular.element(this).addClass('nav_active');
			});
		}

	}
}])

//------------------------------------首页新闻控制器
app.controller('indexCtrl', ['$scope', '$http', '$rootScope', 'shuaxin', function($scope, $http, $rootScope, shuaxin) {
		//		alert('进入首页控制器');
		//加载中
		$rootScope.loading = true;
		//初始化加载数量
		$scope.step = 0;
		//获取加载更多节点
		var loadMore = document.getElementById('loadMore');
		//请求封装
		var requst = function() {
				$scope.step += 5;
				$http.jsonp('http://127.0.0.1:8888/page01?&callback=JSON_CALLBACK').success(function(data) {
					console.log('请求成功');
					console.log(data.datas);
					if($scope.step > data.datas.length) {
						loadMore.innerHTML = '没有更多了';
						return;
					}
					//对请求回来的数据进行拆分
					$scope.mesgs = data.datas.slice(0, $scope.step)
						//加载中完成
					$rootScope.loading = false;
					loadMore.innerHTML = '加载更多...';
				})
			}
			//请求封装
		requst();
		//点击加载更多
		$scope.clickMore = function() {
				requst();
				loadMore.innerHTML = '正在加载...';
			}
			//====================下拉刷新服务引用
	}])
	//-----------------------------------最新页控制器，轮播图
app.controller('page02Ctrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
		//加载中
		$rootScope.loading = true;
		$http.jsonp('http://127.0.0.1:8888/page02?&callback=JSON_CALLBACK').success(function(data) {
				//				console.log('请求成功第二个页面');
				console.log(data.datas);
				//加载完成
				$rootScope.loading = false;
				$scope.mesgs = data.datas;
				//控制菜单的显示隐藏
				//swiper提供的js一定要写在这个控制器里
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					paginationClickable: true,
					spaceBetween: 30,
					centeredSlides: true,
					autoplay: 2500,
					autoplayDisableOnInteraction: false
				});
			})
			//控制菜单的显示隐藏
			//swiper提供的js一定要写在这个控制器里
	}])
	//------------------------------  最新页控制器,轮播下方列表部分
app.controller('page02_detil_Ctrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
	//加载中
	$rootScope.loading = true;
	$http.jsonp('http://127.0.0.1:8888/page02_detil?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功第二个页面的列表页');
		console.log(data.datas);
		$scope.mesgs = data.datas;
		//加载完成
		$rootScope.loading = false;
	})
}])

////====================定义一个下拉刷新的服务
app.service('shuaxin', ['$http', function($http) {
		return {
			method: function(mesgs) {}
		}
	}])
	//====================定义一个下拉刷新的服务结束

//------------------------------------24H页面控制器（下拉刷新）
app.controller('hoursCtrl', ["$scope", '$http', "$rootScope", 'shuaxin', function($scope, $http, $rootScope, shuaxin) {
	//加载中
	$rootScope.loading = true;
	//进入路由进行初次请求
	var shuaXinText = document.getElementById('shuaXin');
	$http.jsonp('http://127.0.0.1:8888/hours?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功第三个页面的列表页');
		console.log(data.datas);
		$scope.mesgs = data.datas;
		//加载完成
		$rootScope.loading = false;
		//========下拉刷新========
		//		$scope.$apply();

		//获取元素
		var hourBox = document.getElementById('refresh');
		var body = document.getElementsByTagName('body')[0];
		var big_box_hours = document.getElementById('big_box_hours');
		var shuaXin = document.getElementById('shuaXin');
		//当滚动条滚动距离小于0时监听滑动事件
		var touchStarX;
		var touchStarY;
		var scrollTop;
		//封装touchStar事件，以便移除（结束）
		var fn03 = function(e) {
				//再次获取获取滚动条滚动距离
				scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				console.log(scrollTop);
				touchStarX = e.touches[0].pageX;
				touchStarY = e.touches[0].pageY;
				console.log(touchStarY);
				//判断滚动条的位置，在顶部的时候给给hourBox添加touchmove事件
				if(scrollTop <= 0 && touchStarY > 70) {
					console.log(scrollTop);
					//给hourBox添加touchmove事件
					hourBox.addEventListener('touchmove', fn01);
				}
				//给hourBox添加touchend事件
				hourBox.addEventListener('touchend', fn02);
			}
		//给hourBox添加touchstar事件		
			hourBox.addEventListener('touchstart', fn03);
			//封装touchmove事件，以便移除（开始）
		var fn01 = function(e) {
				touchingX = e.touches[0].pageX;
				touchingY = e.touches[0].pageY;
				if((touchingY - touchStarY) > 0) {
					shuaXin.style.display = 'block'
					hourBox.style.top = touchingY - touchStarY + 'px';
				} else {
					return;
				}
			}
			//封装touchend事件，以便移除（结束）
		var fn02 = function() {
					if(scrollTop <= 0 && touchStarY > 70){
						shuaXin.innerHTML = '刷新中...'
						hourBox.style.top = 0;
						//发送请求开始
						$http.jsonp('http://127.0.0.1:8888/hours?&callback=JSON_CALLBACK').success(function(data) {
								console.log('请求成功第三个页面的列表页');
								console.log(data.datas);
								shuaXin.style.display = 'none';
								$scope.mesgs = data.datas;
								shuaXin.innerHTML = '松开马上刷新'
								//加载完成
								hourBox.removeEventListener('touchend', fn02);
							})
							//发送请求结束
	
						//移除touchmove事件
						hourBox.removeEventListener('touchmove', fn01);
					}
					
			}
	})

}])

//----------------------------------足球页面控制器
app.controller('footballCtrl', ["$scope", '$http', "$rootScope", function($scope, $http, $rootScope) {
		//加载中
		$rootScope.loading = true;
		$http.jsonp('http://127.0.0.1:8888/football?&callback=JSON_CALLBACK').success(function(data) {
			console.log('请求成功第四个页面的列表页');
			console.log(data.datas);
			$scope.mesgs = data.datas;
			//加载完成
			$rootScope.loading = false;
		})
	}])
	//--------------------------------篮球页面控制器
app.controller('basketballCtrl', ["$scope", '$http', '$rootScope', function($scope, $http, $rootScope) {
	//加载中
	$rootScope.loading = true;
	$http.jsonp('http://127.0.0.1:8888/basketball?&callback=JSON_CALLBACK').success(function(data) {
		console.log('请求成功第五个页面的列表页');
		console.log(data.datas);
		$scope.mesgs = data.datas;
		//加载完成
		$rootScope.loading = false;
	})
}])

//-----------------------------首页详情页面控制器
app.controller('detial_indexCtrl', ["$scope", "$routeParams", '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope) {
		//	alert('进入详情页的控制器');
		//加载中
		$rootScope.loading = true;
		$http.jsonp('http://127.0.0.1:8888/page01?&callback=JSON_CALLBACK').success(function(data) {
			console.log('请求成功');
			console.log(data.datas);
			var detialurl = data.datas[$routeParams.id].detailurl;
			$http.jsonp('http://127.0.0.1:8888/detial_index?&callback=JSON_CALLBACK&bianlian=' + detialurl).success(function(data) {
				//		console.log('请求成功第1个页面的详情页');
				console.log(data);
				$scope.mesgs = data;
				var discrip = document.getElementById('discrip');
				discrip.innerHTML = $scope.mesgs.detail[3].content;
				//加载完成
				$rootScope.loading = false;
			})
		})
	}])
	//----------------------------------首页页尾部分组件
app.directive('footers', function() {
		return {
			restrict: 'AECM',
			repalce: true,
			transclude: true,
			template: '<div id="foot_box"><a href="#/index" class="nav_active"><img  src="img/news_img.png"/><p>新闻</p></a>' +
				'<a><img  src="img/bisai_img.png"/><p>比赛</p></a>' +
				'<a><img  src="img/aoyun_img.png"/></a>' +
				'<a><img  src="img/faxian_img.png"/><p>发现</p></a>' +
				'<a href="#/mine_page"><img  src="img/mine_img.png"/>' +
				'<p>我的</p></a></div>',
			link: function(scope, element, attrs) {
				var foot_box = document.getElementById("foot_box");
				var aAs = foot_box.getElementsByTagName('a');
				angular.element(aAs).on('click', function() {
					angular.element(aAs).removeClass('nav_active');
					angular.element(this).addClass('nav_active');
				})
			}
		}
	})
	//-----------------------个人中心页面控制器
app.controller('mine_pageCtrl', ["$scope", '$http', function($scope, $http) {}])

//----------------------登录页面和注册页面控制器
app.controller('denglu_pageCtrl', ["$scope", '$http', function($scope, $http) {
		//	    alert('进入登录页面和注册选择页面控制器');
	}])
	//----------------------登录页面控制器
app.controller('phone_denlu_pageCtrl', ["$scope", '$http', function($scope, $http) {
		alert('进入手机登录页面控制器');
		var zuce_page = document.getElementById('zuce_page');
		var oSpan1 = document.getElementById('number1');
		var oSpan2 = document.getElementById('number2');
		var aInput = zuce_page.getElementsByTagName('input');
		var aP = zuce_page.getElementsByTagName('p');
		$scope.pan = false;
		$scope.onblur = function() {
			var reg1 = /^1[0-9]{10}$/;
			var val1 = angular.element(aInput[0]).val();
			console.log(val1);
			if(reg1.test(val1)) {
				angular.element(oSpan1).html('');
			} else {
				angular.element(oSpan1).html('请输入正确的手机号码！');
			}
		}
		$scope.onblur2 = function() {
				var reg2 = /^[a-zA-Z_][\w]{5,7}$/;
				var reg3 = /^[\D]/;
				var val2 = angular.element(aInput[1]).val();
				var val2_head = val2.substr(0, 1);
				console.log(val2_head);
				//判断密码格式
				if(reg3.test(val2_head) && reg2.test(val2)) {
					angular.element(oSpan2).html('');
				} else if(!reg3.test(val2_head)) {
					angular.element(oSpan2).html('密码不能以数字开头!');
				} else if(!reg2.test(val2_head)) {
					angular.element(oSpan2).html('密码要以6-8位的数字字母下划线组成!');
				}
			}
			//提交代码事件
		$scope.clickBtn = function() {
			alert(angular.element(aInput[0]).val());
			$scope.name = angular.element(aInput[0]).val();
			$scope.password = angular.element(aInput[1]).val();
			console.log($scope.name);
			$http.get('./login.php', {
				params: {
					name: $scope.name,
					//rsa加密
					password: $scope.password,
				}
			}).success(function(data) {
				console.log(data);
			})
		}
	}])
	//----------------------注册页面控制器
app.controller('phone_zuce_pageCtrl', ["$scope", '$http', function($scope, $http) {
	//	    alert('进入手机注册页面控制器');
	var zuce_page = document.getElementById('zuce_page');
	var oSpan1 = document.getElementById('number1');
	var oSpan2 = document.getElementById('number2');
	var aInput = zuce_page.getElementsByTagName('input');
	var aP = zuce_page.getElementsByTagName('p');
	$scope.pan1 = false;
	$scope.pan2 = false;
	$scope.onblur = function() {
		var reg1 = /^1[0-9]{10}$/;
		var val1 = angular.element(aInput[0]).val();
		console.log(val1);
		if(reg1.test(val1)) {
			angular.element(oSpan1).html('');
			$scope.pan1 = true;
		} else {
			angular.element(oSpan1).html('请输入正确的手机号码！');
			$scope.pan1 = false;
		}
		disables();
	}
	$scope.onblur2 = function() {
			var reg2 = /^[a-zA-Z_][\w]{5,7}$/;
			var reg3 = /^[\D]/;
			var val2 = angular.element(aInput[1]).val();
			var val2_head = val2.substr(0, 1);
			console.log(val2_head);
			//判断密码格式
			if(reg3.test(val2_head) && reg2.test(val2)) {
				angular.element(oSpan2).html('');
				$scope.pan2 = true;
			} else if(!reg3.test(val2_head)) {
				angular.element(oSpan2).html('密码不能以数字开头!');
				$scope.pan2 = false;
			} else if(!reg2.test(val2_head)) {
				angular.element(oSpan2).html('密码要以6-8位的数字字母下划线组成!');
				$scope.pan1 = false;
			}
			disables();
		}
		//判断提交按钮是否可以启用
	function disables() {
		if($scope.pan1 && $scope.pan2) {
			angular.element(aP[2]).attr({
				disabled: false
			});
			console.log(aP[2]);
		} else {
			angular.element(aP[2]).attr({
				disabled: true
			});
			console.log(aP[2]);
		}
	}
	//判断提交按钮是否可以启用

	//提交代码事件
	$scope.clickBtn = function() {
		$scope.name = angular.element(aInput[0]).val();
		$scope.password = angular.element(aInput[1]).val();
		console.log($scope.name);
		$http.get('./register.php', {
			params: {
				name: $scope.name,
				//rsa加密
				password: $scope.password,
			}
		}).success(function(data) {
			console.log(data);
		})
	}

}])
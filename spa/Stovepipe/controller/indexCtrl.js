//定义一个主页控制器
app.controller('indexCtrl',['$scope','$http',function($scope,$http){
	$scope.offset=5;
	$scope.loading = true;
	var loadMoreData=function(os){
		$http.jsonp('index.php',{
			params:{
				callback:'JSON_CALLBACK'
			}
		})
		.success(function(data){
			//给数据添加新的数据
//			angular.forEach(data.result,function(data){
//				data.image_length = data.image_urls.length;
//			});
			console.log(data)
			$scope.loading = false;
			$scope.datas=data.result;
		})
	}
	loadMoreData($scope.offset);
	$scope.loadMore=function(){
		$scope.offset+=5;
		loadMoreData($scope.offset);
	}
	$scope.isShow=false;
	$scope.toggle=function(){
		$scope.isShow=!$scope.isShow;
	}
}])
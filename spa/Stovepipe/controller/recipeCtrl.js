//定义一个减肥食谱页控制器
app.controller('recipeCtrl',['$scope','$http',function($scope,$http){
	$scope.offset=5;
	$scope.loading = true;
	var loadMoreData=function(os){
		$http.jsonp('recipe.php',{
			params:{
				callback:'JSON_CALLBACK'
			}
		})
		.success(function(data){
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
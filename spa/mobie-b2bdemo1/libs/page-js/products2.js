var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
	$scope.showfilter = function(_event){
		$('.sub-category').toggleClass('item-hidden');
	}
});
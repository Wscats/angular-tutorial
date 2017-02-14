module.exports = function(app) {
	app.controller('indexCtrl', ['$scope', 'tool', function($scope, tool) {
		$scope.name = 'yao';
		console.log(tool);
		var total = tool.sum(10, 21);
		console.log(total)
	}])
}
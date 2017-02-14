module.exports = function(app) {
	require('./xheader.css');
	app.directive('xheader', [function() {
		return {
			template: require('./xheader.html')
			//templateUrl: './xheader.html'
		}
	}])
}
module.exports = function(app) {
	app.service('tool', [function() {
		return {
			sum: function(a, b) {
				return a + b;
			}
		}
	}])
}
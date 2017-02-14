angular = require('angular');
var app = angular.module('myApp', []);
require('./controller/index.js')(app);
require('./directive/xheader/xheader.js')(app);
require('./service/tool.js')(app);
var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.state = $.getparams('state');
});
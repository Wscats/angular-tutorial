var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {

    $('.category-left').css({ height: $(window).height() - $('.layout-header').height() - $('.layout-footer').height() });

    $scope.tags = [];
    $scope.category = [];
    $http.get($('.category-left').data('url')).success(function (resp1) {
        $scope.tags = resp1;
        $http.get($('.category-right').data('url')).success(function (resp2) {
            $scope.category = resp2;
        });
    });

    $scope.tagClick = function (_data, _event) {
        $('.category-left>div').removeClass('active');
        $(_event.target).addClass('active');
        $http.get($('.category-right').data('url') + '?id=' + _data.id).success(function (resp2) {
            $scope.category = resp2;
        });
    }
});
var mainapp = angular.module('mainapp', ['globalapp', 'ngSanitize']);
mainapp.controller('maincontroller', function ($scope, $http) {

    $scope.swichTag = function (_m, _event) {
        $('a', $(_event.target).closest('div')).removeClass('active');
        $(_event.target).addClass('active');
        if (_m == 1) {
            $('.proinfor').show()
            $('.evaluate').hide();
        } else {
            $('.proinfor').hide()
            $('.evaluate').show();
        }
    }
});
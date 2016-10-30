var mainapp = angular.module('mainapp', ['globalapp', 'ngSanitize']);
mainapp.controller('maincontroller', function ($scope, $http, $q) {
    $scope.prodetail = {};
    $scope.myCarousel = [];
    $http.get($('.layout-body').data('url')).success(function (response) {
        $scope.prodetail = response;
        $scope.myCarousel = response.imgs;
    });

    $scope.repeatFinish = function () {
        window.setTimeout(function () {
            $('#focus').css({ height: 'auto' });
            TouchSlide({
                slideCell: "#focus",
                titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell: ".bd ul",
                effect: "left",
                autoPlay: true,//自动播放
                autoPage: true //自动分页
            });
        }, 1000);
    }

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
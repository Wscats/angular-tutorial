var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.myCarousel = [];

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

    $http.get($('#focus').data('url')).success(function (response) {
        $scope.myCarousel = response;
    });

    $scope.closeSearch = function(){
        $('.search-content').addClass('item-hidden');
    }

    $scope.showSearch = function(){
        $('.search-content').removeClass('item-hidden');
        $scope.keyword = "";
    }
});
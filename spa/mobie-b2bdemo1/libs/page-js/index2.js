var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.myCarousel = [];
    $scope.iscroll = {};
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
            
            //iscroll
            $scope.page = 1;
            $scope.lastpage = false;
            $scope.datalist = [];
            var _url = $('.layout-body').data('url');
            $scope.iscroll = new IScroll('.layout-body',{mouseWheel: false, scrollbars: false});
            console.log($scope.iscroll);
            $scope.iscroll.on('scrollEnd', function(){
                if($scope.lastpage){
                    return false;
                }
                if($scope.iscroll.y === $scope.iscroll.maxScrollY){
                    $http({url: _url, params: {page: $scope.page}, method: 'get'}).success(function(response){
                        $scope.datalist = $scope.datalist.concat(response.result);
                        $scope.pagesize = response.pageSize;
                        $scope.rowcount = response.totalCount;
                        $scope.pagecount = (($scope.rowcount % $scope.pagesize > 0) ? (parseInt($scope.rowcount / $scope.pagesize) + 1) : ($scope.rowcount / $scope.pagesize));
                        $scope.page++;
                        $scope.lastpage = $scope.page > $scope.pagecount;
                        window.setTimeout(function(){
                            $scope.iscroll.refresh();
                        }, 100);
                    })
                }
            })

            $scope.iscroll.on('scrollStart', function(){
                console.log(1);
            })
            //end iscroll
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

    $("img").lazyload({effect: "fadeIn"});

});
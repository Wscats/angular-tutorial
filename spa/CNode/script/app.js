var app = angular.module('myapp', ['ui.router', 'ngStorage']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
        url: '/index',
        templateUrl: './html/index.html',
    }).state('index.lists', {
        url: '/:tab',
        templateUrl: './html/index_list.html',
        controller: 'indexListsCtrl'
    }).state('my', {
        url: '/my',
        templateUrl: './html/my.html',
        controller: 'myCtrl'
    }).state('details', {
        url: '/details/:id',
        templateUrl: './html/details.html',
        controller: 'detailsCtrl'
    });
    //$urlRouterProvider.when('','/headlines/1')
    $urlRouterProvider.otherwise('/index/all');
}]);
app.controller('indexListsCtrl', ['$scope', '$http', '$stateParams', '$sessionStorage', function($scope, $http, $stateParams, $sessionStorage) {
    $scope.data = [];
    $scope.page = 1;
    $scope.limit = 10;
    $scope.loading = true;
    var more = function() {
        $http.get('https://cnodejs.org/api/v1/topics', {
            params: {
                tab: $stateParams.tab,
                page: $scope.page,
                limit: $scope.limit,
                mdrender: false
            }
        }).success(function(data) {
            console.log(data);
            $scope.data = $scope.data.concat(data.data);
            $sessionStorage[$stateParams.tab] = $scope.data;
            $sessionStorage[$stateParams.tab + 'page'] = $scope.page;
            $scope.loading = false;
        })
    }
    if ($sessionStorage[$stateParams.tab]) {
        $scope.data = $sessionStorage[$stateParams.tab];
        $scope.page = $sessionStorage[$stateParams.tab + 'page'];
        $scope.loading = false;
    } else {
        more();
    }
    $scope.loadMore = function() {
        $scope.page += 1;
        $scope.loading = true;
        more();
    }

}]);
app.controller('footnavCtrl', ['$scope', function($scope) {

}]);
app.controller('myCtrl', ['$scope', 'histoty', function($scope, histoty) {
    $scope.goback = histoty.goback;
}]);
app.controller('detailsCtrl', ['$scope', '$http', '$sce', '$state', 'histoty', '$sessionStorage', function($scope, $http, $sce, $state, histoty, $sessionStorage) {
    $scope.data = [];
    $scope.loading = true;
    if ($sessionStorage[$state.params.id]) {
        $scope.data = $sessionStorage[$state.params.id];
        $scope.content = $scope.data.content;
        $scope.replies = $scope.data.replies;
        $scope.loading = false;
    } else {
        $http.get('https://cnodejs.org/api/v1/topic/' + $state.params.id).success(function(data) {
            $scope.data = data.data;
            $scope.content = $scope.data.content;
            $scope.replies = $scope.data.replies;
            $sessionStorage[$state.params.id] = $scope.data;
            $scope.loading = false;
        })
    }

    $scope.goback = histoty.goback;

}]);
app.directive('autofocus', ['$location', function($location) {
    return {
        link: function(scope, ele, arrt) {
            scope.$location = $location;
            scope.$watch('$location.path()', function(now) {
                var aLink = ele.children().attr('href');
                var type = aLink.replace('#', '');
                if (now.indexOf(type) != -1) {
                    // 访问的是当前链接
                    ele.parent().children().removeClass('active');
                    ele.addClass('active');
                }
            })
        }
    }
}]);
app.directive('navfocus', ['$location', function($location) {
    return {
        link: function(scope, ele, arrt) {
            scope.$location = $location;
            scope.$watch('$location.path()', function(now) {
                var aLink = ele.children().attr('href').split('/')[1];
                if (now.indexOf(aLink) > 0) {
                    // 访问的是当前链接
                    ele.parent().children().removeClass('active');
                    ele.addClass('active');
                }
            })
        }
    }
}]);
app.filter('timeDiff', function() {
    return function(input) {
        //JavaScript函数：
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var dateTimeStamp = new Date(input).getTime();
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            return input;
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            result = parseInt(monthC) + "个月前";
        } else if (weekC >= 1) {
            result = parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            result = parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            result = parseInt(hourC) + "个小时前";
        } else if (minC >= 1) {
            result = parseInt(minC) + "分钟前";
        } else {
            result = "刚刚发布";
        }
        return result;
    }
});
app.filter('sceurl', ['$sce', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    }
}]);
app.filter('type', function() {
    return function(input) {
        var result = '';
        if (input == 'share') {
            result = '分享';
        } else if (input == 'ask') {
            result = '问答';
        } else if (input == 'job') {
            result = '招聘';
        } else {
            result = '精华';
        }
        return result;
    }
});
app.service('histoty', ['$window', function($window) {
    this.goback = function() {
        $window.history.back();
    }
}])
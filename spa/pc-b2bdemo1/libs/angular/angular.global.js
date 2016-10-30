var globalapp = angular.module('globalapp', []);
globalapp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return {
            'request': function (config) {
                if (!$('.sk-spinner-three-bounce.sk-spinner')[0]) {
                    var _html = '<div class="main-mask item-hidden"></div>';
                    _html += '<div class="sk-spinner sk-spinner-three-bounce item-hidden">';
                    _html += '<div class="sk-bounce1"></div>';
                    _html += '<div class="sk-bounce2"></div>';
                    _html += '<div class="sk-bounce3"></div>';
                    _html += '</div>';
                    $(_html).appendTo($('body'));
                }
                $('.sk-spinner-three-bounce.sk-spinner, .main-mask').removeClass('item-hidden');
                config.url = $.basurl() + config.url;
                config.params = $.extend(config.params, { '_': Math.random() });
                return config || $q.when(config);
            },
            'requestError': function (rejection) {
                return rejection;
            },
            'response': function (response) {
                $('.sk-spinner-three-bounce.sk-spinner, .main-mask').addClass('item-hidden');
                return response || $q.when(response);
            },
            'responseError': function (response) {
                $.alert(response.status + ' - ' + response.statusText + '<br/>请求路径：<br/>' + response.config.url, '请求错误');
                $('.sk-spinner-three-bounce.sk-spinner, .main-mask').addClass('item-hidden');

                return $q.reject(response);
            }
        };
    });
}]);

globalapp.directive('navcontainer', function ($compile) {
    return function (scope, element, attrs) {
        var _models = [
            { pagename: 'index.html', icon: 'clip-home', name: '首页', active: ['index.html'] },
            { pagename: 'category.html', icon: 'clip-cube-2', name: '分类', active: ['category.html'] },
            { pagename: 'shoppingcar.html', icon: 'clip-cart', name: '购物车', active: ['shoppingcar.html'] },
            { pagename: 'user.html', icon: 'clip-user-6', name: '个人中心', active: ['user.html'] }
        ];
        _models[$(element).data('active') || 0]['active'] = 'active';
        scope.navList = _models;
        var _html = "<a ng-repeat='m in navList' href='{{m.pagename}}' class='nav-btn {{m.active}}' style='width:" + 100/_models.length + "%;'><i class='{{m.icon}}'></i><span ng-bind='m.name'></span></a>";
        element.html(_html);
        $compile(element.contents())(scope);
    }
});

globalapp.factory('ngDAL', ['$http', function ($http) {

    //参数 _data 格式为 json {url:'', method: 'post', data: 'postdata'}
    var ngSmartClient = function (_data, _callback) {
        $http(_data).success(function (_response) {
            if (typeof _callback == 'function') {
                _callback(_response);
            }
        })
    }

    return {
        ngSmartClient: function (_data, _callback) {
            return ngSmartClient(_data, _callback);
        }
    }
}]);

globalapp.directive('pagescroll', function ($compile, ngDAL) {
    return function (scope, element, attrs) {
        scope.page = 1;
        scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10
        };        
        //var _url = $(element).data('url') + '/' + scope.page;
        var _url = $(element).data('url') + '?page=' + scope.page;
        if (window.location.search.substr(1)) {
            _url += ((_url.indexOf('?') > -1 ? '&' : '?') + window.location.search.substr(1));
        }

        var postData = {
            pageindex: scope.paginationConf.currentPage,
            pagesize: scope.paginationConf.itemsPerPage
        }

        ngDAL.ngSmartClient({ url: _url, method: 'GET' }, function (response) {
            scope.datalist = response.result;
            scope.pagesize = response.pageSize;
            scope.rowcount = response.totalCount;
            scope.pagecount = ((scope.rowcount % scope.pagesize > 0) ? (parseInt(scope.rowcount / scope.pagesize) + 1) : (scope.rowcount / scope.pagesize));
        });

        $(element).scroll(function () {
            console.log(screenTop)
            if (!scope.pagecount || scope.pagecount <= scope.page) {
                return false;
            }
            var $this = $(this),
            viewH = $(this).height(),//可见高度  
            contentH = $(this).get(0).scrollHeight,//内容高度  
            scrollTop = $(this).scrollTop();//滚动高度  
            
            if (scrollTop === (contentH - viewH)) { //到达底部100px时,加载新内容  
                if (scope.page >= scope.pagecount) {
                    return false;
                }
                scope.page++;
                //_url = $(element).data('url') + '/' + scope.page;
                _url = $(element).data('url') + '?page=' + scope.page;
                if (window.location.search.substr(1)) {
                    _url += ((_url.indexOf('?') > -1 ? '&' : '?') + window.location.search.substr(1));
                }
                ngDAL.ngSmartClient({ url: _url, method: 'GET' }, function (rep2) {
                    scope.datalist = scope.datalist.concat(rep2.result);
                });
            };
        });
    }
});

globalapp.directive('pagination', function ($compile, ngDAL) {
    return {
        controller: function ($scope, $element) {
            $scope.paginationConf = {
                currentPage: 1,
                itemsPerPage: 10
            };
        },
        link: function (scope, element, attrs) {
            //var _url = $(element).data('url') + '/' + scope.paginationConf.currentPage;
            var _url = $(element).data('url') + '?page=' + scope.paginationConf.currentPage;

            pageLoad = function () {
                ngDAL.ngSmartClient({ url: _url, method: 'GET' }, function (response) {
                    scope.datalist = response.result;
                    scope.pagesize = response.pageSize;
                    scope.rowcount = response.totalCount;
                    scope.pagecount = ((scope.rowcount % scope.pagesize > 0) ? (parseInt(scope.rowcount / scope.pagesize) + 1) : (scope.rowcount / scope.pagesize));
                    scope.paginationConf.totalItems = scope.rowcount;
                });
            }
            scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', pageLoad);
        }
    }
})

globalapp.directive('repeatFinish', function () {
    return {
        link: function (scope, element, attrs) {
            if (scope.$last === true) {
                scope.repeatFinish();
            }
        }
    }
})

globalapp.directive('navmorelist', function () {
    return {
        link: function (scope, element, attrs) {
            var _html = '<div class="navmorelist item-hidden" id="navmorelist">';
            _html += '<ul class="f14">';
            _html += '<li><a href="index.html">首页</a></li>';
            _html += '<li><a href="category.html">分类查询</a></li>';
            _html += '<li><a href="shoppingcar.html">购 物 车</a></li>';
            _html += '<li><a href="user.html">会员中心</a></li>';
            _html += '</ul>';
            _html += '</div>';
            element.html(_html);
        }
    }
})


globalapp.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});
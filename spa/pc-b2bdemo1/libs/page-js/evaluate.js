var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller("maincontroller", function ($scope, $http) {
    $scope.orderid = $.getparams('orderid') || -1;
    /**
     * 订单信息
     */
    $scope.orderInfo = {};
    //请求订单信息
    //$http.get(config.basurl + "/api/order/order/GetOrderInfoByOrderId?orderid=" + $scope.orderid).success(function (data) {
    //    console.log(data);
    //    if (data.status) {
    //        $scope.orderInfo = data.data;
    //    } else {
    //        $.jjuwDialog(data.msg);
    //    }
    //});
    //星级
    $scope.starList = [
        { stars: 1, descript: '非常差', active: true, lables: [{ title: '出品一般般' }, { title: '操作麻烦' }, { title: '态度差' }, { title: '有点贵' }] },
        { stars: 2, descript: '很差', active: true, lables: [{ title: '出品一般般' }, { title: '操作麻烦' }, { title: '态度差' }, { title: '有点贵' }] },
        { stars: 3, descript: '差', active: true, lables: [{ title: '出品一般般' }, { title: '操作麻烦' }, { title: '态度差' }, { title: '有点贵' }] },
        { stars: 4, descript: '满意', active: true, lables: [{ title: '服务质量好' }, { title: '棒棒哒' }, { title: '家门口超便利' }, { title: '服务态度真心赞' }] },
        { stars: 5, descript: '很满意', active: true, lables: [{ title: '服务质量好' }, { title: '棒棒哒' }, { title: '家门口超便利' }, { title: '服务态度真心赞' }] }
    ]

    //当前星级，默认最高级
    $scope.currStars = $scope.starList[4];

    //星星点击
    $scope.starClick = function (_data, _event) {
        $scope.currStars = _data;

        var _currobj = $(_event.target);
        var _parentobj = $(_event.target).closest('div.evaluate-star');
        $('i', _parentobj).removeClass('active');
        _currobj.prevAll('i').add(_currobj).addClass('active');
    }

    //评价lable点击
    $scope.lableClick = function (_event) {
        var _currobj = $(_event.target).closest('span');
        _currobj.toggleClass('active');
    }

    //评价内容
    $scope.descript = '';

    //评价输入内容最大长度
    $scope.maxlen = 60;

    //评价输入事件
    $scope.descriptInput = function (_txt) {
        $scope.descript = _txt;
        $scope.maxlen = 60;
        console.log(_txt);
        $scope.maxlen -= _txt.length;
    }

    //评价提交事件
    $scope.evaluate = function () {
        var lablesObj = $('.evaluate-lables>span.active');
        var lables = [];
        $.each(lablesObj, function () {
            lables.push($(this).text());
        });

        $('#satisfy').val($scope.currStars.stars);
        $('#secontent').val(lables.join(","));

        $('#form').submit();
    }
});
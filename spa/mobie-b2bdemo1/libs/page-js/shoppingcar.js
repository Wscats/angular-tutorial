var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.totalAmount = 0.00;
    $scope.payforList = [{ id: 1, name: '余额支付' }, { id: 2, name: '微信支付' }];
    $scope.payfor = { id: 0, name: '支付方式' };
    $scope.totalSeleced = 0;

    $scope.bussiness = function (_data, _event, _type) {
        var _currobj = $(_event.target);
        if (_currobj.is('i')) {
            _currobj = _currobj.closest('div');
        }
        if (_currobj.hasClass('disabled')) {
            return false;
        }
        $http({ url: $('.layout-body').data('bussinessurl'), params: { type: _type, id: _data.id } }).success(function (response) {
            if (response.state) {
                if (_type == 'minus') {
                    _data.itemcount -= 1;
                    if (_data.selected) {
                        $scope.totalAmount -= _data.price;
                    }
                } else if (_type == 'plus') {
                    _data.itemcount += 1;
                    if (_data.selected) {
                        $scope.totalAmount += _data.price;
                    }
                } else if (_type == 'delete') {
                    $.each($scope.datalist, function (_i, _o) {
                        if (this.id == _data.id) {
                            $scope.datalist.splice(_i, 1);
                            if (_data.selected) {
                                $scope.totalAmount -= (this.price * this.itemcount);
                            }
                            return false;
                        }
                    })
                }
            } else {
                $.alert(response.mess);
            }
        })
    }


    $scope.payforselect = function (_data, _event) {
        if ($(_event.target).closest('.shoppingcar-toolbar')[0]) {
            $('.mask, .payfor').show();
        } else {
            $scope.payfor = _data;
            $('.mask, .payfor').hide();
        }
    }

    $scope.itemSelect = function (_data, _event) {
        _data.selected = !_data.selected;
        if (_data.selected) {
            $scope.totalSeleced += 1;
            $scope.totalAmount += (_data.price * _data.itemcount);
        } else {
            $scope.totalSeleced -= 1;
            $scope.totalAmount -= (_data.price * _data.itemcount);
        }
    }

    $scope.allselect = function () {
        var _r = $scope.totalSeleced == $scope.datalist.length;
        $scope.totalAmount = 0;
        $scope.totalSeleced = _r ? 0 : $scope.datalist.length;
        $.each($scope.datalist, function () {
            this.selected = !_r;
            if (!_r) {
                $scope.totalAmount += (this.price * this.itemcount);
            }
        });
    }
});
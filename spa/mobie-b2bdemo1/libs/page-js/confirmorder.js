var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.payforList = [{ id: 1, name: '余额支付' }, { id: 2, name: '微信支付' }];
    $scope.payfor = { id: 2, name: '微信支付' };

	$scope.calc = function(_event){
		var _currobj = $(_event.target);
		var _totalAmount = parseFloat($('#totalAmount').attr('amount'));
		var _integrals = parseFloat(_currobj.attr('integrals'));
		if(_currobj.is(':checked')){
			_totalAmount = _totalAmount - _integrals;
		}else{
			_totalAmount + _totalAmount + _integrals;
		}
		$('#totalAmount').text('￥ ' + _totalAmount.toFixed(2));
	}

    $scope.payforselect = function (_data, _event) {
        if (!$(_event.target).closest('.payfor')[0]) {
            $('.mask, .payfor').show();
        } else {
            $scope.payfor = _data;
            $('.mask, .payfor').hide();
        }
    }	
});
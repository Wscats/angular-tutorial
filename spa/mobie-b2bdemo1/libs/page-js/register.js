var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.submit = function (_event) {
        var _currobj = $(_event.target);
        var _form = _currobj.closest('form');
        if (_form.valid()) {
            _form.submit();
        };
    }

    $scope.fetchcode = function (_event) {
        var _currobj = $(_event.target);
        if (_currobj.hasClass('unactive')) {
            return false;
        }
        _currobj.addClass('unactive').attr('disabled', true).text('发送中...');
        $http({ url: _currobj.data('url'), method: _currobj.data('method'), params: { account: $scope.account } }).success(function (response) {
            if (response.state) {
                $.alert('验证码已发送，请查收！');
                var _sec = 60;
                var _time = window.setInterval(function () {
                    if (_sec < 1) {
                        window.clearInterval(_time);
                        _time = null;
                        _currobj.removeClass('unactive').attr('disabled', false).text('发送验证码');
                        return false;
                    }
                    _sec--;
                    _currobj.text(_sec + '秒可后重发');
                }, 1000);
            } else {
                $.alert('验证码发送失败，请重新发送！');
                _currobj.removeClass('unactive').attr('disabled', false).text('发送验证码');
            }
        })
    }
});
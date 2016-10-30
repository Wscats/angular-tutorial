var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
    $scope.submit = function (_event) {
        var _currobj = $(_event.target);
        var _form = _currobj.closest('form');
        if (_form.valid()) {
            $.ajax({
                url: $('form').prop('action'),
                type: $('form').prop('method'),
                data: $('form').serialize(),
                timeout: 180000,
                beforeSend: function () {
                    return $.mask.show();
                },success: function (resp) {
                    if (resp.state) {
                        window.location.href = 'user.html';
                    } else {
                        $.mask.hide();
                        $.alert(resp.mess);
                    }
                }
            })
        };
    }

    var _url = $('#province').data('url');
    $http.get(_url).success(function (resp) {
        $scope.province = resp;
    })

    $('#province,#city').on('change', function (e) {
        var _currobj = $(e.target);
        var _type = _currobj.data('next');
        $http({ url: _url, params: {type: _type}}).success(function (resp) {
            $scope[_type] = resp;
        })
    })

});
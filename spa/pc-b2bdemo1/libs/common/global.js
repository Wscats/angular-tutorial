$(function () {
    $.getparams = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    $.basurl = function () {
        return ($('body').data('baseurl') || '');
    }

    $.mask = {
        show: function () {
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
            return true;
        },
        hide: function () {
            $('.sk-spinner-three-bounce.sk-spinner, .main-mask').addClass('item-hidden');
            return true;
        }
    }

    $('#layout-footer').html('').load('footer.html?_' + Math.random());
    $('#layout-header').html('').load('header.html?_' + Math.random(), function () {
        $('#admin-header').html('').load('adminheader.html?_' + Math.random());
    });
    $('#layout-category').html('').load('category.html?_' + Math.random());
    $('#admin-header').html('').load('adminheader.html?_' + Math.random());
    $('#admin-menu').html('').load('adminmenu.html?_' + Math.random(), function () {
        var _active = $('#admin-menu').attr('active');
        if (_active) {
            $('.admin-menu>span').eq(_active).addClass('active');
        }
    });
    
    if ($('ul.pagination')[0]) {
        var rowscount = $('ul.pagination').attr('rowscount');
        var pagesize = $('ul.pagination').attr('pagesize');
        var page = $('ul.pagination').attr('page') || $.getparams('page');
        var pagecount = ((rowscount % pagesize > 0) ? (parseInt(rowscount / pagesize) + 1) : (rowscount / pagesize));
        page = parseInt(!page || page < 1 ? 1 : page > pagecount ? pagecount : page);
        var url = $('ul.pagination').attr('url');

        var _li = $('<li><a href="' + (url + (page > 1 ? page - 1 : 1)) + '">&laquo;</a></li>');
        if (page == 1) {
            _li.addClass('disabled');
        }
        _li.appendTo($('ul.pagination'));
        for (var i = 1; i <= pagecount; i++) {
            _li = $('<li><a href="' + (url + i) + '">' + i + '</a></li>');
            if (i == page) {
                _li.addClass('active');
            }
            _li.appendTo($('ul.pagination'));
        }

        var _li = $('<li><a href="' + (url + (page <= pagecount ? page + 1 : pagecount)) + '">&raquo;</a></li>');
        if (page == pagecount) {
            _li.addClass('disabled');
        }
        _li.appendTo($('ul.pagination'));
    }
})
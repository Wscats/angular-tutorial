var mainapp = angular.module('mainapp', ['globalapp']);
mainapp.controller('maincontroller', function ($scope, $http) {
	$scope.showfilter = function(_event){
		var _currobj = $(_event.target);
		if(_currobj.is('i')){
			_currobj = _currobj.closest('div');
		}
		$('.category>div').not(_currobj).removeClass('active');
		_currobj.toggleClass('active');

		var _index = _currobj.index();
		var _content = $('.category-content').eq(_index);
		$('.category-content').not(_content).addClass('item-hidden');
		if(_content[0]){
			$('.category-content').eq(_index).toggleClass('item-hidden');
		}

		$scope.category();
	}

	$scope.category = function(_event){
		var _currobj = _event ? $(_event.target) : $('.category-1>ul:first-child>li.active')[0] ? $('.category-1>ul:first-child>li.active>a:first-child') : $('.category-1>ul:first-child>li:first-child>a:first-child');
		if(!_currobj.is('a')){
			return false;
		}
		if(_event && _currobj.attr('href') != '#'){
			return false;
		}
		var _leval = _currobj.closest('ul').index() + 1;
		if(_leval == 3){
			return false;
		}
		_currobj.closest('ul').find('li').removeClass('active');
		_currobj.closest('li').addClass('active');		
		$('.category-1>ul').eq(_leval).find('li').hide();
		$('.category-1>ul').eq(_leval + 1).find('li').hide();
		$('.category-1>ul').eq(_leval).find('a[flag=' + (_currobj.attr('id')) +']').closest('li').show();
		var _leval2 = $('.category-1>ul').eq(_leval).find('a[flag=' + (_currobj.attr('id')) +']').closest('li.active');
		if(_leval2[0]){
			$('.category-1>ul').eq(_leval + 1).find('a[flag=' + (_leval2.find('a').attr('id')) +']').closest('li').show();
		}
	}
});
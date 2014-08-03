angular.module('Services', ['ngResource']).factory('scoreS', ['$resource', function($resource){
	return $resource('/score', {}, {
			get:    {method:'GET', isArray:true},
			save:   {method:'PUT'},
	});

}]);
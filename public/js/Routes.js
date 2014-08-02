angular.module('Routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/hackathon', {
			templateUrl: 'views/hackathon.html'
			// controller: 'NerdController'
		})

		.when('/team', {
			templateUrl: 'views/team.html'
			// controller: 'NerdController'
		})

		.when('/project', {
			templateUrl: 'views/project.html'
			// controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);
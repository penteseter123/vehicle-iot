(function(){
	'use strict';

	angular.module('Iot', ['ui.router','ngMaterial','uiGmapgoogle-maps','ngCookies','firebase'])
	.config(function ($stateProvider,$urlRouterProvider,$locationProvider,uiGmapGoogleMapApiProvider) {
		
		$urlRouterProvider.otherwise('/main');

		/**
		 * konfigurasi google map
		 * @type {String}
		 */
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyAkji8lFKAk9XsOIrScnC-gxiho8iG6u1Y',
			v:'3.17',
			libraries:'geometry,visualization'
		});

		$stateProvider
		.state('main', {
			url: '/main',
			templateUrl:'views/main.html',
			controller:'MainCtrl',
			onEnter: function($cookies, $state, $timeout) {
				if ( typeof $cookies.get('user') === 'undefined' ) {
					$timeout(function() {
						$state.go('login');
					},5);
				}
				return true;
			}
		})
		.state('login', {
			url: '/login',
			templateUrl:'views/login.html',
			controller:'LoginCtrl'
		});

		// $locationProvider.html5Mode(true);
	})
	.factory('Auth', function($cookies, $state) {
		return {
			login: function() {
				if ( typeof $cookies.get('user') === 'undefined' ) {
					$cookies.put('user','syamsul');
					$state.reload('login');
				}
			},
			logout: function() {
				var cookies = $cookies.getAll();

				for ( var cookieKey in cookies ) {
					$cookies.remove(cookieKey);
				}

				$state.go('login');
			}
		}
	})
	.controller('LoginCtrl', function ($state, $scope, $cookies, Auth) {
		if ( $cookies.get('user') ) {
			$state.go('main');
		}

		$scope.login = function() {
			Auth.login();
		}

	})
	.controller('MainCtrl', function ($scope, $cookies, $mdToast, $mdSidenav, uiGmapGoogleMapApi, $firebaseObject, $state, Auth) {
		console.log($cookies.getAll());
		$scope.logout = function() {
			Auth.logout();
		}
	});
})();
'use strict';

/* App Module */

var spruce = angular.module('spruce', ['ngRoute', 'ngAnimate'])

spruce.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/entries/new/:stage', {templateUrl: 'partials/new-cbt-entry.html',   controller: 'NewEntryCtrl'}).
      when('/entries/new', {templateUrl: 'partials/new-cbt-entry.html',   controller: 'NewEntryCtrl'}).
      when('/', {templateUrl: 'partials/index2.html',   controller: ''}).
      when('/get-started', {templateUrl: 'partials/sign-in.html',   controller: 'RegistrationCtrl'}).
      when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: ''}).
      otherwise({redirectTo: '/'});
}]);
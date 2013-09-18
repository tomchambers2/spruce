'use strict';

/* App Module */

var spruce = angular.module('spruce', [])

spruce.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/entries/new', {templateUrl: 'partials/new-cbt-entry.html',   controller: 'NewEntryCtrl'}).
      when('/', {templateUrl: 'partials/index2.html',   controller: ''}).
      when('/get-started', {templateUrl: 'partials/sign-in.html',   controller: 'RegistrationCtrl'}).
      otherwise({redirectTo: '/'});
}]);
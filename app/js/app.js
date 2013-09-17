'use strict';

/* App Module */

var spruce = angular.module('spruce', [])

spruce.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/entries/new', {templateUrl: 'partials/new-cbt-entry.html',   controller: 'NewEntryCtrl'}).
      otherwise({redirectTo: '/'});
}]);
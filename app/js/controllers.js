'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', function($scope) {
  	$scope.update = function(thing){
  		console.log("thanks boss, I've recieved the thing: " + angular.toJson(thing, true));
  	}

  }]);
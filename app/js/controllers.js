'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', function($scope) {
  	$scope.stage = 1;
  	$scope.update = function(thing){
  		$scope.next = "andale";
  		console.log("thanks boss, I've recieved the thing: " + angular.toJson(thing, true));
  	}

  }]);
'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', function($scope) {
  	$scope.stage = 1;
  	$scope.emotions = [];
  	$scope.update = function(thing){
  		$scope.next = "andale";
  		console.log("thanks boss, I've recieved the thing: " + angular.toJson(thing, true));
  	}
  	$scope.addEmotion = function(newEmotion){
  		$scope.emotions.push(newEmotion);
  	}


  }]).
  controller('MainCtrl',['$scope', function($scope){

  }]).
  controller('RegistrationCtrl', ['_Parse','$scope', function(_parse, $scope){
  	$scope.badLogin = false;
  	$scope.register = function(user){
  		var user = new _parse.User();
  		user.set("username", user.email);
  		user.set("password", user.password);

  		user.signUp(null, {
  		  success: function(user) {
  		    console.log(angular.toJson(user, true));
  		  },
  		  error: function(user, error) {
  		    // Show the error message somewhere and let the user try again.
  		    alert("Error: " + error.code + " " + error.message);
  		  }
  		});
  	}

  	$scope.logIn = function(user){
  		$scope.badLogin = false;
  		_parse.User.logIn(user.username, user.password, {
  		  success: function(user) {
  		  	$scope.badLogin = false;
  		    console.log("successful login" + angular.toJson(user, true))
  		  },
  		  error: function(user, error) {
  		  	$scope.badLogin = true;
  		    //alert("Error: " + error.code + " " + error.message + angular.toJson(error));
  		  }
  		});
  	}

  }]);
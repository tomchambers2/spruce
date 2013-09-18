'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', function($scope) {
  	$scope.stage = 1;
  	$scope.cbtEntry = {emotions: []};
  	$scope.addEmotion = function(newEmotion){
  		$scope.cbtEntry.emotions.push(newEmotion);
  	}
  	$scope.$watch('stage', function(newValue, oldValue){

  	});


  }]).
  controller('MainCtrl',['$scope', function($scope){

  }]).
  controller('RegistrationCtrl', ['_Parse','$scope', function(_parse, $scope){
  	$scope.badLogin = false;
  	$scope.register = function(username, password){
  		var user = new _parse.User();
  		user.setUsername(username, {});
  		user.set("password", password);
  		user.signUp(null, {
  		  success: function(user) {

  		    //console.log(angular.toJson(user, true));
  		  },
  		  error: function(user, error) {
  		    // Show the error message somewhere and let the user try again.
  		    alert("Error: " + error.code + " " + error.message);
  		    console.log("Error: " + angular.toJson(error,true) +  angular.toJson(user,true));
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
  		    alert("Error: " + error.code + " " + error.message + angular.toJson(error));
  		  }
  		});
  	}

  }]);
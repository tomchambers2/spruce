'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', '_Parse', function($scope, _parse) {
  	$scope.stage = 1;
  	$scope.curEmotion = '';
  	$scope.cbtEntry = { emotions: [], negativeBeliefs: []};
  	var CbtEntry = _parse.Object.extend("CbtEntry");
  	var newEntry = new CbtEntry();

  	var init = function(obj){
  		obj.save(null, {
  		  success: function(newEntry) {
  		    // Execute any logic that should take place after the object is saved.
  		    console.log('New object created with objectId: ' + newEntry.id);
  		  },
  		  error: function(newEntry, error) {

  		    // Execute any logic that should take place if the save fails.
  		    // error is a Parse.Error with an error code and description.
  		    console.log('Failed to create new object, with error code: ' + error.description);
  		  }
  		});
  	}


  	$scope.addEmotion = function(newEmotion){
  		$scope.cbtEntry.emotions.push(newEmotion);
  	}
  	$scope.addBelief = function(negativeBelief){
  		$scope.cbtEntry.negativeBeliefs.push(negativeBelief);
  	}
  	$scope.$watch('stage', function(newValue, oldValue){
  		if(newValue === oldValue){ return; }

  		if(newValue == 2){init(newEntry);}

  		newEntry.set('stageCompleted', $scope.stage);
  		for (var prop in $scope.cbtEntry) {
  		   if($scope.cbtEntry.hasOwnProperty(prop)){
  		     newEntry.set(prop, $scope.cbtEntry[prop]);
  		   }
  		}

  		newEntry.save();
  	});


  }]).
  controller('MainCtrl',['$scope', function($scope){

  }]).
  controller('RegistrationCtrl', ['_Parse','$scope', '$location', function(_parse, $scope, $location){
  	$scope.badLogin = false;
  	$scope.register = function(username, password){
  		var user = new _parse.User();
  		user.setUsername(username, {});
  		user.set("password", password);
  		user.signUp(null, {
  		  success: function(user) {
          	$scope.$apply(function () {
            	$location.path('/entries/new');
          	});
  		  },
  		  error: function(user, error) {
  		    // Show the error message somewhere and let the user try again.
  		    alert("Error: " + error.code + " " + error.message);
  		    console.log("Error: " + angular.toJson(error,true) +  angular.toJson(user,true));
  		  }
  		}, this);
  	}

  	$scope.logIn = function(user){
  		$scope.badLogin = false;
  		_parse.User.logIn(user.username, user.password, {
  		  success: function(user) {
  		  	$scope.badLogin = false;
  		    console.log("successful login" + angular.toJson(user, true));
          $scope.$apply(function () {
            $location.path('/dashboard');
          });
  		  },
  		  error: function(user, error) {
  		  	$scope.badLogin = true;
  		    alert("Error: " + error.code + " " + error.message + angular.toJson(error));
  		  }
  		});
  	}

  }]);
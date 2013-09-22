'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', '_Parse', '$routeParams', '$location', function($scope, _parse, $routeParams, $location) {
  	$scope.stage = 1;
  	$scope.curEmotion = '';
  	$scope.newthought = '';
  	$scope.concern = '';
  	$scope.cbtEntry = { concern: '', emotions: [], negativeBeliefs: {}};
  	$scope.distortions = ["Are there only two possible outcomes to this situation? Is there a bigger range of options that you haven’t considered? If something is going to go badly, is it possible that it will go badly in a minor way, rather than an extreme way? This also applies to the reactions of others.", "What have you assumed about the consequences of this situation? If you think about the range of possible outcomes, will it really be as bad as you imagine? What are some other possible ways in which this could go?", "Are you focussing in on a particular aspect of your life to the exclusion of everything else?", "Think about the consequences that this thought states or implies. Think about a scale of awful things and see where this incident fits in context. How awful is it when you compare it to truly terrible things? Will it really be the end of the world?", "Are you assuming something about what another person is thinking? how certain you can be about the contents of someone else’s mind? Has it been explicitly stated or is this just an inference?", "Is this thought trying to predict the future? Although you can make guesses about what will happen, you can’t say anything for certain, so it’s a good idea to remember that nothing in this thought is guaranteed to occur.","Is this a thought about your self worth? This is a statement like ‘I’m useless’ or ‘I’m a bad person because...’. This is something that we often do when we allow a single action or event to entirely define our lives. Think about how many things you’ve done in your life and see how much of your life this incident actually is.","Is this thought about assigning responsibility? Are you trying to make yourself or someone else solely responsible for what happened in this situation? Think about to what extent you or that person was really responsible, and what might have been down to chance or circumstances.","Is this thought about doggedly applying a rule? You might be using a word like ‘must’ or ‘should’ followed by something you feel obliged to do. Rules can be useful reminders of things that are generally useful, but that’s all they are. If a rule doesn’t help you live your life, why keep it?"];
  	$scope.distortionsCopy = ["Are there only two possible outcomes to this situation? Is there a bigger range of options that you haven’t considered? If something is going to go badly, is it possible that it will go badly in a minor way, rather than an extreme way? This also applies to the reactions of others.", "What have you assumed about the consequences of this situation? If you think about the range of possible outcomes, will it really be as bad as you imagine? What are some other possible ways in which this could go?", "Are you focussing in on a particular aspect of your life to the exclusion of everything else?", "Think about the consequences that this thought states or implies. Think about a scale of awful things and see where this incident fits in context. How awful is it when you compare it to truly terrible things? Will it really be the end of the world?", "Are you assuming something about what another person is thinking? how certain you can be about the contents of someone else’s mind? Has it been explicitly stated or is this just an inference?", "Is this thought trying to predict the future? Although you can make guesses about what will happen, you can’t say anything for certain, so it’s a good idea to remember that nothing in this thought is guaranteed to occur.","Is this a thought about your self worth? This is a statement like ‘I’m useless’ or ‘I’m a bad person because...’. This is something that we often do when we allow a single action or event to entirely define our lives. Think about how many things you’ve done in your life and see how much of your life this incident actually is.","Is this thought about assigning responsibility? Are you trying to make yourself or someone else solely responsible for what happened in this situation? Think about to what extent you or that person was really responsible, and what might have been down to chance or circumstances.","Is this thought about doggedly applying a rule? You might be using a word like ‘must’ or ‘should’ followed by something you feel obliged to do. Rules can be useful reminders of things that are generally useful, but that’s all they are. If a rule doesn’t help you live your life, why keep it?"];
    var CbtEntry = _parse.Object.extend("CbtEntry");
  	var newEntry = new CbtEntry();
  	var negBeliefCopy;

  	var init = function(){
  		if($routeParams.stage){
  			$scope.stage = $routeParams.stage;
  		}
  		if($routeParams.fromReg){
  			$location.search('fromReg', null); //delete query string parameter
	  		$('#introModal').foundation('reveal', 'open');
  		}
  		setTimeout(function(){
  			$(document).foundation('joyride', 'start');
  		},500);

  	}
  	init();

  	var initEntryObj = function(obj){
  		newEntry.save(null, {
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

  	$scope.setFinalThought = function(yesNo){
  		var useful = (yesNO == 'yes') ? true : false;
  		newEntry.set('useful', useful);
  		newEntry.save();

  	}
  	$scope.closeModal = function(){
  		$('#introModal').foundation('reveal', 'close');
  	}
  	$scope.nextNegBelief = function(curDistortion, curNegBelief, newThought){
  		//move on to next belief
  		if($scope.distortions.indexOf(curDistortion) == $scope.distortions.length - 1){
  			var nextNeg = negBeliefCopy.pop();
  			$scope.curDistortion = $scope.distortions[0];
  			if(nextNeg === undefined){
  				$scope.stage = '5';
  			}else{
  				$scope.negBelief = nextNeg;
  			}
  		}
  		//move on to next distortion
  		else{
  			if(newThought != false && newThought.length>2){
	  			$scope.cbtEntry.negativeBeliefs[$scope.negBelief].push({'distortion': $scope.curDistortion, 'why': newThought});
  			}
			$scope.curDistortion = $scope.distortions[$scope.distortions.indexOf(curDistortion)+1];
  		}

  	}

  	$scope.getDistortionID = function(distortion){
  		return $scope.distortionsCopy.indexOf(distortion)+1;
  	}
  	$scope.addEmotion = function(newEmotion){
  		$scope.cbtEntry.emotions.push(newEmotion);
      	$scope.newEmotion = "";
  	}
  	$scope.addBelief = function(negativeBelief){
  		$scope.cbtEntry.negativeBeliefs[negativeBelief] = [];
  		$scope.negativeBeliefsCopy = Object.keys($scope.cbtEntry.negativeBeliefs);
  	}
  	$scope.$watch('stage', function(newValue, oldValue){
  		if(newValue === oldValue){
         return;
      }
      mixpanel.track("Step "+newValue);
      setTimeout(function(){
      	$(document).foundation('joyride', 'start');
      },500);
  		if(newValue == 1){$(document).foundation('joyride', 'start');}
  		if(newValue == 2){initEntryObj(newEntry);}

  		if(newValue == 4){
  			//initEntryObjialise first neg belief
  			negBeliefCopy = $scope.negativeBeliefsCopy;
  			$scope.curDistortion = $scope.distortions[0];
  			$scope.negBelief = negBeliefCopy.pop();
  		}
  		newEntry.set('stageCompleted', String(oldValue));
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
  controller('HomeCtrl',['$scope', function($scope){
    mixpanel.track("Home");
  }]).
  controller('RegistrationCtrl', ['_Parse','$scope', '$location', function(_parse, $scope, $location){
  	$scope.badLogin = false;
    mixpanel.track("sign in");
  	$scope.register = function(username, password){
  		var user = new _parse.User();
  		user.setUsername(username, {});
  		user.set("password", password);
  		user.signUp(null, {
  		  success: function(user) {
            mixpanel.track("$signup");
          	$scope.$apply(function () {
            	$location.url('/entries/new?fromReg=true');
          	});
  		  },
  		  error: function(user, error) {
          mixpanel.track("Signup error");
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
          mixpanel.track("Logged in");
  		  	$scope.badLogin = false;
  		    console.log("successful login" + angular.toJson(user, true));
          $scope.$apply(function () {
            $location.path('/dashboard');
          });
  		  },
  		  error: function(user, error) {
          mixpanel.track("Log in error");
  		  	$scope.badLogin = true;
  		    alert("Error: " + error.code + " " + error.message + angular.toJson(error));
  		  }
  		});
  	}

  }]);
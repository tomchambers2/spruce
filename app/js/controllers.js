'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', '_Parse', '$routeParams', '$location', 'sharedState', function($scope, _parse, $routeParams, $location, sharedState) {
  	$scope.stage = 1;
    $(document).foundation();
  	$scope.curEmotion = '';
    $scope.newThoughts = [];
    $scope.nextBelief = 'Done';
    $scope.changeStep = {reformedThought: ''}
    $scope.firstDistortionSelected = {'state': false, 'focusText': false};
  	$scope.concern = '';
  	$scope.cbtEntry = { concern: '', emotions: [], negativeBeliefs: {}};
    $scope.distortions =
    {
    "Assuming the Worst Case Scenario": {'fullDescription': "What have you assumed about the consequences of this situation? If you think about the range of possible outcomes, will it really be as bad as you imagine? What are some other possible ways in which this could go?", 'shortDescription': "Have you assumed the worst?"}
    ,"Mental Filtering": {'fullDescription': "Are you focussing in on a particular aspect of your life to the exclusion of everything else?", 'shortDescription': "Have you focused in on a single aspect of life?"}
    ,"Mind-Reading": {'fullDescription': "Are you assuming something about what another person is thinking, or do you have evidence to support this? How certain you can be about the contents of someone else’s mind? ", 'shortDescription': "Are you trying to read someone's mind?"}
    ,"Predicting the Future": {'fullDescription': "Is this thought trying to predict the future? Although you can make guesses about what will happen, it’s a good idea to remember that nothing in this thought is guaranteed to occur.", 'shortDescription': "Are you trying to predict the future?"}
    ,"Labelling a Person": {'fullDescription': "By saying ‘That person is an X’ or 'I’m a Y', are you allowing a single action to define an entire life? Think about how many things you’ve done in your life and see how much of your life this incident actually is.", 'shortDescription': "Have you given yourself or someone else a label?"}
    ,"Assigning Responsibility/Blaming": {'fullDescription': "Is this thought about assigning responsibility? Think about to what extent you or that person was really responsible, and what might have been down to circumstance or chance.", 'shortDescription': "Are you blaming or assigning responsibility?"}
    ,"Unrealistic Expectations": {'fullDescription': "Are you using words like ‘must’ or ‘should’? Consider whether your expectations need to be realigned. You’ll either have to adjust your expectations to match reality, or always feel let down by others (or yourself)", 'shortDescription': 'Do you have unrealistic expectations?'}
    ,"All-Or-Nothing Thinking": {'fullDescription': "Are you seeing things in black and white? Are there a range of possible interpretations of the situation that you haven't considered?", 'shortDescription': "Are you seeing things as only black & white?"}
    };
    if (_parse.User.current()) {
      //_parse.User.logOut()
      mixpanel.identify(_parse.User.current().getUsername());
      mixpanel.people.set({
        "$email": _parse.User.current().getUsername(),    // only special properties need the $
        "$last_login": new Date(),         // properties can be dates...
      });

    } else {
      alert('Please log in before using the process');
      $location.url('/get-started');
    }

    var CbtEntry = _parse.Object.extend("CbtEntry");
  	var newEntry = new CbtEntry();
  	var negBeliefCopy;

  	var init = function(){
  		if($routeParams.stage){
  			$scope.stage = $routeParams.stage;
  		}
  		if(sharedState.fromReg){
  			sharedState.fromReg = false;
        setTimeout(function(){
          $('#introModal').foundation('reveal', 'open');
        },500)

  		}


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
  		var useful = (yesNo == 'yes') ? true : false;
  		newEntry.set('useful', useful);
  		newEntry.save();

  	}
  	$scope.closeModal = function(){
  		$('#introModal').foundation('reveal', 'close');
  	}
  	$scope.nextNegBelief = function(modifiedBelief){
        console.log($scope.newThoughts);
        console.log($scope.changeStep.reformedThought);
        $scope.cbtEntry.negativeBeliefs[$scope.negBelief] = {distortions: $scope.newThoughts, newThought: $scope.changeStep.reformedThought};
        var nextNeg  = negBeliefCopy.pop();;
        /* refactor this setting next neg business, shuoldn't be dependant on order of code*/
        $scope.setNextBelief();
        $scope.newThoughts = [];
        $scope.changeStep.reformedThought = ''
        $scope.firstDistortionSelected.state =  $scope.firstDistortionSelected.focusText = false;
        if(nextNeg === undefined){
          $scope.stage = '5';
        }
        else{
          $scope.negBelief = nextNeg;
        }
  	}
    //Deprecated
  	$scope.getDistortionID = function(distortion){
  		return 1;
  	}

  	$scope.addEmotion = function(newEmotion){
      if (newEmotion != "") {
  		  $scope.cbtEntry.emotions.push(newEmotion);
      }
      $scope.newEmotion = "";
  	}
    $scope.setNextBelief = function(){
      if(negBeliefCopy[0] === undefined){
        $scope.nextBelief = 'Done'
      }
      else{
        $scope.nextBelief = 'Next Belief: ' + negBeliefCopy[0];
      }
    }
  	$scope.addBelief = function(negativeBelief){
      if (negativeBelief) {
    		$scope.cbtEntry.negativeBeliefs[negativeBelief] = [];
    		$scope.negativeBeliefsCopy = Object.keys($scope.cbtEntry.negativeBeliefs);
        $scope.negativeBelief = "";
        window.scrollTo(0,document.body.scrollHeight);
      }
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
  			$scope.negBelief = negBeliefCopy.pop();
        $scope.setNextBelief();
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
  controller('RegistrationCtrl', ['_Parse','$scope', '$location', 'sharedState', function(_parse, $scope, $location, sharedState){
  	$scope.badLogin = false;
    if (_parse.User.current()) {
      $location.url('/entries/new');
    }
    mixpanel.track("sign in");
  	$scope.register = function(username, password){
  		var user = new _parse.User();
  		user.setUsername(username, {});
  		user.set("password", password);
  		user.signUp(null, {
  		  success: function(user) {
            mixpanel.track("$signup");
            mixpanel.alias(username);
            mixpanel.people.set_once({
              'First Login Date': new Date(),
              'Logins': 0
            });
            sharedState.fromReg = true;
          	$scope.$apply(function () {
            	$location.url('/entries/new');
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
          mixpanel.people.increment("Logins", 1);
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
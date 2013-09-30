'use strict';

/* Controllers */

spruce.
  controller('NewEntryCtrl', ['$scope', '_Parse', '$routeParams', '$location', 'sharedState', '$timeout', function($scope, _parse, $routeParams, $location, sharedState, $timeout) {
  	$scope.stage = 1;
    $(document).foundation();
  	$scope.curEmotion = '';
    $scope.nextBelief = 'Done';
    $scope.changeStep = {}
    $scope.firstDistortionSelected = {'state': false, 'focusText': false};
    $scope.concern = '';
  	$scope.showFeedback = true;
    $scope.negativeBeliefsCopy = [];
  	$scope.cbtEntry = { concern: '', emotions: [], negativeBeliefs: {}};
    $scope.distortions =
    {
    "Assuming the Worst Case Scenario": {'fullDescription': "Sometimes we automatically go to an extremely negative end of the spectrum. If you think about the range of possibilities, is it really as bad as you imagine? What are some other possible ways in which you could state this that are more moderate?", 'shortDescription': "Does this statement seem at all extreme?"}
    ,"Mind-Reading": {'fullDescription': "Are you assuming something about what another person is thinking, or do you have evidence to support this? How certain you can be about the contents of someone else’s mind? Do you think that your assumption is based on a preconception?", 'shortDescription': "Does this thought state what someone else might be thinking?"}
    ,"Predicting the Future": {'fullDescription': "Although you can make guesses about what will happen, it’s a good idea to remember that nothing in this thought is guaranteed to occur. However convinced you are, you'll never absolutely know.", 'shortDescription': "Have you made a prediction about the future?"}
    ,"Labelling a Person": {'fullDescription': "By saying ‘That person is awful or 'I’m stupid', are you allowing a single action to define an entire life? Think about how many things you’ve done in your life and see what proportion of your life this incident actually is. Is it sensible to allow a single thing to define your self worth?", 'shortDescription': "In this thought have you passed judgement on yourself or someone else?"}
    ,"Assigning Responsibility or Blaming": {'fullDescription': "Is this thought about assigning responsibility? Think about to what extent you or that person was really responsible, and what might have been down to circumstance or chance.", 'shortDescription': "Is this thought about giving yourself or someone else responsibility for what happened?"}
    ,"Unrealistic Expectations": {'fullDescription': "Are you using words like ‘must’ or ‘should’? Consider whether your expectations need to be realigned. You’ll either have to adjust your expectations to match reality, or always feel let down by others (or yourself)", 'shortDescription': 'Have you used the words "must" or "should" in this thought?'}
    ,"All-Or-Nothing Thinking": {'fullDescription': "Are you seeing things in black and white with only a binary set of outcomes? Are there a range of possible interpretations of the situation that you haven't considered?", 'shortDescription': "Are you assuming that a single outcome is inevitable?"}
    ,"Lack of Factual accuracy": {'fullDescription': 'Try and think about all the evidence for this statement. Can you think of any evidence for an alternate point of view?', 'shortDescription': 'How much factual evidence is there for this belief?'}
    ,"Overgeneralisation": {'fullDescription': 'It\'s easy to focus in one thing and assume that it\'s representative of everything similar. But often that\'s a mistake, it might be your day that\'s going badly, rather than your whole life. Is it possible that it\'s just one thing that\'s bad, rather than everything?', 'shortDescription': 'Are you predicting how things will work out in the future based on the outcome of a single event?'}
    };
    if (_parse.User.current()) {
      //_parse.User.logOut()
      var uname = _parse.User.current().getUsername();
      mixpanel.identify(uname);
      mixpanel.people.set({
        '$name': uname,
        "$last_login": new Date(),         // properties can be dates...
      });

    } else {
      alert('Please log in before using the process');
      $location.url('/get-started');
    }

    var CbtEntry = _parse.Object.extend("CbtEntry");
  	$scope.newEntry = {}
  	var negBeliefCopy;

  	var init = function(){
  		if($routeParams.stage){
  			$scope.stage = $routeParams.stage;
  		}
  		if(sharedState.fromReg){
  			sharedState.fromReg = false;
  		}


  	}
  	init();

  	var initEntryObj = function(){
      $scope.newEntry = new CbtEntry();

      $scope.newEntry.set('stageCompleted', '1');
      $scope.newEntry.set('parent', _parse.User.current());
      $scope.newEntry.setACL(new Parse.ACL(Parse.User.current()));

  		$scope.newEntry.save(null, {
  		  success: function(entrySaved) {
          console.log('Saved new entry with objectId: ' + $scope.newEntry.id);
          $scope.entryId = entrySaved.id;
  		  },
  		  error: function(entry, error) {
  		    // Execute any logic that should take place if the save fails.
  		    // error is a Parse.Error with an error code and description.
  		    console.log('Failed to create new object, with error code: ' + error.description);
  		  }
  		});

  	};

    $scope.closeAccordion = function(el){
      angular.element('section').removeClass('active');
    }

    $scope.nextStage = function() {
      var nextStage = Number($scope.stage) + 1;
      $location.search({'section': nextStage});
    }

    $scope.$on('$routeUpdate', function() {
      if ($routeParams.section == undefined) {
        $routeParams.section = 1;
      }
      $scope.stage = $routeParams.section;
    });

  	$scope.setFinalThought = function(yesNo){
  		var useful = (yesNo == 'yes') ? true : false;
      mixpanel.track("feedback", {'useful': useful});
  		$scope.newEntry.set('useful', useful);
  		$scope.newEntry.save();
      $scope.showFeedback = false;

  	}
  	$scope.closeModal = function(){
  		$('#introModal').foundation('reveal', 'close');
  	}
    $scope.distKeyUp = function(){
        console.log($scope.changeStep);
    }
    var _pushChangeStepToCbtEntry = function(obj){
      for (var prop in obj) {
         if(obj.hasOwnProperty(prop)){
          $scope.cbtEntry.negativeBeliefs[$scope.negBelief][prop] = obj[prop];
         }
      }
    }
    //Resets step 4 as user cycles through beliefs.
    $scope.nextNegBelief = function(modifiedBelief){
        console.log(angular.toJson($scope.changeStep));
        _pushChangeStepToCbtEntry($scope.changeStep);
        //reset changestep
        $scope.changeStep = {};
        var nextNeg  = negBeliefCopy.pop();
        /* refactor this setting next neg business, shuoldn't be dependant on order of code*/
        //updates button. Could be a directive?
        $scope.setNextBelief();

        window.scrollTo(0,140);
          angular.element('#yourBeliefContainer').hide();
        $timeout(function(){
          angular.element('#yourBeliefContainer').fadeIn('slow')
        }, 300);
        if(nextNeg === undefined){
          $scope.nextStage();
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
      } else {
        $scope.nextBelief = 'Next Belief: ' + negBeliefCopy[0];
      }
    }
  	$scope.addBelief = function(negativeBelief){
      if (negativeBelief) {
    		$scope.cbtEntry.negativeBeliefs[negativeBelief] = {};
    		$scope.negativeBeliefsCopy = Object.keys($scope.cbtEntry.negativeBeliefs);
        $scope.negativeBelief = "";
        window.scrollTo(0,document.body.scrollHeight);
      }
  	}
    var updateParseObject = function(){
      for (var prop in $scope.cbtEntry) {
         if($scope.cbtEntry.hasOwnProperty(prop)){

           $scope.newEntry.set(prop, sjcl.encrypt("whampassword", JSON.stringify($scope.cbtEntry[prop])));
         }
      }
      $scope.newEntry.save();
    }
    $scope.advanceNextStep = function(){
      var nextStage = Number($scope.stage) + 1;
      $scope.stage = String(nextStage);
    }
  	$scope.$watch('stage', function(newValue, oldValue){
      if (newValue==1){
        mixpanel.track("Step "+newValue);
      }
  		if(newValue === oldValue){
         return;
      }
      mixpanel.track("Step "+newValue);

  		if(newValue == 2){initEntryObj();}

  		if(newValue == 4 && oldValue == 3){
  			//initEntryObjialise first neg belief
  			negBeliefCopy = $scope.negativeBeliefsCopy;
  			$scope.negBelief = negBeliefCopy.pop();
        $scope.setNextBelief();
  		}
      //this if needs to be here to avoid overlapping with parse save callback in initEntryObj method
      if(newValue>2){
    		$scope.newEntry.set('stageCompleted', String(oldValue));
        updateParseObject();
      }
  	});


  }]).
  controller('DashboardCtrl',['$scope', '_Parse', 'objDecrypter', 'orm', function($scope, _parse, objDecrypter, orm){
    mixpanel.track("Dashboard View");
    $scope.entries = {};
    var populateScope = function(entries){
      entries.forEach(function(val, index){
        $scope.$apply(function(){
          $scope.entries[String(index)] = objDecrypter.decryptEntry(val);
        });
      });
    }
    orm.getAllEntries(populateScope);
  }]).
  controller('EntryCtrl',['$scope', '$routeParams', '_Parse', 'objDecrypter', 'orm', function($scope, $routeParams, _parse, objDecrypter, orm){
    mixpanel.track("Entry View");
    $scope.cbtEntry = {};
    orm.getEntry($routeParams.id, function(entry){
      entry = objDecrypter.decryptEntry(entry);
      $scope.$apply(function(){
        $scope.cbtEntry = entry;
        });

      });
  }]).
  controller('MainCtrl',['$scope', '_Parse', function($scope, _parse){
    $scope.loggedIn = {'state': false};
    var init = function(){
      $scope.loggedIn['state'] = (_parse.User.current())? true : false;
    }
    init()

    $scope.logOut = function(){
      _parse.User.logOut();
      $scope.loggedIn['state'] = false;
    }
  }]).

  controller('HomeCtrl',['$scope','$location','$anchorScroll', 'orm', function($scope, $location, $anchorScroll, orm){
    mixpanel.track("Home");
    $scope.badLogin = false;

    $scope.scrollTo = function(id) {
        console.log(id);
        $location.hash(id);
        $anchorScroll();
    };

    $scope.register = function(username, password){
      orm.registerUser(username, password).then(
          function(result){
              $location.url('/entries/new');
          },
          function(error){
            alert("Error: " + error.code + " " + error.message+ ' Please try again.');
            console.log("Error: " + angular.toJson(error,true));
          }
        );
    }
  }]).
  controller('RegistrationCtrl', ['_Parse','$scope', '$location', 'sharedState', 'orm', function(_parse, $scope, $location, sharedState, orm){
  	$scope.badLogin = false;
    if (_parse.User.current()) {
      $location.url('/entries/new');
    }
    mixpanel.track("sign in page");

  	$scope.register = function(username, password){
      orm.registerUser(username, password).then(
          function(result){
            sharedState.fromReg = true;
            $location.url('/entries/new');
          },
          function(error){
            alert("Error: " + error.code + " " + error.message+ ' Please try again.');
            console.log("Error: " + angular.toJson(error,true));
          }
        );
  	}

  	$scope.logIn = function(user){
  		orm.logIn(user).then(
          function(user){
            console.log("successful login" + angular.toJson(user, true));

            $scope.loggedIn['state'] = true;
            $location.path('/dashboard');
          },
          function(error){
            $scope.badLogin = true;
            alert("Error: " + error.code + " " + error.message + angular.toJson(error));
          }
        );

  	}

  }]);
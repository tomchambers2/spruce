'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
spruce.
    provider('_Parse', function(){
    	Parse.initialize("ETUovglfQBF2ZwaZFUpTLwczpnWwTwdHfIDSQ54P", "Ia2l8YLXafi6NB3D2aNbtbOpV1wAkjEXCFNaimse");
  		this.$get = function(){
  			return Parse
  		}

	}).
	factory("sharedState", function(){
	  return {fromReg: false };
	}).
  service('orm', ['$q', '_Parse', function($q, _parse){
    var _getEntry = function(entryId, cb){
      var CbtEntry = Parse.Object.extend("CbtEntry");
      var query = new Parse.Query(CbtEntry);
      query.get(entryId, {
        success: function(entry) {
          cb(entry);
        },
        error: function(object, error) {
          mixpanel.track("Parse Error", {'code': error.code});
          alert(error.message);
        }
      });
    }
    this.getEntry = _getEntry;

    var _getAllEntries = function(cb){
      var CbtEntry = Parse.Object.extend("CbtEntry");
      var query = new Parse.Query(CbtEntry);
      query.equalTo("parent", Parse.User.current());
      query.find({
        success: function(comments) {
          cb(comments);
        },
        error: function(obj, error){
          mixpanel.track("Parse Error", {'code': error.code});
        }
      });
    }
    this.getAllEntries = _getAllEntries;

    /* returns promise */
    var _registerUser = function(uName, pass){
          var deferred = $q.defer();
          var user = new _parse.User();
          user.set('username', uName);
          user.set("password", pass);
          user.set("email", uName);

          user.signUp(null).then(function(result){
            mixpanel.track("$signup");
            mixpanel.alias(result.get('username'));
            mixpanel.people.set_once({
              '$created': new Date(),
              '$name': result.get('username'),
              'Logins': 0,
              "$email": result.get('username')

            });
            deferred.resolve(result);

          }, function(error){
               mixpanel.track("Signup error", {errorCode: error.code, errorMessage: error.message});
               deferred.reject(error)
          });
          return deferred.promise;
    }
    this.registerUser = _registerUser;

    /* returns promise */
    var _loginUser = function(details){
      var deferred = $q.defer();
      _parse.User.logIn(details.username, details.password).then(
          function(user){
            mixpanel.track("Logged in");
            mixpanel.people.increment("Logins", 1);
            deferred.resolve(user);
          },
          function(error){
            mixpanel.track("Log in Error", {message: error.message});
            deferred.reject(error);
          }
        );

        return deferred.promise;
    }
    this.logIn = _loginUser;
  }]).
  service('objDecrypter', function(){

    var _decrypt = function (obj) {

      var plainObj = {};
      try{
         plainObj['createdAt'] = obj.createdAt;
         plainObj['useful'] = obj.get('useful');
         plainObj['id'] = obj.id;

         if(obj.hasOwnProperty('iv')){
           plainObj['concern'] = JSON.parse(sjcl.decrypt("whampassword", obj.get('concern')));
           plainObj['emotions'] = JSON.parse(sjcl.decrypt("whampassword", obj.get('emotions')));
           plainObj['negativeBeliefs'] = JSON.parse(sjcl.decrypt("whampassword", obj.get('negativeBeliefs')));
         }else{
           plainObj['emotions'] = JSON.parse(obj.get('emotions'));
           plainObj['concern'] = JSON.parse(obj.get('concern'));
           plainObj['negativeBeliefs'] = JSON.parse(obj.get('negativeBeliefs'));
         }
      }
      catch(e){
        mixpanel.track("App Error", {'type': e.message});
        plainObj['createdAt'] = obj.createdAt;
        plainObj['useful'] = ''
        plainObj['id'] = ''
        plainObj['concern'] = ''
        plainObj['emotions'] = ''
        plainObj['negativeBeliefs'] = ''
        //mixpanel
        console.log(e.message)
      }

      return plainObj;
    }

    this.decryptEntry = _decrypt;
  });
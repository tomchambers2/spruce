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
  service('orm', function(){
    var _getEntry = function(entryId, cb){
      var CbtEntry = Parse.Object.extend("CbtEntry");
      var query = new Parse.Query(CbtEntry);
      query.get(entryId, {
        success: function(entry) {
          cb(entry);
        },
        error: function(object, error) {
          mixpanel.track("Parse Error", {'code': error.code});
          alert(error.description);
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
  }).
  service('objDecrypter', function(){

    var _decrypt = function (obj) {
      var plainObj = {};
      try{
         plainObj['id'] = obj.id;
         plainObj['concern'] = JSON.parse(sjcl.decrypt("whampassword", obj.attributes['concern']));
         plainObj['emotions'] = JSON.parse(sjcl.decrypt("whampassword", obj.attributes['emotions']));
         plainObj['negativeBeliefs'] = JSON.parse(sjcl.decrypt("whampassword", obj.attributes['negativeBeliefs']));
      }
      catch(e){
        mixpanel.track("App Error", {'type': e.message});
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
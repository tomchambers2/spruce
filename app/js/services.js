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

});
'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
spruce.
    provider('_Parse', function(){
    	Parse.initialize("k7y07DrD6MQKnKmzIr0QKuVs0ky1rX9GjOVN1HEl", "XQRePYICookwk173cSyoRQLSTeLhyFWcMJK2udKO");

  		this.$get = function(){
  			return Parse
  		}

});
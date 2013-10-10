var fs = require('fs');
var sjcl = require('../app/js/vendor/sjcl.js');
var file = '/Users/md/CS/EF/data/CbtEntry.json';
var cleanData = {results: []};
var dec, isEnc;
var keys = ['concern', 'emotions', 'negativeBeliefs'];

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  data.results.forEach(function(entry){
  	cleanData.results.push(dec(entry));
  });
  console.dir(cleanData);
});

dec = function(obj){

	var plainObj = {};
	var val;
	var _isEnc = isEnc(obj);
	keys.forEach(function(key){

		try{
			val = _isEnc ? sjcl.decrypt("whampassword", JSON.parse(obj[key])) : JSON.parse(obj[key]);
		}catch(e){
			if(e.message == 'Unexpected token u'){
				val = '';
			}
		}
		val = val == undefined ? '' : val;
		plainObj[key] = val;
	})
	return plainObj;
}

isEnc = function(obj){
	var retVal = false;
	keys.forEach(function(key){
		try{
			if(JSON.parse(obj[key]).hasOwnProperty('iv')){
				retVal = true;
			}
		}catch(e){
			if(e.message != 'Unexpected token u'){
				console.log(e.message);
			}
		}
	});
	return retVal;
}

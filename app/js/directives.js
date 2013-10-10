'use strict';

/* Directives */

spruce.
	directive('scrollfix', ['$window', function ($window, $interval) {
	  return function (scope, element, attributes) {
	    var didScroll = false, elemTop = undefined;
		function isPastView()
		{
			if(elemTop == undefined){
				elemTop = element.offset().top;
			}
		    var docViewTop = angular.element($window).scrollTop();

		    return (elemTop <= docViewTop);
		}

	    angular.element($window).bind('scroll', function() {
	        didScroll = true;
	    });

	    setInterval(function() {
	        if ( didScroll ) {

	            didScroll = false;
	            if(isPastView()){
	            	element.addClass('stick-it');
	            }else{
	            	element.removeClass('stick-it');
	            }

	        }
	    }, 250);
	  }

	}]);
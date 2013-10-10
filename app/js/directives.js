'use strict';

/* Directives */

spruce.
	directive('scrollFix', ['$window', '$interval', function ($window, $interval) {
	  return function (scope, element, attributes) {
	    var didScroll = false;
	    console.log('it loaded')
		function isPastView(elem)
		{
		    var docViewTop = angular.element($window).scrollTop();
		    var elemTop = elem.offset().top;

		    return (elemTop >= docViewTop);
		}

	    angular.element($window).bind('scroll', function() {
	        didScroll = true;
	        console.log('it scrolled')
	    });

	    $interval(function() {
	        if ( didScroll ) {

	            didScroll = false;
	            if(isPastView(element)){
	            	element.addClass('stick-it');
	            }else{
	            	element.removeClass('stick-it');
	            }

	        }
	    }, 250);
	  }

	}]);
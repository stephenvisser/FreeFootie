'use strict'

angular.module('freefootieApp')
  .directive('map', function ($location) {
  	return {
  		restrict: 'E',
      scope: false,
  		link: function(scope, el, attrs) {

        scope.$watch(attrs.mark, function(location){
          if (location) {
            var center = new google.maps.LatLng(location.latitude, location.longitude);

            var map = new google.maps.Map(el[0], {
              zoom: 14,
              center: center,
              draggable: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            //Create a new marker
            new google.maps.Marker({
                position: center,
                map: map,
                title: attrs.name
            });
          }
        }, true);

        el.on('click', function(){
          $location.absUrl('http://maps.google.com');
        });
  		}
  	};
  });
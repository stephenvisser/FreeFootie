'use strict'

angular.module('freefootieApp').filter('tdelta', function () {

    function format(number, name) {
        if (number) {
            return number + ' ' + name + (number > 1 ? 's' : '');
        }
    }

    var convertMap = [
       function (date) {
            if (date > 0) {
                var hours = Math.floor(date / 3600000);
                if (hours === 0) {
                    return 'Right Now';
                } else {
                    return 'in ' + format(hours, 'Hour'); 
                }
            } else {
               return 'Complete';
            }
        }
    ];

    return function (date) {
        if (date == undefined) {
            return 'No Data'
        } else {
            var elapsed = new Date(date).getTime() - new Date().getTime();
            return convertMap.map(function (type) { return type(elapsed); }).join(', ');
        }
    };

});
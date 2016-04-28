/**
 * Created by odyssefs on 24.04.16.
 */
(function(){
    "use strict";

    angular
        .module('myApp')
        .factory('workingHoursFactory', function ($http, $firebaseArray){

            var ref = new Firebase ("https://workinghours.firebaseio.com/");

            return {
                ref : $firebaseArray(ref)
            }
        })
})();

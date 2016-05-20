/**
 * Created by odyssefs on 21.05.16.
 */
(function(){
    "use strict";

    angular
        .module('myApp')
        .factory('sortingAlgorithms', function (){
            var factory = {};
            factory.sortByPayment = function (lhs, rhs) {
                return lhs.payment - rhs.payment;
            };

            factory.sortByDateAsc = function (lhs, rhs) {
                lhs = moment (lhs.dateTimeStart, "DD/MM/YYYY");
                rhs = moment (rhs.dateTimeStart, "DD/MM/YYYY");
                return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
            };

            factory.sortByDateDecr = function (lhs, rhs) {
                lhs = moment (lhs.dateTimeStart, "DD/MM/YYYY");
                rhs = moment (rhs.dateTimeStart, "DD/MM/YYYY");
                return lhs < rhs ? 1 : lhs > rhs ? -1 : 0;
            };

            return {
                factory: factory
            };
        })
})();
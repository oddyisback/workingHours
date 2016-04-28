/**
 * Created by odyssefs on 24.04.16.
 */
(function(){
    "use strict;"

    angular
        .module('myApp')
        .controller('WorkingHoursNewCtrl', function($scope, $mdDialog, $mdSidenav, $timeout, $state){
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveWorkingHour= function (workingDate){
                if (workingDate){
                    $scope.$emit('newWorkingDate', workingDate);
                    closeSidebar();
                }
            };

            $timeout(function(){
                $mdSidenav('left').open();
            });

            $scope.$watch("vm.sidenavOpen", function(sidenav){
                if (sidenav===false){
                    $mdSidenav("left")
                        .close()
                        .then(function(){
                            $state.go("workingHours");
                        });
                }
            });

            function closeSidebar (){
                vm.sidenavOpen=false;
            }
        })
})();

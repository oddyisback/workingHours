/**
 * Created by odyssefs on 26.04.16.
 */
(function(){
    "use strict";

    angular
        .module('myApp')
        .controller('WorkingHoursEditCtrl', function($scope, $mdDialog, $mdSidenav, $timeout, $state, workingHoursFactory){
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.workingHours = workingHoursFactory.ref;
            vm.workingHourTemp = vm.workingHours.$getRecord($state.params.id);
            vm.workingHour = vm.workingHours.$getRecord($state.params.id);

            vm.saveEditWorkingHour= function (){
                var from =moment(vm.workingHour.dateTimeStart).format('DD/MM/YYYY HH:mm:ss');
                var to = moment(vm.workingHour.dateTimeEnd).format('DD/MM/YYYY HH:mm:ss');
                var ms = moment.utc(moment(to,"DD/MM/YYYY HH:mm:ss").diff(moment(from,"DD/MM/YYYY HH:mm:ss")));
                var pm = ms.format("HH") * 8.51 + ms.format("mm")/ 100 * 8.51;
                vm.workingHour.diffTime= ms.format("HH:mm");
                vm.workingHour.payment = pm;
                vm.workingHour = {
                    dateTimeStart: from,
                    dateTimeEnd: to
                //    diffTime: ms.format("HH:mm"),
                //    payment: pm
                };

                vm.workingHours.$save(vm.workingHour).then(function(){
                        $scope.$emit('editWorkingDate', "Edit saved");
                        closeSidebar();
                });

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
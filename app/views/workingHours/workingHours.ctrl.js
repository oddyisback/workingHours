/**
 * Created by odyssefs on 24.04.16.
 */
(function(){
    "use strict";
    angular
        .module('myApp')
        .controller('WorkingHoursCtr', function($scope, $state, workingHoursFactory, $mdToast, $mdDialog){
            var vm = this;

            vm.workingHours = workingHoursFactory.ref;
            vm.totalSum = function (){
                var total = 0;
                for(var i = 0; i < vm.workingHours.length; i++){
                    var product = vm.workingHours[i];
                    total += product.payment;
                }
                return total;
            };
            vm.workingHours.$loaded().then(function(workingHours){
                console.log(workingHours);
            });

            vm.deleteWorkingHour = function (workingHour){
                if (workingHour){
                    vm.workingHours.$remove(workingHour);
                    showToast("Working hour entry is deleted");
                }
            };

            vm.editWorkingHour = function (workingHour){
                $state.go("workingHours.edit", {
                    id: workingHour.$id
                });
            };

            $scope.$on('newWorkingDate', function (event, workingDate){
                var from = moment(workingDate.dateTimeStart).format('DD/MM/YYYY HH:mm:ss');
                var to = moment(workingDate.dateTimeEnd).format('DD/MM/YYYY HH:mm:ss');
                var ms = moment.utc(moment(to,"DD/MM/YYYY HH:mm:ss").diff(moment(from,"DD/MM/YYYY HH:mm:ss")));
                var pm = ms.format("HH") * 8.51 + ms.format("mm")/ 100 * 8.51;
                workingDate= {
                    dateTimeStart: from,
                    dateTimeEnd: to,
                    diffTime: ms.format("HH:mm"),
                    payment: pm
                };
                console.log(ms);
                vm.workingHours.$add(workingDate).then(function(ref) {
                    var id = ref.key();
                    console.log("added record with id " + id);
                });
                showToast("Working date is been saved");
            });

            $scope.$on('editWorkingDate', function(event, message){
                showToast(message);
            });

            vm.openSideBar = function () {
                $state.go("workingHours.new");
            };

            function showToast(message){
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(3000)
                )
            }

            $scope.selected = [];

            $scope.query = {
                order: 'name',
                limit: 5,
                page: 1
            };
        })
        .config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
})();
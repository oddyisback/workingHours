'use strict';

// Declare app level module which depends on views, and components
angular
    .module('myApp', ['ngMaterial', 'ui.router', 'ngMaterialDatePicker', 'firebase', 'md.data.table', 'mdPickers'])
    .config(function($mdThemingProvider, $stateProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');

      $stateProvider
          .state('workingHours', {
            url: '/workingHours',
            templateUrl: 'views/workingHours/workingHours.tpl.html',
            controller: 'WorkingHoursCtr as vm'
          })
          .state('workingHours.new', {
              url: '/new',
              templateUrl: 'views/workingHoursNew/workingHours.new.tmpl.html',
              controller: 'WorkingHoursNewCtrl as vm'
          })
          .state('workingHours.edit', {
              url: '/edit',
              templateUrl: 'views/workingHoursEdit/workingHours.edit.tmpl.html',
              controller: 'WorkingHoursEditCtrl as vm',
              params: {
                  id: null
              }
          });
    });

'use strict';

var Timbre = angular.module('Timbre', [
    'famous.angular',
    'ui.router'
]);

Timbre.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'views/app.html',
                controller: 'AppController'
            })
            .state('page', {
                url: '/page',
                templateUrl: 'views/page.html',
                controller: 'PageController'
            });

        $urlRouterProvider.otherwise('/app');
    }]);

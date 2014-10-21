'use strict';

var Timbre = angular.module('Timbre', [
    'famous.angular',
    'ui.router'
]);

Timbre.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('page', {
                url: '/page',
                templateUrl: 'views/page.html',
                controller: 'PageController'
            })
            .state('menu', {
                url: '/menu',
                templateUrl: 'views/menu.html',
                controller: 'MenuController'
            })
            .state('menu.strip', {
                url: ''
            });

        $urlRouterProvider.otherwise('/page');
    }]);

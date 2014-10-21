'use strict';

Timbre.controller('AppController', ['$scope', '$famous',
function ($scope, $famous) {
    var self = this;

    this.init = function () {
        this.setScope();
        this.load();
    };

    this.load = function () {
        this.setScopeEvents();
    };

    this.setScope = function () {
    };

    this.setScopeEvents = function () {
        $scope.$on('menuToggle', function() {});
    };

    this.init();
}]);

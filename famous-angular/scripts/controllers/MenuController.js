'use strict';

Timbre.controller('MenuController', ['$scope', '$famous',
    function ($scope, $famous) {
        var self = this;
        var Transform = $famous['famous/core/Transform'];


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
        };

        this.init();
    }]);

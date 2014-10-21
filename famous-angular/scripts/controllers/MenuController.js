'use strict';

Timbre.controller('MenuController', ['$scope', '$famous', '$timeline',
    function ($scope, $famous, $timeline) {
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Easing = $famous['famous/transitions/Easing'];

        $scope.t = new Transitionable(0);

        $scope.enter = function($done) {
            $scope.t.set(1, {duration: 300}, $done);
        };

        $scope.leave = function($done) {
            $scope.t.set(0, {duration: 300}, $done);
        };

        $scope.translate = $timeline([
            [0, [0, 0, 0]],
            [1, [200, 0, 0]]
        ]);
    }]);

'use strict';

Timbre.controller('MenuController', ['$scope', '$famous', '$timeline', 'AppEnums', 'StripService',
    function ($scope, $famous, $timeline, AppEnums, StripService) {
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Transform = $famous['famous/core/Transform'];

        StripService.getData().then(function(items) {
            var topOffset = 37;
            var stripOffset = 58;

            $scope.stripMenuItems = [];

            for(var i = 0, j = items.length; i < j; i++) {
                var item = items[i];
                item.translate = [0, topOffset, 0];//Transform.translate(0, topOffset, 0);
                item.transform = getTransforms(topOffset);
                $scope.stripMenuItems.push(item);
                topOffset += stripOffset;
            }

            console.info('$scope.stripMenuItems', $scope.stripMenuItems);
        });

        $scope.menuItem = {
            color: 'white',
            size: [320, 50],
            translate: Transform.translate(0, 200, 0),
            skew: Transform.skew(0, 0, -0.2),
            backgroundColor: 'black',
            boxShadow: '0 0 1px rgba(0,0,0,1)'
        };

        var getTransforms = function(yoffset) {
            var translate = Transform.translate(0, yoffset, 0);
            var skew = Transform.skew(0, 0, -0.2);
            var rotate = Transform.rotateZ(-0.2);
            var transformMatrix = Transform.multiply(translate, rotate, skew);

            return transformMatrix;
        };

        $scope.t = new Transitionable(0);

        $scope.enter = function($done) {
            $scope.t.set(1, AppEnums.transitions, $done);
        };

        $scope.leave = function($done) {
            $scope.t.set(1, AppEnums.transitions, $done);
        };

        $scope.translate = $timeline([
            [0, [-200, 0, 0]],
            [1, [0, 0, 0]]
        ]);
    }]);

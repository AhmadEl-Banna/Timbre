'use strict';

Timbre.controller('PageController', ['$scope', '$famous',
    function ($scope, $famous) {
        var self = this;
        var isToggled = false;

        var Transform = $famous['famous/core/Transform'];
        var FastClick = $famous['famous/inputs/FastClick'];
        var Transitionable = $famous['famous/transitions/Transitionable'];

        this.init = function () {
            this.setScope();
            this.load();
        };

        this.load = function () {
            this.setScopeEvents();
        };

        this.setScope = function () {
            $scope.transition = new Transitionable([0, 0,.1]);

            $scope.bkgdSurface = {
                properties: {
                    backgroundColor: 'black',
                    size: [undefined, 44]
                }
            };

            $scope.headerComponents = [
                {
                    size: [44, 44],
                    content: 'img/hamburger.png',
                    origin: [0, 0.5],
                    align : [0, 0.5]
                },
                {
                    size: [232, 44],
                    content: 'img/search.png',
                    origin: [0.5, 0.5],
                    align : [0.5, 0.5]
                },
                {
                    size: [44, 44],
                    content: 'img/icon.png',
                    origin: [1, 0.5],
                    align : [1, 0.5]
                }
            ];

            $scope.content = {
                size: [undefined, true],
                content: 'img/body.png'
            }
        };

        this.setScopeEvents = function () {
            $scope.toggleMenu = function () {
//                $scope.$emit('menuToggle');
                self.toggleMenu();
            };
        };

        this.toggleMenu = function() {
            if(isToggled) {
                this.slideLeft();
            } else {
                this.slideRight();
            }

            isToggled = !isToggled;
        };

        this.slideLeft = function() {
            $scope.transition.set([0, 0, .1], {
                duration: 500,
                curve: 'easeOut'
            });
        };

        this.slideRight = function() {
            $scope.transition.set([276, 0,.1], {
                duration: 500,
                curve: 'easeOut'
            });
        };

        this.init();
    }]);

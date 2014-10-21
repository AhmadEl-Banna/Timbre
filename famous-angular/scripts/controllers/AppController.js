'use strict';

Timbre.controller('AppController', ['$scope', '$state',
function ($scope, $state) {
    var isToggled = false;

    $scope.$on('toggleMenu', function() {
        // console.info('menu toggled', isToggled);

        // This is not working for some reason
        /*if(!isToggled) {
            $state.go('menu');
        } else {
            $state.go('page');
        }*/

        // isToggled = !isToggled;
    });
}]);

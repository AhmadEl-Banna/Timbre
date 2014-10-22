'use strict';

Timbre.factory('AppEnums', ['$famous', function ($famous) {
    var Easing = $famous['famous/transitions/Easing'];

    return {
        transitions: {
            duration: 400,
            curve: 'easeOut'
        }
    };
}]);

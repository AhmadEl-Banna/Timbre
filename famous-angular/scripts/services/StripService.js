'use strict';

Timbre.factory('StripService', ['$q', function ($q) {
    var stripData = [
        {"title": "search", "iconUrl": "img/strip-icons/famous.png"},
        {"title": "starred", "iconUrl": "img/strip-icons/starred.png"},
        {"title": "friends", "iconUrl": "img/strip-icons/friends.png"},
        {"title": "settings", "iconUrl": "img/strip-icons/settings.png"}
    ];

    return {
        getData: function() {
            var deferred = $q.defer();
            deferred.resolve(stripData);
            return deferred.promise;
        }
    };
}]);
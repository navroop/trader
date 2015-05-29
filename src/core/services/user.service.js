/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userService', userService);

    userService.$inject = ['$http', '$location', 'exception'];
    /* @ngInject */
    function userService($http, $location, exception) {
        var service = {
        	userName:"lorem",
        };
        return service;
    }
})();

/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', '$location', 'exception', 'serverURL'];
    /* @ngInject */
    function accountService($http, $location, exception, serverURL) {
        var service = {
            getAccount: getAccount
        };

        return service;

        function getAccount() {
            return $http.get(serverURL + '/orders')
                .then(getAccountComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccount')(message);
                    $location.url('/');
                });

            function getAccountComplete(data) {
                return data.data;
            }
        }
    }
})();

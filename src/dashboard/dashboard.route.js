(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(),"/dashboard");
    }

    function getStates() {
        return [{
            state: 'dashboard',
            config: {
                url: '/dashboard',
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                title: 'Dashboard',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                }
            }
        }];
    }
})();
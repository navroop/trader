(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['logger', 'orderService', 'userService'];

    /* @ngInject */
    function LoginController(logger, orderService, userService) {
        var vm = this;

        vm.user = {};

        activate();

        function activate() {
            logger.info('Activated Login View');
            vm.user = orderService.users();
            return vm.user;
        }
        vm.submitt = function(data) {
            userService.userName = data;
        }
    }
})();
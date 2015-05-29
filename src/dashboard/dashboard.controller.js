(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['orderService', 'logger', 'accountService','OrderEventService','EventType','$interval','$timeout'];

    /* @ngInject */
    function DashboardController(orderService, logger, accountService,OrderEventService,EventType,$interval,$timeout) {
        var vm = this;
        vm.account = null;
        vm.instruments = null;
        vm.tableFlag = true;
        vm.chartFlag = false;
        vm.myTableClass = "cust-active";
        activate();
        activate2();

        function activate() {
            logger.info('Activated Dashboard View');
           
            vm.instruments = orderService.instruments();
            return;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        vm.createOrder = function() {
            for (var i = 0; i < vm.tradeValue; i++) {
                var numInstruments = vm.instruments.length;
                orderService.createOrder(null, {
                    side: 'Buy',
                    symbol: vm.instruments[getRandomInt(0, numInstruments - 1)].symbol,
                    quantity: 5000,
                    limitPrice: 100,
                    traderId: 'SS'
                });
                 
            };
            vm.tradeValue = "";
            vm.refreshOrders();
            var i = $interval(activate2,1000);
			$timeout(function( ) {  $interval.cancel( i ); }, 45000);
        };

        vm.clearOrders = function() {
            orderService.clearOrders();
        };

        vm.refreshOrders = function() {
           activate2();
        };

        vm.tabRender = function() {
            vm.tableFlag = true;
            vm.chartFlag = false;
            vm.myChartClass = "";
            vm.myTableClass = "cust-active";
        };
        function findOrder(id) {
            return _.find(vm.account, {id: id});
        }

		OrderEventService.on(EventType.orderCreated, function(order) {
            vm.account.push(order);
        });

        OrderEventService.on(EventType.placementCreated, function(placement) {
            var order = findOrder(placement.orderId);

            if (order) {
                order.quantityPlaced += placement.quantityPlaced;
                order.status = placement.status;
            }
        });

        OrderEventService.on(EventType.executionCreated, function(execution) {
            var order = findOrder(execution.orderId);

            if (order) {
                order.quantityExecuted += execution.quantityExecuted;
                order.status = execution.status;
                order.executionPrice = execution.executionPrice;
            }
        });

        OrderEventService.on(EventType.allOrdersDeleted, function() {
            vm.account = [];
        });
        vm.chartRender = function() {
            vm.chartFlag = true;
            vm.tableFlag = false;
            vm.myChartClass = "cust-active";
            vm.myTableClass = "";
            activate2();
        };

        function activate2() {
            return getAccount().then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getAccount() {
            return accountService.getAccount().then(function(data) {
                vm.account = data;
                return vm.account;
            });
        }
    }
})();
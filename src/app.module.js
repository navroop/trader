(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',
        'ngResource',

        // Features
        'app.dashboard',
        'app.login'
    ]);
    
})();

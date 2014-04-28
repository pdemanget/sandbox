/**
 * disable input from $dirty angular management.
 */
angular.module('pmsipilotRecueil').directive('ngNodirty', ['$log', '$timeout' ,function($log, $timeout) {
    return {
        require: '^form', // We look for it on a parent, since it will be defined somewhere higher on the DOM.
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            if (!attrs.name) {
                $log.error("name attribut is mandatory on input pm-nodirty");
            }
            $timeout(function(){
                ctrl.$removeControl(ctrl[attrs.name]);
            });
        }
    };
}]);

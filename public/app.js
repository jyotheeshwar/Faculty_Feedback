angular.module('TestAngular', [])
.controller('MainCtrl', [
    '$scope',
    function ($scope) {
        $scope.test = 'Faculty rating system | ' + (new Date()).getFullYear();
}]);


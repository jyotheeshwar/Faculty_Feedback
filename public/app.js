angular.module('TestAngular', [])
.controller('MainCtrl', [
    '$scope',
    function ($scope) {
        $scope.test = 'Faculty rating system | ' + (new Date()).getFullYear();
        $scope.User_name='Insanity Puppy';
        $scope.university_name='Le Universität Uni';
}]);


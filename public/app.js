(function(){
var app=angular.module('TestAngular', []);

app.controller('MainCtrl', [
    '$scope','$http',
    function ($scope,$http) {
        $scope.test = 'Faculty rating system | ' + (new Date()).getFullYear();
        $scope.User_name='Insanity Puppy';
        $scope.university_name='Le Universität Uni';
        $scope.ratings=[];
       $http.get('/data').success(function(data){
        	$scope.ratings=data;
        });
}]);
})();


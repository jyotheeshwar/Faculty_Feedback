(function(){
    var app=angular.module('TestAngular', []);

    app.controller('MainCtrl', 
        ['$scope','$http', function ($scope,$http) {
            $scope.test = 'Faculty rating system | ' + (new Date()).getFullYear();
            $scope.User_name='Insanity Puppy';
            $scope.university_name='Le Universität Uni';
            $scope.ratings=[];
            $http.get('/users').success(function (data){
                $scope.users=data;
            });
            $scope.username;
            $scope.password;
            $scope.Signin = function () {
                $http.post('/signin', { username: $scope.username, password: $scope.password }).success(function (data) {
                    $scope.message = data;
                });
            };
            $scope.Signup = function () {
                $http.post('/signup', { username: $scope.username, password: $scope.password }).success(function (data) {
                    $scope.message = data;
                });
            }; 
        }]);

    /*app.controller('AuthorizationCtrl', 
        ['$scope', '$http', function ($scope, $http) {
            
        }]);*/
})();


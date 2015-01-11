(function(){
    var app=angular.module('FacFeedback', []);
    app.controller('MainCtrl', 
        ['$scope','$http', function ($scope,$http) {
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


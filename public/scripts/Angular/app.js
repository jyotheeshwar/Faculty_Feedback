(function(){
    var app=angular.module('FacFeedback', []);
    app.controller('MainCtrl', 
        ['$scope','$http', function ($scope,$http) {
            $scope.User_name='Insanity Puppy';
            $scope.university_name='Le Universität Uni';
            $scope.ratings=[];
            $scope.loggedin = false;
            $scope.SessionCheck = function () {
                $http.get('/signedin').success(function (data) {
                    if (data)
                        $scope.loggedin = true;
                    $scope.User_name = data;
                });
            };
            
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

            $scope.Logout = function () {
                $http.get('/logout', function () { 
                    $scope.loggedin = false;
                    $scope.User_name = 'Insanity Puppy';
                });
            };
        }]);
})();


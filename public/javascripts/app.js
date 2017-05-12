var app = angular.module('userapp', []);
app.controller('myController', function ($scope, $http) {
    $scope.data = [];
    var request = $http.get('/users/data');
    request.success(function (data) {
        $scope.data = data;
    });
    request.error(function (data) {
        console.log('Error: ' + data);
    });
});

app.controller('userInput', function ($scope, $http) {
    $scope.data = [];

    $scope.addFun = function () {
        console.log("Buttn Clicked " + $scope.username);
        var request = $http.get('/users/adduser/' + $scope.username);
        request.success(function (data) {
            confirm(data);
        });
        request.error(function (data) {
            console.log('Error: ' + data);
            confirm("User Could not be Added");
        });
    }

    $scope.deleteFun = function () {
        var request = $http.get('/users/deleteUser/' + $scope.username);
        request.success(function (data) {
            confirm(data);
        });
        request.error(function (data) {
            console.log('Error: ' + data);
            confirm("User Could not be Removed");
        });
    }

    $scope.updateFun = function() {
        var request = $http.get('/users/updateData/' + $scope.username + "/" + $scope.age);
        request.success(function (data) {
            confirm(data);
        });
        request.error(function (data) {
            console.log('Error: ' + data);
            confirm("User Could not be Removed");
        });
    }

    $scope.findFun = function () {

    }
});
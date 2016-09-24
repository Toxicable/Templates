angular.module('app')
.controller('HomeCtrl', ['$scope', '$http', homeCtrlFunc]);

function homeCtrlFunc($scope, $http) {

    $scope.testPing = function () {


        $http.get('/api/AuthTest/PingSecured').then(function (response) {
            console.log(response)

        })
    }
}

var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  $scope.appName = "CrpytoCurrency Values";

  $interval(function() {
    $http.get("https://api.coinmarketcap.com/v1/ticker/")
     .then(function(response) {
         var cryptoData = JSON.stringify(response.data);
         $scope.cryptoData = JSON.parse(cryptoData);
     });
   }, 10000);

}]);

var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  $scope.appName = "CrpytoCurrency Values";

  $interval(function() {
    $http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP&tsyms=USD,BTC,ETH")
     .then(function(response) {
         var cryptoData = JSON.stringify(response.data);
         $scope.cryptoData = JSON.parse(cryptoData);
     });         
      }, 1000);

}]);

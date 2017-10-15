var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.appName = "CrpytoCurrency Values";
  $http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP&tsyms=USD,BTC,ETH")
   .then(function(response) {
       var cryptoData = JSON.stringify(response.data);
       $scope.cryptoData = JSON.parse(cryptoData);
   });
}]);

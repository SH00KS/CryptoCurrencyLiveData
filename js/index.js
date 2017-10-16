var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  $scope.appName = "CrpytoCurrency Values";

  $interval(function() {
    $http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
     .then(function(response) {
         var cryptoData = JSON.stringify(response.data);
         $scope.cryptoData = JSON.parse(cryptoData);
         $scope.cryptoName = $scope.cryptoData.name;

         $scope.changeView = function(ticker) {
          console.log("changeView called with ", ticker, $scope.cryptoData);
         var currency = $scope.cryptoData.find(x => x.symbol === ticker);
         console.log("currency is ", currency);
          $scope.currentSelectedCurrency = currency;

}
     });
   }, 10000);
}]);

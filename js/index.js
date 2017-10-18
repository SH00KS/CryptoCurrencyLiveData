var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  $scope.appName = "CrpytoCurrency Values";

  $scope.changeView = function(ticker) {
    var currency = $scope.cryptoData.find(x => x.symbol === ticker);
    $scope.currentSelectedCurrency = currency;
  };

  function loadData(){
    $http.get("https://api.coinmarketcap.com/v1/ticker/")
     .then(function(response) {
         $scope.cryptoData = response.data;
         $scope.currentSelectedCurrency = response.data[0];
         console.log($scope.topCoin);
       });
  };

  $interval(function() {
    loadData();
   }, 10000);

   loadData();
}]);

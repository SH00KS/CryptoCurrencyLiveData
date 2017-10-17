var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  $scope.appName = "CrpytoCurrency Values";

  $scope.changeView = function(ticker) {
    var currency = $scope.cryptoData.find(x => x.symbol === ticker);
    $scope.currentSelectedCurrency = currency;
  };

  function loadData(){
    $http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
     .then(function(response) {
         $scope.cryptoData = response.data;
       });
  };

  $interval(function() {
    loadData();
   }, 10000);

   loadData();
}]);

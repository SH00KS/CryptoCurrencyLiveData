var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  var getCurrencyData = $http.get("https://api.coinmarketcap.com/v1/ticker/");

  $scope.changeView = function(ticker) {
    var currency = $scope.cryptoData.find(x => x.symbol === ticker);
    $scope.currentSelectedCurrency = currency;
  };

  function loadData(){
    getCurrencyData
     .then(function(response) {
         $scope.cryptoData = response.data;
       });
  };

  function populateInitialData(){
    getCurrencyData
     .then(function(response) {
       $scope.topCoin = response.data[0];
       $scope.currentSelectedCurrency = $scope.topCoin;
     });
  }

  $interval(function() {
    loadData();
   }, 10000);

   loadData();
   populateInitialData();
}]);

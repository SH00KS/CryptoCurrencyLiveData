var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  var getCurrencyData = $http.get("https://api.coinmarketcap.com/v1/ticker/");

  $scope.changeView = function(ticker) {
    var currency = $scope.cryptoData.find(x => x.symbol === ticker);
    $scope.currentSelectedCurrency = currency;
    percentageChangeIndicators();
    supplyChartFigures();
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
       percentageChangeIndicators();
       supplyChartFigures();
     });
  }

  function percentageChangeIndicators(){
    if ($scope.currentSelectedCurrency.percent_change_1h > 0) {
         $scope.oneHourIndicatorClass = "green";
         $scope.oneHourIndicatorIcon = "asc";
       } else {
         $scope.oneHourIndicatorClass = "red";
         $scope.oneHourIndicatorIcon = "desc";
     };
     if ($scope.currentSelectedCurrency.percent_change_24h > 0){
         $scope.twentyFourHourIndicatorClass = "green";
         $scope.twentyFourHourIndicatorIcon = "asc";
       } else {
         $scope.twentyFourHourIndicatorClass = "red";
         $scope.twentyFourHourIndicatorIcon = "desc";
       };
     if ($scope.currentSelectedCurrency.percent_change_7d > 0){
         $scope.sevenDayIndicatorClass = "green";
         $scope.sevenDayIndicatorIcon = "asc";
     } else {
        $scope.sevenDayIndicatorClass = "red";
        $scope.sevenDayIndicatorIcon = "desc";
     };
  }

  function supplyChartFigures(){
    $scope.totalSupply = $scope.currentSelectedCurrency.total_supply;
    $scope.availableSupply = $scope.currentSelectedCurrency.available_supply;
  }


  $interval(function() {
    loadData();
   }, 10000);

   loadData();
   populateInitialData();
}]);

var cryptoCurrencyLiveData = angular.module('cryptoCurrencyLiveData',[]);

cryptoCurrencyLiveData.controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  var getCurrencyData = $http.get("https://api.coinmarketcap.com/v1/ticker/");
  var getCryptoCompareData = $http.get("https://www.cryptocompare.com");

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
    console.log("available supply: " + $scope.availableSupply * $scope.totalSupply / 100);
  }

  function init_chart_doughnut(){

    if( typeof (Chart) === 'undefined'){ return; }

    console.log('init_chart_doughnut');


    if ($('.canvasDoughnut').length){

      $scope.totalSupply = $scope.currentSelectedCurrency.total_supply;
      $scope.availableSupply = $scope.currentSelectedCurrency.available_supply;


    var chart_doughnut_settings = {
        type: 'doughnut',
        tooltipFillColor: "rgba(51, 51, 51, 0.55)",
        data: {
          labels: [
            "Available",
            "Total",

          ],
          datasets: [{
            data: [$scope.availableSupply, $scope.totalSupply],
            backgroundColor: [
              "#BDC3C7",
              "#9B59B6",
              "#E74C3C",
              "#26B99A",
              "#3498DB"
            ],
            hoverBackgroundColor: [
              "#CFD4D8",
              "#B370CF",
              "#E95E4F",
              "#36CAAB",
              "#49A9EA"
            ]
          }]
        },
        options: {
          legend: false,
          responsive: false
        }
      }

      $('.canvasDoughnut').each(function(){

        var chart_element = $(this);
        var chart_doughnut = new Chart( chart_element, chart_doughnut_settings);

      });

    }

  }

  function refreshData(){
    console.log("refreshing");
    loadData();
  }


  $interval(function() {
    loadData();
   }, 10000);

   loadData();
   populateInitialData();
}]);

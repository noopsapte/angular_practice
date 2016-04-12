//module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


                  
//routes                      
weatherApp.config(function($routeProvider) {
$routeProvider.when('/',{
    templateUrl: 'pages/home.html',
    controller: 'homeController'
})

.when('/forecast',{
templateUrl: 'pages/forecast.html',
controller: 'forecastController' 
})

});

//Services
weatherApp.service('cityService', function(){

    this.city="New York, NY";
});

//controller
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.$watch('city', function()
    {
        cityService.city= $scope.city;
    
    });
                                         
}]); 
                      
weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?q=London,us&appid=bd82977b86bf27fb59a04b61b657fb6f", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 5});
    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8 * (degK -273)) + 32);
    }
    
    $scope.covertToDate = function(dt){
    return new Date(dt * 1000);
    };
    
    console.log($scope.weatherResult);
    
                                         
}]); 
$(document).ready(function(){

	console.log("ready")
});

angular.element(document).ready(function(){
	angular.bootstrap(document.getElementById("music-container"), ['musicApp']);
});

var app = angular.module('musicApp', []).config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{$');
	$interpolateProvider.endSymbol('$}');
});

app.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.controller('navController', function($scope, $rootScope, $http){
	console.log("angular in nav is ready!");
	// Store the data in the root
	$rootScope.selectedTab = 'search';
	$scope.updateTab = function(value)
	{
		$rootScope.selectedTab = value;
	}
});

app.controller('musicController', function($scope){
	console.log("angular in testing is ready");
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

app.controller('searchController', function($scope, $http){
	console.log("search angular is ready");

	$scope.searchMusic = function()
	{
		console.log("changing text to " + $scope.searchText);

		$http({
			method: 'POST',
			url: '/music/search-music'
		}).then(function successCallback(response) {

		}, function errorCallback(response) {
		});


	}
});
angular.element(document).ready(function(){
	angular.bootstrap(document.getElementById("music-container"), ['musicApp']);
});

// shareable module
var appFilter = angular.module("shareApp", []);

// custom filter to convert sec to string format with minute
appFilter.filter("convertSec", function () {
    return function (sec) {
    	minute = Math.floor(sec / 60);
    	remaining = sec % 60;
    	// cast to two format
    	if(remaining < 10) remaining = "0" + remaining;
    	return(minute + " min " + remaining + " sec")
    }
});

// Start the module
var app = angular.module('musicApp', ["shareApp"]).config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{$');
	$interpolateProvider.endSymbol('$}');
});

// for http request
app.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

// controller for the left nav
app.controller('navController', function($scope, $rootScope, $http){
	// Store the data in the root
	$rootScope.selectedTab = 'home';
	$scope.updateTab = function(value)
	{
		$rootScope.selectedTab = value;
	}
});

// Not needed
app.controller('musicController', function($scope){
});

// controller for the search
app.controller('searchController', function($scope, $http){
	$scope.searchResult = '';
	$scope.titleSort = -1;
	$scope.authorSort = -2;
	$scope.albumSort = -3;
	$scope.durationSort = -4;

	$scope.searchMusic = function()
	{
		// to prevent empty search
		// if($scope.searchText == '')
		// {
		// 	$scope.searchResult = ''
		// 	return;
		// }

		$http({
			method: 'POST',
			url: '/music/search-music',
			data: {search: $scope.searchText}
		}).then(function successCallback(response) {
			//console.log(response)
			$scope.searchResult = response['data'];
			//console.log($scope.searchResult)
		}, function errorCallback(response) {
		});

	}

	// function to change order for display
	$scope.changeOrder = function(value)
	{
		$scope[value] = $scope[value] * -1;
		// store the temp value
		value = $scope[value];

		// change to increment
		if(value > 0){
			$scope.searchResult.sort(function(a, b) { 
	    		return String(a[value]).toUpperCase() > String(b[value]).toUpperCase() ? 1 : -1;
			});
		}
		// decrement the table
		else{
			// change back to positive index
			temp = value * -1;
			$scope.searchResult.sort(function(a, b) { 
	    		return String(a[temp]).toUpperCase() < String(b[temp]).toUpperCase() ? 1 : -1;
			});			
		}

	}
});

// controller for the manage tab
app.controller('manageController', function($scope, $http){
	$scope.playlist = playlist;
	$scope.selectedPlaylist = '';

	// get the song associated with playlist
	$scope.getSongs = function(id, playlist)
	{
		$scope.selectedPlaylist = playlist;

		$http({
			method: 'POST',
			url: '/music/get-playlist-music',
			data: {id: id}
		}).then(function successCallback(response) {
			// console.log(response)
			$scope.playlistResult = response['data']

		}, function errorCallback(response) {
		});
	}
});
angular.element(document).ready(function(){
	angular.bootstrap(document.getElementById("search-container"), ['searchApp']);
});

var app = angular.module('searchApp', []).config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{$');
	$interpolateProvider.endSymbol('$}');
});

app.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.controller('searchController', function($scope){
	console.log("search angular is ready");

});


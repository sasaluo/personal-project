(function(){
	define([
		'ionic-angular',
		'ngStorage',
		'angular-ui-router',
		'ng-file-upload',
	], function(){

		var app = angular.module('app',[
			'ionic',
			'ui.router',
			'ngAnimate',
			'ngStorage',
			'ngSanitize',
			'ngFileUpload'
		]);

		return app
	});
})()
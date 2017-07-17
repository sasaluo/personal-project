(function(){
	angular.module('app').directive('restrictLength', restrictLength);
	restrictLength.$inject[''];
	
	function lrestrictLength() {
		var directive = {
			restrict:'A',
			scope:{
				test:'=data'
			},
			link:link
		};
	}	
		return directive;

		function link(scope,ele,attr){
			console.log(scope.test)
			scope.$watch('test',function(newval){
				console.log(newval)

			},true)

		}
		
	
})
angular.module('app')
.directive('mobileOnly',mobileOnly);

mobileOnly.$inject = [];
 function mobileOnly(){
    var directives = {
            restrict:'A',
            scope:{test : '=data'},
            link:link,
        }
        return directives;
         function link(scope,ele,attr){
            console.log(scope.test)
            
            scope.$watch('test',function(){

                console.log(scope.test)
                var reg = /^[0-9]*$/;
                if(scope.test){
                     if(!reg.test(scope.test)){
                        var correctVal = scope.test.substring(0,scope.test.length-1);
                        scope.test = correctVal;
                    }
                }
               

            })
            
        }
    
};
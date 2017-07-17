angular.module('app')
.directive('restrictLength',restrictLength);

restrictLength.$inject = [];
 function restrictLength(){
    var directives = {
            restrict:'A',
            scope:{test : '=data'},
            link:link,
        }
        return directives;
         function link(scope,ele,attr){
             scope.$watch('test',function(){
                     if(scope.test.length==16){
                         scope.telnumber = scope.test;
                         console.log(scope.telnumber)
                     };
                      if(scope.test.length>16){
                         scope.test = scope.telnumber;
                         console.log(scope.test);
                                       
                    };
                })
           
        }
    
};
 
                
                
               
               
           
    
   

(function() {
    define(['app'],function(app){
        app.controller('newPassWordCtrl', newPassWordCtrl);
       
        newPassWordCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicLoading','$localStorage','$stateParams','Service'];

        function newPassWordCtrl($scope, $rootScope, $state, $ionicLoading,$localStorage,$stateParams,Service) {
             var vm = this;             
             vm.newPwd="";
             vm.confirmPwd="";
             vm.same=false;
             vm.endPwd='';
             vm.confirm="";
             vm.setParams =$stateParams;

             vm.modifyPwd=modifyPwd;//修改密码
            
            //分别监控两次输入的密码
            if(vm.newPwd){
                    if(vm.newPwd.length==16){
                    vm.endPwd = vm.newPwd;
                    console.log(vm.endPwd)
                }
            }
           

            $scope.$watch(function() { return vm.newPwd}, checkPassword);
            $scope.$watch(function() { return vm.confirmPwd}, checkPassword);
            
            //密码验证
            function checkPassword(){
                if(vm.newPwd){
                    var regNum= /^^\d+$/;//验证数字
                    var regStr = /^[a-zA-z]+$/;//验证字母

                    vm.isNumber = regNum.test(vm.newPwd);
                    vm.isStr = regStr.test(vm.newPwd);
                    vm.isPswWrong = (vm.isNumber || vm.isStr);

                    
                        if(vm.newPwd.length==16)
                        {                            
                            vm.endPwd = vm.newPwd;
                        }
                        else if(vm.newPwd.length>16)
                        {
                           vm.newPwd =vm.endPwd;  
                        }                                   
                }

                if(vm.confirmPwd){
                        if(vm.confirmPwd.length==16)
                        {
                            vm.confirm = vm.confirmPwd;
                            console.log(vm.endPwd)
                        }
                        else if(vm.confirmPwd.length>16)
                        {
                           vm.confirmPwd =vm.confirm;  
                        }                                   
                }
                 

                if(vm.newPwd&&vm.confirmPwd){
                    if(vm.confirmPwd!=vm.newPwd){
                         vm.same=true;
                    }else{
                         vm.same=false;
                    }                
                }
            }

            function modifyPwd(){
                vm.paramters={
                    'appKey':100000040,
                    'smsCode':vm.setParams.smsCode,
                    'newPassword':vm.newPwd,
                    'phoneNumber':vm.setParams.phoneNumber
                }
                console.log(vm.paramters)
                 Service.post('storeServer', 'resetPwd',vm.paramters).then(function(data) {                
                   console.log(data)
                   if(data.returnCode==1000){
                        $state.go('clerkLogin')
                   }
                });
            }         
        }
    })
})();
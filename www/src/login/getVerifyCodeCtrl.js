(function() {
    define(['app'],function(app){
        app.controller('getVerifyCodeCtrl', getVerifyCodeCtrl);    
        getVerifyCodeCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading','Service','$interval'];

        function getVerifyCodeCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading,Service,$interval) {
            var vm= this;
            vm.achieveCode = achieveCode;//获取验证码
            vm.setNewPwd = setNewPwd;//设置新密码
            vm.seconds=60;
            vm.clickAble=false;

            vm.loginInfo={
                "phoneNumber":'',
                "code":''
            };
            vm.getSmsCode ="获取验证码";
             

            function achieveCode(){
                if(!vm.loginInfo.phoneNumber){
                    $ionicPopup.alert({
                        template: '<div style="text-align:center">请输入注册的手机号</div>',
                        okText: '确定'
                    })
                    return;
                }
                
                vm.seconds=60;
            
                
                vm.paramters={
                    'phoneNumber':vm.loginInfo.phoneNumber,
                    'smsType':2
                }
                console.log(vm.paramters)
                Service.post('salesServer', 'sendSms',vm.paramters).then(function(data) {               
                   console.log(data)
                   if(data.returnCode==1000){//获取成功
                        vm.timeMinus = $interval(secondsMinus,1000);
                   }else if(data.returnCode==1005){
                        $ionicPopup.alert({
                            template: '<div style="text-align:center">data.message</div>',
                            okText: '确定'
                        })
                   }

                });            
            }

            function secondsMinus(){
                vm.seconds--;
                vm.getSmsCode=vm.seconds+"s后重新获取";
                vm.clickAble=true;
                if(vm.seconds<10){
                    vm.getSmsCode='0'+vm.seconds+"s后重新获取";
                     if(vm.seconds<=0){
                       vm.seconds=0;
                       $interval.cancel(vm.timeMinus) ;
                       vm.getSmsCode ="获取验证码";
                       vm.clickAble=false;
                    }
                }           
            }


            function setNewPwd(){
                vm.info={
                   'phoneNumber':vm.loginInfo.phoneNumber, 
                   'smsCode':vm.loginInfo.code
                }
                 Service.post('storeServer', 'checkSms',vm.info).then(function(data) { 

                        console.log(data)
                        if(data.returnCode==1000){
                            $state.go('newPassWord',vm.info)
                        }else{
                             $ionicPopup.alert({
                                template: '<div style="text-align:center">+data.message+</div>',
                                okText: '确定'
                            })

                        }
                 })               
            }

        }
    })
})();
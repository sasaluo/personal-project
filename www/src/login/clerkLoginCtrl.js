(function() {
    define(['app'],function(app){
        app.controller('clerkLoginCtrl', clerkLoginCtrl);
    
        clerkLoginCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading','Service','$localStorage'];

        function clerkLoginCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading,Service,$localStorage) {

            var vm = this;
            vm.account = '';
            vm.password = '';
            vm.counterGoodsList = counterGoodsList;//返回业务办理

            //用户登录
            vm.loginVerify = loginVerify;


            //用户登录
            function loginVerify() {
                vm.loginCondition = {
                    "userName": vm.account, // "15010218546"
                    "password": vm.password //"123456"
                }
                Service.post('storeServer', 'login',vm.loginCondition).then(function(data) {
                   $localStorage.userInfo =data.dataInfo;
                   console.log(data)
                   $state.go('clerkIndex')
                });


            }
            function counterGoodsList(){
                $state.go('businessHandling')
            }
        }
    })
    
})();

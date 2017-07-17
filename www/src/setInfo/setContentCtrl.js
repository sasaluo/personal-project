(function() {
    define(['app'],function(app){
        app.controller('setContentCtrl', setContentCtrl);
        
        setContentCtrl.$inject = ['$scope', '$state', 'Service', '$stateParams', 'Popup'];

        function setContentCtrl($scope, $state, Service, $stateParams, Popup) {
            var vm = this;

            //更改密码
            vm.changePassword = changePassword;
            //编辑店铺
            vm.setStoreInfo = setStoreInfo;
            //注销账户
            vm.isCancelAccount = isCancelAccount;
            vm.goPrev = goPrev;


            //更改密码
            function changePassword() {
                $state.go('changePassword');
            }
            //编辑店铺
            function setStoreInfo() {
                $state.go('setStore');
            }
            //注销账户
            function isCancelAccount() {
                Popup.alertGoToLogin('确认退出');
            }

            function goPrev() {
                $state.go('clerkIndex')
            }
        }
    })
})();
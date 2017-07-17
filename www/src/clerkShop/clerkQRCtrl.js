(function() {
    define(['app'],function(app){
        
        angular.module('app').controller('clerkQRCtrl', clerkQRCtrl);

        clerkQRCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading', '$localStorage', 'Popup', 'Service', '$stateParams', '$timeout'];

        function clerkQRCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $localStorage, Popup, Service, $stateParams, $timeout) {
            var vm = this;
            vm.masterInfo = $localStorage.userInfo;
            console.log($localStorage.userInfo)
            vm.lastStr = $localStorage.userInfo.storeLogo.split("/").pop();
            vm.default = vm.lastStr == "100000040logo.png" ? true : false;
            getVisitorInfo();

            //获取游客详细信息
            function getVisitorInfo() {
                vm.visitorCondition = { "masterId": $localStorage.userInfo.storeMasterId }
                Service.post('visitorServer', 'getHallMasterInfo', vm.visitorCondition).then(function(data) {
                    vm.data = data.dataInfo;
                    vm.storeInfoUrl = encodeURI(location.href.split('#')[0] + '#/counterGoodsList?storeId=' + $localStorage.userInfo.id + '&id=' + $localStorage.userInfo.storeMasterId + '&displayName=' + vm.data.displayName);

                });

            }
        }
    })
})()

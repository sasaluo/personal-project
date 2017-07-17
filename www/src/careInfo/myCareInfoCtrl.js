(function() {
    define(['app'],function(app){

        angular.module('app').controller('myCareInfoCtrl', myCareInfoCtrl);
        myCareInfoCtrl.$inject = ['$scope', '$state', 'Service', '$stateParams'];

        function myCareInfoCtrl($scope, $state, Service, $stateParams) {
        	var vm = this;

            Service.getJson('businessHandleing').then(function(data) {

                    vm.storeData = data;
                    console.log(data);
                })
            //查看营业厅柜台列表
            vm.goTostoreList = goTostoreList;

            //查看营业厅柜台列表
            function goTostoreList(storeName) {
                $state.go('bussinessList',{"storeName":storeName});
            }
        }
    })
})();

(function() {
  define(['app'],function(app){
    app.controller('businessStatesCtrl', businessStatesCtrl);
  
    businessStatesCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading', '$localStorage', 'Service'];

    function businessStatesCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $localStorage, Service) {

      var vm = this;
      vm.businessDisplay = businessDisplay; //点击切换办理状态
      vm.goPrev = goPrev; //返回上一级
      vm.doBusiness = doBusiness;

      vm.Status = 1;

      vm.paramters = {
        'token': $localStorage.userInfo.token,
        'storeId': $localStorage.userInfo.id,
        'type': 1
      }
      console.log(vm.paramters)
      Service.post('salesServer', 'getBroadbandBusinessList', vm.paramters).then(function(data) {
        console.log(data)
        if (data.returnCode == 1000) {
          vm.lists = data.pageData;
          console.log(vm.lists)
        }
      })

      function businessDisplay(Status) {
        vm.Status = Status;
        vm.paramters = {
          'token': $localStorage.userInfo.token,
          'storeId': $localStorage.userInfo.id,
          'type': Status
        }
        console.log(vm.paramters)
        Service.post('salesServer', 'getBroadbandBusinessList', vm.paramters).then(function(data) {
          console.log(data)
          if (data.returnCode == 1000) {
            vm.lists = data.pageData;
            console.log(vm.lists)
          }
        })
      }

      function goPrev() {
        $state.go('clerkIndex')
      }

      function doBusiness(orderNo){
        $state.go('doBusiness',{"orderNo":orderNo})
      }

    }
  })
})()
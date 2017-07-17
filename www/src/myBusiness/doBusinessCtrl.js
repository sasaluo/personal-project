(function() {
  define(['app'],function(app){
    app.controller('doBusinessCtrl', doBusinessCtrl);
  
    doBusinessCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading', '$localStorage', 'Service','$stateParams','$filter'];

    function doBusinessCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $localStorage, Service,$stateParams,$filter) {

      var vm = this;
      vm.goPrev = goPrev;//返回上一个
      vm.changeState = changeState;//选择状态
      vm.makeSure = makeSure;//确定
      vm.moreOption=false;
      vm.states=[];
      // vm.indexCode=1;
      vm.orderNo=$stateParams.orderNo;
      console.log(vm.orderNo)
      //获取预约信息
       getAppointmentInfo();

      // vm.states=[{'index':2,"name":"审核通过"},{'index':3,"name":"审核不通过"},{'index':4,"name":"结单"},{'index':5,"name":"取消"}]
      console.log(vm.states)

      function goPrev(){
        $state.go('businessStates')
      }
      
     
     function changeState(index){
      console.log(index)
      vm.stateName=$filter('filter')(vm.states,{'index':index})
      console.log(vm.stateName)

     }

     function getAppointmentInfo(){

      Service.post('salesServer', 'getReservationInfo',{"orderNo":vm.orderNo}).then(function(data) {
        console.log(data)
        vm.list = data.dataInfo;
        console.log(vm.list)
         vm.indexCode = data.dataInfo.reservationState;
         console.log(vm.indexCode)
         if(vm.indexCode==1){
          vm.moreOption = true;
          vm.states=[{'index':2,"name":"审核通过"},{'index':3,"name":"审核不通过"},{'index':4,"name":"结单"},{'index':5,"name":"取消"}]
         }
         else if(vm.indexCode==2){
          vm.moreOption = true;
          vm.states=[{'index':4,"name":"结单"},{'index':5,"name":"取消"}]
         }else{
          vm.moreOption =false
           vm.states=[];
         }


      })

     }

     function makeSure(){

      vm.paramters = {
        "orderNo":vm.orderNo,
        "orderStatus":vm.stateName[0].index
      }
      console.log(vm.paramters)

      Service.post('salesServer', 'saveReservationInfo',vm.paramters).then(function(data) {
            console.log(data)

        if(data.returnCode==1000){
              $state.go('businessStates')
        }


      })

     }

    }
  })
})()
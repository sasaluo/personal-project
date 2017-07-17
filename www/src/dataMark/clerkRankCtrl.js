(function() {
  define(['app'],function(app){
    angular.module('app').controller('clerkRankCtrl', clerkRankCtrl);
    
      clerkRankCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading','$localStorage','Service'];

      function clerkRankCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading,$localStorage,Service) {
      
        var vm =this;
        vm.decrease=true;//业务量默认降序
        vm.descShare=false;//分享量初始化

        vm.getRankData = getRankData;//获取排名信息
        vm.orderQuery = orderQuery;//业务量升序？降序
        vm.shareQuery = shareQuery;//分享量升序？降序
        vm.goPrev = goPrev;

        getRankData();

        function getRankData(query){
          vm.paramters = {
            'token':$localStorage.userInfo.token,
            'masterId':$localStorage.userInfo.storeMasterId,
            'identityId':1,
            'sortType':vm.sorts?vm.sorts:'DESC',
            'queryType':query?query:4 //4:业务量；2:分享量
          }
          console.log(vm.paramters)

          Service.post('salesServer', 'getSaleBoardList',vm.paramters).then(function(data) {              
                 console.log(data)
                 if(data.returnCode==1000){
                  vm.businessLists = data.dataInfo.storeSaleList;
                  console.log(vm.businessLists)
                 }              
          });  
        }

        function orderQuery(query){
          vm.decrease=!vm.decrease;
          console.log(vm.decrease);
          vm.sorts=vm.decrease?'DESC':'ASC'
          getRankData(query);
        }

        function shareQuery(query){
           vm.descShare=!vm.descShare;
          console.log(vm.descShare);
          vm.sorts=vm.descShare?'DESC':'ASC'
          getRankData(query);

        }

        function goPrev(){
          $state.go('saleRank')
        }


      }
  })
})()
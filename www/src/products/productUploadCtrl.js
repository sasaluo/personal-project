(function() {
  define(['app'],function(app){
    app.controller('productUploadCtrl', productUploadCtrl);
  
    productUploadCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading', '$localStorage', 'Service', '$stateParams'];

    function productUploadCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $localStorage, Service, $stateParams) {

      var vm = this;
      //点击切换已上架/未上架
      vm.getBrands = getBrands;
      vm.loadProduct = loadProduct; //上下架
      vm.goDetails = goDetails; //跳转至商品详情
      vm.goPrev = goPrev; //返回上一个界面
      vm.shareGoods = shareGoods; //分享商品
      vm.pageIndex = 1;
      vm.mark = 1;
      vm.loadMore = loadMore;
        vm.isUpLoad = [{
        'code': 1,
        'state': '已上架'
      }, {
        'code': 2,
        'state': '未上架'
      }];

      vm.paramters = {
        "pageSize": 5,
        "storeId": $localStorage.userInfo.id,
        "token": $localStorage.userInfo.token,
        "type": vm.mark,
        "pageNumber": 1

      }
      //进入页面获取已上架信息
      getProductList()

      function getBrands(type) {

        vm.mark = type ? type : 1;

        angular.extend(vm.paramters, {
          "type": vm.mark,
          "pageNumber": 1,
          "pageSize": 5,
        })
        getProductList()

      }

      function getProductList() {
        console.log(vm.paramters)
        Service.post('visitorServer', 'getBroadbandList', vm.paramters).then(function(data) {
          vm.datas = data.pageData;

          console.log(vm.datas)
          if (data.returnCode == 1000) {

            vm.tatalRecord = data.totalRecord;
            vm.singlePage = data.pageData;

            if (vm.paramters.pageNumber == 1) {
              vm.pageIndex = 1;
              vm.businessLists = [];

            }
            if (data.pageData) {
              vm.businessLists = vm.businessLists.concat(data.pageData);
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');

          }
        })
      }

      function loadMore(){
        vm.pageIndex++;

        angular.extend(vm.paramters, { "pageNumber": vm.pageIndex})
       
        getProductList()
      }



      function loadProduct(type, productId,index) {
        console.log(index)
       
        var action = type == 0 ? "上架" : "下架";
        console.log(action);
        var confirmPopup = $ionicPopup.confirm({
          title: '提示',
          template: '<div style="text-align:center;font-size:14px">是否' + action + '该商品？</div>',
          cancelText: '取消',
          okText: '确定'
        });

        vm.paramters = { //入参
          "storeId": $localStorage.userInfo.id,
          "broadId": productId,
          "type": type,
          "token": $localStorage.userInfo.token
        }
        console.log(vm.paramters)
        confirmPopup.then(function(res) {
          if (res) {
            Service.post('salesServer', 'addGoodsToStore', vm.paramters).then(function(data) {
              console.log(data)
              if (data.returnCode == 1000) {
                if (type == 0) {
                  vm.businessLists.splice(index,1)
                  if(vm.businessLists.length<5){
                      getBrands(2)
                   } 

                } else {

                  vm.businessLists.splice(index,1)

                   if(vm.businessLists.length<5){
                      getBrands(1)
                   }  
                   
                }
              }
            })
          } else {
            return false;
          }
        });
      }

      function goDetails(id) {
        $state.go('productDetail', {
          'broadbandId': id,
          "goBackType": 2
        })
      }

      function goPrev() {
        $state.go('clerkIndex')
      }


      function shareGoods(id) {
        vm.currentUrl = window.location.href;
        console.log($localStorage.userInfo.id)
        console.log(vm.currentUrl)
        vm.paramters = {
          'storeId': $localStorage.userInfo.id,
          'productId': id,
          'shareType': 3,
          'shareUrl': vm.currentUrl
        }
        console.log(vm.paramters)

        Service.post('salesServer', 'shareGoods', vm.paramters).then(function(data) {
          console.log(data)
          if (data.returnCode == 1000) {
            window.location.href = data.dataInfo.shareUrl
          }
        })
      }
    }
  })
})();
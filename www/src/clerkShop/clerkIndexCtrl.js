(function() {
    define(['app'],function(app){
      app.controller('clerkIndexCtrl', clerkIndexCtrl);
    
    

      clerkIndexCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading','$localStorage','Popup','Service'];

      function clerkIndexCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading,$localStorage,Popup,Service) {

          var vm = this;
          vm.shopInfo={//店铺信息
              "image":$localStorage.userInfo.storeLogo,
              "shopName":$localStorage.userInfo.storeName,
              "telPhone":$localStorage.userInfo.otherContacts,
              "weiXinNum":$localStorage.userInfo.weiXinNum,
          };
         vm.lastStr =  vm.shopInfo.image.split("/").pop();
         vm.default = vm.lastStr=="100000040logo.png"?true:false;

        //设置 
          vm.goToSetLoginInfo = goToSetLoginInfo;
        //店铺管理
          vm.goToProduct = goToProduct;
        //我的业务
          vm.goBusiness = goBusiness;
        //退出app
          vm.exitApp =exitApp;
        //店铺分享
          vm.shareMyStore = shareMyStore;

          function goToProduct(){//商品管理
              $state.go('productUpload',{'type':1})
          }

          function goToSetLoginInfo() {
              $state.go('setContent');
          }

          function goBusiness(){
               $state.go('businessStates');
          }

          function exitApp(){
              console.log(1)
              Popup.alertGoToLogin('确认退出');
          }

          function shareMyStore(){

            vm.currentUrl=window.location.href;
            vm.ipUrl =vm.currentUrl.split("#")[0];
            console.log(vm.ipUrl)

            vm.storeId = $localStorage.userInfo.id;
            vm.id = $localStorage.userInfo.storeMasterId;
    
            vm.urlLink =vm.ipUrl+"#/counterGoodsList?storeId="+vm.storeId+"%26id="+vm.id;
            console.log(vm.urlLink)
            vm.paramters={
              'storeId':$localStorage.userInfo.id,
              'productId':0,//无商品id传0
              'shareType':3,
              'shareUrl':vm.urlLink

            }
         
            
            Service.post('salesServer', 'shareGoods',vm.paramters).then(function(data) {
              console.log(data)
              if(data.returnCode==1000){
                window.location.href=data.dataInfo.shareUrl
              }
            })    
          }
      }
    })
})()

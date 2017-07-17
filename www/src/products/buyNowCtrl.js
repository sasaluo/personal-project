  (function() {
    define(['app'],function(app){
    
      app.controller('buyNowCtrl', buyNowCtrl);
      buyNowCtrl.$inject = ['$scope', '$state', 'Service', '$stateParams', '$ionicPopup', 'Popup', 'Cache', '$filter', '$localStorage'];

      function buyNowCtrl($scope, $state, Service, $stateParams, $ionicPopup, Popup, Cache, $filter, $localStorage) {
        var vm = this;
        vm.stateParam = angular.copy($stateParams);
        vm.item = {};

        $scope.$watch(function() {
          return vm.item.telephone;
        }, controlTeleNum);

        //立即预约
        vm.appointmentNow = appointmentNow;
        //购买成功-->返回柜员商品列表页面
        vm.goToCounterList = goToCounterList

        //获取上海市的所有区县
        Service.getJson('shanghai').then(function(data) {
            vm.shanghaiArea = data;
            console.log(vm.shanghaiArea);
          })
          //是否选择地区
        vm.chooseArea = chooseArea;
        //选择地区
        vm.selectArea = selectArea;


        //立即预约
        function appointmentNow() {

          var reg = /^[1][34578][0-9]{9}$/;

          if (!vm.item.name) {
            Popup.alert('请填写联系人姓名');
          } else if (!vm.item.telephone) {
            Popup.alert('请填写联系人手机号码');
          } else if (!reg.test(vm.item.telephone)) { //通过正则验证手机号码
            Popup.alert('联系人手机号错误');
          } else if (!vm.item.areaCode) {
            Popup.alert('请填写联系人所在区县');
          } else if (!vm.item.addressDetail) {
            Service.alert('请填写联系人详细地址');
          } else {
            vm.masterInfo = Cache.item;
            console.log(vm.masterInfo)
            vm.areaName = $filter('filter')(vm.shanghaiArea, {
              areacode: vm.item.areaCode
            });

            vm.bookingCondition = {
              "masterId": vm.masterInfo.id ? vm.masterInfo.id : $localStorage.userInfo.storeMasterId,
              "storeId": vm.masterInfo.storeId ? vm.masterInfo.storeId : $localStorage.userInfo.id,
              "broadId": vm.stateParam.broadbandId,
              "type": "2",
              "telephone": vm.item.telephone,
              "name": vm.item.name,
              "address": vm.item.addressDetail,
              "area": vm.areaName[0].areaname
            }
            console.log(vm.bookingCondition)
            Service.post('visitorServer', 'reservationInfo', vm.bookingCondition).then(function(data) {
              console.log(data);
              vm.successBuy = true;
            });
          }
        }
        //购买成功-->返回宽带详情页面
        function goToCounterList() {
          vm.successBuy = false;
          $state.go('productDetail', {
            "broadbandId": vm.stateParam.broadbandId,
            "goBackType": vm.stateParam.goBackType,
            "storeId":vm.masterInfo.storeId ? vm.masterInfo.storeId : $localStorage.userInfo.id,
            "id": vm.masterInfo.id ? vm.masterInfo.id : $localStorage.userInfo.storeMasterId
          });

        }
        //是否选择地区
        function chooseArea() {
          vm.isChoose = true;
        }
        //选择地区
        function selectArea(item) {
          console.log(item)
          vm.isChoose = false;

        }
        //控制电话号码的个数
        function controlTeleNum() {

          if (vm.item.telephone) {
            vm.telephoneNum = vm.item.telephone.toString().length;
            if (vm.telephoneNum == 11) {
              vm.CutTelephone = vm.item.telephone;
            }
            if (vm.telephoneNum > 11) {
              vm.item.telephone = vm.CutTelephone;
            }
          }


        }
      }
    })

  })();
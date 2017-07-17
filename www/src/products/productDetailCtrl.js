(function() {
    define(['app','jweixinParam'],function(app){
        app.controller('productDetailCtrl', productDetailCtrl);
        
        productDetailCtrl.$inject = ['$scope', '$state', 'Service', '$stateParams', 'Cache', '$localStorage'];

        function productDetailCtrl($scope, $state, Service, $stateParams, Cache, $localStorage) {
            var vm = this;
            vm.stateParam = angular.copy($stateParams);

            //获取宽带详情
            getBroadbandDetail();
            //立即预约
            vm.toBuyNow = toBuyNow;
            //返回宽带列表页面
            vm.counterGoodsList = counterGoodsList;
            //商品浏览量
            vm.goodsClick=goodsClick;

            goodsClick()
            //获取游客信息
            getUserInfo();
            //查看店铺
            vm.goToStore = goToStore;

            //获取宽带详情
            function getBroadbandDetail() {
                vm.conditionDetail = {
                    "broadId": vm.stateParam.broadbandId
                }
                Service.post('visitorServer', 'getBroadbandInfo', vm.conditionDetail).then(function(data) {
                    console.log(data)
                    vm.detailData = data.dataInfo;
                })
            }
            //立即预约
            function toBuyNow() {
                $state.go('buyNow', {
                    "broadbandId": vm.stateParam.broadbandId,
                    "goBackType": vm.stateParam.goBackType
                });
            }

            //兩個不同的入口都可以進行寬帶預約
            function counterGoodsList() {
                if (vm.stateParam.goBackType == 1) { //返回宽带列表页面,
                    $state.go('counterGoodsList', {
                        "id": Cache.item.id,
                        "storeId": Cache.item.storeId,
                        "hallId": Cache.item.hallId
                    });
                } else if (vm.stateParam.goBackType == 2) { //返回商品管理頁面
                    $state.go('productUpload', {
                        "type": 2
                    });
                }
            }


            //获取游客信息
            function getUserInfo() {
                //获取游客详细信息
                vm.visitorCondition = { "masterId": vm.stateParam.id ? vm.stateParam.id : $localStorage.userInfo.storeMasterId }
                Service.post('visitorServer', 'getHallMasterInfo', vm.visitorCondition).then(function(data) {
                    vm.displayName = data.dataInfo.displayName;
                });
            }


            //查看店铺
            function goToStore() {

                $state.go('counterGoodsList', { "storeId": vm.stateParam.storeId ? vm.stateParam.storeId : $localStorage.userInfo.id, "id": vm.stateParam.id ? vm.stateParam.id : $localStorage.userInfo.storeMasterId, "displayName": vm.displayName })
            };

            function goodsClick(){
                vm.condition={
                    'storeId':vm.stateParam.storeId,
                    'productId':vm.stateParam.broadbandId,
                    'masterId':0,
                    'shareId':0,
                    'click':1

                };

                Service.post('salesServer', 'saveGoodsClick', vm.condition).then(function(data){
                    console.log(data)
                })
            }

             

                    
            weixinShare.onMenuShareAppMessage({
                title: '上海移动营业厅', // 分享标题
                desc: '上海移动业务一键预约办理！', // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: 'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {               
                    goodsClick()                   
              
                },
                cancel: function () { }               
            });

            weixinShare.onMenuShareTimeline({
                title: '上海移动营业厅', // 分享标题
                link: window.location.href, // 分享链接
                imgUrl:'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
                success: function () { 
                    goodsClick()
                },
                cancel: function () {}
            });
          

        }
    })
})();

(function() {
    define(['app','jweixinParam'],function(app,jweixinParam){
         app.controller('counterGoodsListCtrl', counterGoodsListCtrl);
    
        // console.log(jweixinParam)
        counterGoodsListCtrl.$inject = ['$scope', '$state', 'Service', '$timeout', '$stateParams', 'Cache', '$ionicScrollDelegate'];

        function counterGoodsListCtrl($scope, $state, Service, $timeout, $stateParams, Cache, $ionicScrollDelegate) {
            var vm = this;
            vm.stateParam = angular.copy($stateParams);

            console.log(vm.stateParam)
            console.log(vm.stateParam.storeId)
            vm.counterInfo = angular.copy($stateParams)
                //isload是否分页，isLast是否为最后一个元素
            vm.pagingGoods = { "pageNumber": 1, "pageSize": 10, "isload": false }


            //根据storeId获取宽带列表
            getBroadbandList();
            //获取游客详细信息
            getVisitorInfo();
            //商品详情
            vm.toDetail = toDetail;
            //每一页最后一项
            vm.checkLast = checkLast;
            //分页
            vm.loadNext = loadNext;
            //返回柜员列表页
            vm.bussinessList = bussinessList;
            vm.lookMore = lookMore; //查看
            vm.packUp = packUp; //收起
            getStoreGoodsList(); //获取商品列表信息
            vm.goToDetail = goToDetail; //商品详情

            
            

            $scope.$on('$ionicView.beforeLeave', function(event, data) {
                vm.isLookMore = false;
            });

            //根据storeId获取宽带列表
            function getBroadbandList() {
                vm.broadbandCondition = { "storeId": vm.stateParam.storeId, "pageSize": 100, "pageNumber": 1, "type": 1 }
                console.log(vm.broadbandCondition)
                Service.post('visitorServer', 'getBroadbandList', vm.broadbandCondition).then(function(data) {
                    console.log(data)
                    vm.allStoreData = data.pageData;
                    console.log(vm.storeData)
                        //目前要求只显示前两条数据，其他数据隐藏
                    if (vm.allStoreData) {　
                        if (data.pageData.length <= 2) {
                            vm.storeData = data.pageData;
                        } else if (data.pageData.length > 2) {
                            vm.storeData = data.pageData.slice(0, 2);
                            vm.storeDataMore = data.pageData.slice(2);
                        }
                    }
                });

            }
            //获取游客详细信息
            function getVisitorInfo() {
                vm.visitorCondition = { "masterId": vm.stateParam.id }
                Service.post('visitorServer', 'getHallMasterInfo', vm.visitorCondition).then(function(data) {
                    vm.masterInfo = data.dataInfo;
                    vm.displayName = data.dataInfo.displayName;
                    vm.logoArr = vm.masterInfo.logo.split('/').pop();
                    console.log(vm.logoArr)

                    vm.default = vm.logoArr == "100000040logo.png" ? true : false;
                    console.log(vm.default)
                    vm.masterInfo.hallId = data.dataInfo.orgId;
                    console.log(vm.masterInfo.hallId)
                    Cache.saveCacheData(data.dataInfo);
                    console.log('游客信息');
                    console.log(data);
                });
            }
            //商品详情
            function toDetail(item) {
                $state.go('productDetail', { "broadbandId": item.id, "hallId": vm.stateParam.hallId, "goBackType": 1, "storeId": vm.stateParam.storeId, "id": vm.stateParam.id,"viewTitle":item.broadBandName});
            }
            //是否是每页的最后一项
            function checkLast(index) {
                if (index) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    if (vm.pagingGoods.pageNumber >= 1 && 　!vm.pagingGoods.checkLast) {
                        vm.pagingGoods.isload = true;
                    }
                }
            }

            //返回柜员列表页
            function bussinessList() {
                console.log(Cache.item.hallId);
                $state.go('bussinessList', { "id": vm.masterInfo.hallId });
            }

            //查看更多
            function lookMore() {
                vm.isLookMore = true;
            }

            //收起
            function packUp() {
                vm.isLookMore = false;
                setTimeout(function() {
                    $ionicScrollDelegate.$getByHandle('listAll').scrollTop(true);
                }, 100);

            }

            //获取商品列表
            function getStoreGoodsList() {
                vm.listCondition = {
                    'categoryId': 0,
                    'storeId': vm.stateParam.storeId,
                    'pageNumber': vm.pagingGoods.pageNumber,
                    'sort': 2,
                    'pageSize': vm.pagingGoods.pageSize,
                    'sequence': 0,
                    'brandId': 0
                }
                Service.post('goodsServer', 'getStoreGoodsList', vm.listCondition).then(function(data) {
                    vm.goodsList = data.pageData;

                    console.log(vm.goodsList)
                });
            }

            //下拉翻页
            function loadNext() {
                vm.pagingGoods.pageNumber += 1;
                angular.extend(vm.listCondition, { "pageNumber": vm.pagingGoods.pageNumber })
                if (vm.pagingGoods.isload) {
                    Service.post('goodsServer', 'getStoreGoodsList', vm.listCondition).then(function(data) {
                        //所有数据加载完成，不在触发分页事件
                        if (!data.pageData) {
                            vm.pagingGoods.isload = false;
                            vm.pagingGoods.checkLast = true;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        } else {
                            console.log('分页' + vm.pagingGoods.pageNumber);
                            vm.goodsList = vm.goodsList.concat(data.pageData);
                        }
                    });
                }
            };
            //跳转至商品详情页面
            function goToDetail(jumpUrl) {
                window.open(jumpUrl);
            };

            function saveShareDatas(){
                vm.condition={
                    'storeId':vm.stateParam.storeId,
                    'productId':0,
                    'masterId':0,
                    'shareType':3,
                    'shareUrl':window.location.href
                };
                Service.post('salesServer', 'saveShare', vm.condition).then(function(data) {
                   
                    if(data.returnCode==1000){

                    }
                }) 
            };

            weixinShare.onMenuShareAppMessage({
                title: '上海移动营业厅', // 分享标题
                desc: '上海移动业务一键预约办理！', // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: 'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {               
                    saveShareDatas()                   
              
                },
                cancel: function () { }               
            });
            weixinShare.onMenuShareTimeline({
                title: '上海移动营业厅', // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: 'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
                success: function () { 
                    saveShareDatas()
                },
                cancel: function () {}
            });


            // wx.ready(function(){           
            //     wx.onMenuShareAppMessage({
            //         title: '上海移动营业厅', // 分享标题
            //         desc: '上海移动业务一键预约办理！', // 分享描述
            //         link: window.location.href, // 分享链接
            //         imgUrl: 'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
            //         type: '', // 分享类型,music、video或link，不填默认为link
            //         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            //         success: function () {               
            //             saveShareDatas()                   
                  
            //         },
            //         cancel: function () { }               
            //     });

            //     wx.onMenuShareTimeline({
            //         title: '上海移动营业厅', // 分享标题
            //         link: window.location.href, // 分享链接
            //         imgUrl: 'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
            //         success: function () { 
            //             saveShareDatas()
            //         },
            //         cancel: function () {}
            //     });
            // })
        }
    })    
})();
 
 


 

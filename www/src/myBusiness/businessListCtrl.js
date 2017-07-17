(function() {
    define(['app'],function(app){
    
        app.controller('businessListCtrl', businessListCtrl);
        businessListCtrl.$inject = ['$scope', '$state', 'Service', '$stateParams'];

        function businessListCtrl($scope, $state, Service, $stateParams) {
            var vm = this;
            vm.stateParam = angular.copy($stateParams);
            console.log(vm.stateParam)
            vm.paging = { "pageSize": 10, "pageNumber": 1 }

            //根据营业厅ID获取营业员列表
            getCounterListById();
            //柜员所持商品列表
            vm.goToGoodsList = goToGoodsList;
            //每一页最后一项
            vm.checkLast = checkLast;
            //分页
            vm.loadNext = loadNext;
            //返回营业厅列表
            vm.goToBusinssHanding = goToBusinssHanding;

            //根据营业厅ID获取营业员列表
            function getCounterListById() {
                vm.conditionList = { "hallId": vm.stateParam.id, "pageSize": vm.paging.pageSize, "pageNumber": vm.paging.pageNumber }
                Service.post('visitorServer', 'getHallMasterList', vm.conditionList).then(function(data) {
                    vm.bussinessListData = data.pageData;
                    console.log(vm.bussinessListData)

                });
            }

            function goToGoodsList(index, item,status) {
                console.log(status)
                if(status==2){
                    return false;
                }else{
                  $state.go('counterGoodsList', { "id": item.id, "storeId": item.storeId, "hallId": vm.stateParam.id, "displayName": item.displayName });  
                }
                
            }
            //是否是每页的最后一项
            function checkLast(index) {
                if (index) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    if (vm.paging.pageNumber >= 1 && 　!vm.paging.checkLast) {
                        vm.paging.isload = true;
                    }
                }
            }
            //下拉翻页
            function loadNext() {
                vm.paging.pageNumber += 1;
                angular.extend(vm.conditionList, { "pageNumber": vm.paging.pageNumber })
                if (vm.paging.isload) {
                    Service.post('visitorServer', 'getHallMasterList', vm.conditionList).then(function(data) {
                        //所有数据加载完成，不在触发分页事件
                        console.log(data.pageData);
                        if (!data.pageData) {
                            vm.paging.isload = false;
                            vm.paging.checkLast = true;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        } else {
                            console.log('分页' + vm.paging.pageNumber);
                            vm.bussinessListData = vm.bussinessListData.concat(data.pageData);
                        }
                    });
                }

            }
            //返回营业厅列表
            function goToBusinssHanding() {
                $state.go('businessHandling');
            }

        }
    })
})();

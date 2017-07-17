(function(){

    define(['app'],function(app){
        app.controller('businessHandlingCtrl',businessHandlingCtrl);
        businessHandlingCtrl.$inject = ['$scope', '$state', 'Service','$localStorage'];
        function businessHandlingCtrl($scope, $state, Service,$localStorage) {
            var vm = this;
            vm.showHall=false;
            vm.toggleHall=toggleHall;

            delete $localStorage.userInfo;
            //查看游客营业厅列表
            CheckStoreList();
            //查看营业厅柜台列表
            vm.goTostoreList = goTostoreList;



            //查看游客营业厅列表
            function CheckStoreList() {
                Service.post('visitorServer', 'getBusinessHallList').then(function(data) {
                    // vm.storeData = data.pageData
                    console.log(data);
                    if(data.pageData.length>0){
                        var compiledData=[];
                         for(var i=0;i<data.pageData.length;i++){
                            var isrepeat=false;
                            var brandLists={
                                area:'',
                                status:'',
                                halls:[{
                                    id:'',
                                    name:''
                                }]
                            };
                            for(var j=0;j<compiledData.length;j++){
                                if(compiledData[j].area==data.pageData[i].areaName){
                                    var halls={};
                                    halls.id=data.pageData[i].id;
                                    halls.name=data.pageData[i].name;
                                    
                                    compiledData[j].halls.push(halls)
                                   isrepeat=true
                                }
                            } 


                           if(!isrepeat){
                                brandLists.area=data.pageData[i].areaName;
                                brandLists.status=data.pageData[i].storeStatus;
                                brandLists.halls[0].id=data.pageData[i].id;
                                brandLists.halls[0].name=data.pageData[i].name;

                                compiledData.push(brandLists)
                                console.log(compiledData)
                           }
                         }
                         console.log(compiledData)
                         vm.storeData=compiledData;
                    }
                });
            }
            //查看营业厅柜台列表
            function goTostoreList(id,name) {
                $state.go('businessList', { "id": id,"storeName":name });
            };

            function toggleHall(index){
                vm.arrowIndex=index
                vm.showHall=!vm.showHall;
                console.log(vm.showHall)
                console.log(vm.arrowIndex)
            }
        }
    })
})();

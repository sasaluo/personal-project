(function() {
    define(['app'],function(app){
        app.controller('setStoreCtrl', setStoreCtrl);
    
        setStoreCtrl.$inject = ['$http', '$scope', '$state', 'Service', '$stateParams', '$localStorage', '$ionicActionSheet', '$timeout', 'Upload'];

        function setStoreCtrl($http, $scope, $state, Service, $stateParams, $localStorage, $ionicActionSheet, $timeout, Upload) {
            var vm = this;
            var imgBoxes = document.getElementById("uploadImg");
            vm.progerssing=false;

            //获取店铺信息
            getStoreInfo();
            //是否显示手机号码
            vm.switchShowTel = switchShowTel;
            //提交店铺信息
            vm.submitStoreInfo = submitStoreInfo;
            //上传单个文件
            vm.uploadFiles = uploadFiles;
            vm.chooseMethod = chooseMethod; //选择方式

            vm.goPrev = goPrev;

            function goPrev() {
                $state.go('setContent')
            }

            function switchShowTel() {
                vm.isShowTel = vm.isShowTel == 1 ? 0 : 1;
                console.log(vm.isShowTel)
            }
            //获取店铺信息
            function getStoreInfo() {
                Service.post('salesServer', 'findOne').then(function(data) {
                    console.log(data);
                    vm.storeInfo = data.dataInfo;
                    vm.editStore = {
                        "storeName": vm.storeInfo.storeName,
                        "weixinNum": vm.storeInfo.weiXinNum,
                        "telephone": parseInt(vm.storeInfo.otherContacts)
                    }
                    vm.imgLogo = vm.storeInfo.storeLogo;
                    vm.isShowTel = vm.storeInfo.isShowPhoneNo;

                    console.log(vm.imgLogo);
                });
            }
            //提交店铺信息
            function submitStoreInfo() {
                vm.conditionSubmit = {
                    "storeName": vm.editStore.storeName,
                    "weixinNum": vm.editStore.weixinNum?vm.editStore.weixinNum:'',
                    "otherContacts": vm.editStore.telephone,
                    "isShowPhoneNo": vm.isShowTel == false ? 0 : 1,
                    "themeId": 0,
                    "storeLogo": vm.path ? vm.path : vm.imgLogo
                }
                console.log(vm.conditionSubmit)
                Service.post('salesServer', 'editStore', vm.conditionSubmit).then(function(data) {
                    console.log(data)
                    if (data.returnCode == 1000) {
                        angular.extend($localStorage.userInfo, {
                            "storeLogo": data.dataInfo.storeLogo,
                            "storeName": data.dataInfo.storeName,
                            "otherContacts": data.dataInfo.otherContacts,
                            "weiXinNum": data.dataInfo.weiXinNum
                        });

                        $state.go('clerkIndex');
                    }

                });
            }


            function chooseMethod() {  

                var hideSheet = $ionicActionSheet.show({
                    buttons: [{
                        text: '<b>选择本地图库图片</b>'
                    }],
                    titleText: '上传图片',
                    cancelText: '取消',
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0: 
                            $timeout(function(){

                                document.getElementById("uploadImg").click(); 

                            },0,false)                                                        
                                break;       
                        }
                        return true;
                    }
                });

                $timeout(function() {
                    hideSheet();
                }, 2000);
            };



            function uploadFiles(file) {
                console.log(file.size)
                if(parseInt(file.size)>2147483648){
                    showAlert('图片过大，请重新上传')
                    return false;
                }
                
                console.log(file)
                vm.progerssing=true;

                Upload.upload({
                    // url: 'http://218.17.39.178:7070/common/VPFileUpload.ashx',
                    url:'http://yytcloud.vpclub.cn/common/VPFileUpload.ashx',
                    data: {
                        action: 'UpLoadImage',
                        appid: '100000040',
                        from: 'client',
                        bodyType: 'raw',
                        imgtype: 10,
                        isSmall: 1
                    },
                    file: file,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function(data) {
                    console.log(data.data);
                    if (data.data.status === 1) {
                        vm.path = data.data.path;
                        vm.imgLogo = data.data.aliRoot + data.data.path;
                        vm.percentage=null;
                        vm.progerssing=false;
                         

                    } else {
                        Service.showAlert(data.data.msg)

                    }
                }, function() {}, function(evt) {
                    var progressPercentage = parseInt(100 * evt.loaded / evt.total);
                    vm.percentage=progressPercentage+'%';
                    document.querySelector('#bars').style.width=0.6*progressPercentage+'px';
                    
                });

            }
        }
    })
})();
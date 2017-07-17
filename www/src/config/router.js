(function(){

    define(['app'],function(app){
        console.log(app)
        app.config(config);

        config.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider','components'];
        
        function config($stateProvider, $urlRouterProvider, $ionicConfigProvider,components) {

            //定义android中tab的位置
            $ionicConfigProvider.platform.android.tabs.style('standard');
            $ionicConfigProvider.platform.android.tabs.position('bottom');
            //定义android中navbar标题的位置
            $ionicConfigProvider.platform.android.navBar.alignTitle('center');
            //返回按钮上的文本
            $ionicConfigProvider.backButton.text('返回');
            $ionicConfigProvider.backButton.previousTitleText(false);

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js

            var loadedComponentList=[];

            $stateProvider
                //业务办理
                .state('businessHandling', {
                    cache: false,
                    url: '/businessHandling',
                    templateUrl: 'src/myBusiness/businessHandling.html',
                    controller: 'businessHandlingCtrl as businessHandling',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'businessHandling')
                        }]
                    }
                })
                //柜台业务列表
                .state('businessList', {
                    url: '/businessList?id&hallId&storeName',
                    templateUrl: 'src/myBusiness/businessList.html',
                    controller: 'businessListCtrl as bussinessList',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'businessList')
                        }]
                    }
                })
                //我的关注
                .state('myCareInfo', {
                    url: '/myCareInfo',
                    templateUrl: 'src/careInfo/myCareInfo.html',
                    controller: 'myCareInfoCtrl as myCareInfo',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'myCareInfo')
                        }]
                    }
                })
                //设置
                .state('setContent', {
                    url: '/setContent',
                    templateUrl: 'src/setInfo/setContent.html',
                    controller: 'setContentCtrl as setContent',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'setContent')
                        }]
                    }
                })
                //修改密码
                .state('changePassword', {
                    cache: false,
                    url: '/changePassword',
                    templateUrl: 'src/setInfo/changePassword.html',
                    controller: 'changePasswordCtrl as changePassword',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'changePassword')
                        }]
                    }
                })
                //编辑店铺
                .state('setStore', {
                    cache: false,
                    url: '/setStore',
                    templateUrl: 'src/setInfo/setStore.html',
                    controller: 'setStoreCtrl as setStore',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'setStore')
                        }]
                    }
                })

                //柜员商品列表
                .state('counterGoodsList', {
                    cache: false,
                    url: '/counterGoodsList?storeId&id&displayName',
                    templateUrl: 'src/counter/counterGoodsList.html',
                    controller: 'counterGoodsListCtrl as counterGoodsList',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'counterGoodsList')
                        }]
                    }
                })
                //商品详情
                .state('productDetail', {
                    url: '/productDetail?broadbandId&goBackType&storeId&id&viewTitle',
                    templateUrl: 'src/products/productDetail.html',
                    controller: 'productDetailCtrl as productDetail',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'productDetail')
                        }]
                    }
                })
                //立即预约
                .state('buyNow', {
                    cache: false,
                    url: '/buyNow?broadbandId&goBackType',
                    templateUrl: 'src/products/buyNow.html',
                    controller: 'buyNowCtrl as buyNow',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'buyNow')
                        }]
                    }
                })
                .state('clerkLogin', { //营业员登录
                    cache: false,
                    url: '/clerkLogin',
                    templateUrl: 'src/login/clerkLogin.html',
                    controller: 'clerkLoginCtrl as clerkLogin',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'clerkLogin')
                        }]
                    }
                })
                .state('getVerifyCode', { //获取验证码
                    url: '/getVerifyCode',
                    templateUrl: 'src/login/getVerifyCode.html',
                    controller: 'getVerifyCodeCtrl as ',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'getVerifyCode')
                        }]
                    }
                })
                .state('newPassWord', { //忘记密码
                    url: '/newPassWord?phoneNumber&&smsCode',
                    templateUrl: 'src/login/newPassWord.html',
                    controller: 'newPassWordCtrl as newPassWord',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'newPassWord')
                        }]
                    }
                })
                .state('clerkIndex', { //我的店铺
                    cache: false,
                    url: '/clerkIndex',
                    templateUrl: 'src/clerkShop/clerkIndex.html',
                    controller: 'clerkIndexCtrl as clerkIndex',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'clerkIndex')
                        }]
                    }
                })
                .state('productUpload', { //商品管理
                    cache: false,
                    url: '/productUpload?type',
                    templateUrl: 'src/products/productUpload.html',
                    controller: 'productUploadCtrl as productUpload',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'productUpload')
                        }]
                    }
                })
                .state('saleRank', { //销售排名
                    url: '/saleRank',
                    templateUrl: 'src/dataMark/saleRank.html',
                    controller: 'saleRankCtrl as saleRank',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'saleRank')
                        }]
                    }
                })
                .state('businessStates', { //我的业务
                    cache: false,
                    url: '/businessStates',
                    templateUrl: 'src/myBusiness/businessStates.html',
                    controller: 'businessStatesCtrl as businessStates',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'businessStates')
                        }]
                    }
                })
                .state('clerkRank', { //营业员排名
                    url: '/clerkRank',
                    templateUrl: 'src/dataMark/clerkRank.html',
                    controller: 'clerkRankCtrl as clerkRank',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'clerkRank')
                        }]
                    }
                })
                .state('dailySale', { //每日销售
                    url: '/dailySale',
                    templateUrl: 'src/dataMark/dailySale.html',
                    controller: 'dailySaleCtrl as dailySale',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'dailySale')
                        }]
                    }
                })
                .state('dailyShare', { //每日分享
                    url: '/dailyShare',
                    templateUrl: 'src/dataMark/dailyShare.html',
                    controller: 'dailyShareCtrl as dailyShare',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'dailyShare')
                        }]
                    }
                })
                .state('clerkQR', { //每日分享
                    url: '/clerkQR',
                    templateUrl: 'src/clerkShop/clerkQR.html',
                    controller: 'clerkQRCtrl as clerkQR',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'clerkQR')
                        }]
                    }
                })

                .state('doBusiness', { //业务办理
                    cache: false,
                    url: '/doBusiness?orderNo',
                    templateUrl: 'src/myBusiness/doBusiness.html',
                    controller: 'doBusinessCtrl as doBusiness',
                    resolve:{
                        load:['$q','$rootScope',function($q,$rootScope){
                            return loadComponent($q,$rootScope,'doBusiness')
                        }]
                    }
                });


            $urlRouterProvider.otherwise('/businessHandling');

        
            function loadComponent($q,$rootScope,name){
                var deferred=$q.defer();
                if(loadedComponentList.indexOf(name)>=0){
                    deferred.resolve('Require Components Finished')
                }else{
                    require(components[name],function(){
                        $rootScope.$apply(function(){
                            loadedComponentList.push(name);
                             deferred.resolve('Require Components Finished')
                        })
                    })
                }
                console.log(loadedComponentList)
                return deferred.promise;
            }
        }
    })
})()










 
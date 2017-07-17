 (function() {
    //factory方法是创建和配置服务的最快捷方式

    define(['app'],function(app){
        app.factory('Service',Service);

        Service.$inject = ['$http', '$q', '$filter',  'backend', 'backendInterface', '$localStorage', '$timeout', '$ionicPopup', '$rootScope', '$state', '$ionicLoading','Upload','Popup']; //注入
        function Service($http, $q, $filter, backend, backendInterface, $localStorage, $timeout, $ionicPopup, $rootScope, $state, $ionicLoading,Upload,Popup) {
             //文件上传预设配置
            Upload.setDefaults({
                ngfAccept: "'.jpg,.png,.gif,.jpeg'",
                ngfDropDisabled: 'true',
                ngfPattern: '.jpg,.png,.gif,.jpeg',
                ngfMaxSize: '2MB'
            });

            //防止Service重复呼叫
            var servicePostCount = {};
            var factory = {
                getJson: getJson, //获取本地json
                post: post, //向服务器请求数据
                upload: upload, //上传文件
                showAlert: showAlert, //提示框
                propShow: propShow,//弹框

            };
            return factory;
            // 获取本地json
            function getJson(name, folder) {

                var defered = $q.defer();

                $http.get('src/json/' + (folder || '') + name + '.json').success(function(data) {
                    defered.resolve(data);
                });

                return defered.promise;
            }


            //获取Java后台服务接口
            function post(ctrl, name, param) {
                var deferred = $q.defer(),
                    interfaceName = ctrl + '/' + name;

                //同一个接口是否重复操作
                if (servicePostCount[interfaceName]) {
                    console.log('Repeat Service Action, servicePostCount[' + interfaceName + ']: ' + servicePostCount[interfaceName]);
                    deferred.reject('Repeat Service Action');
                } else {
                    //接口入参，后台服务
                    var inParams = angular.copy(param || {}),
                        backendDetail = {};

                    //表示该接口正在调用
                    servicePostCount[interfaceName] = 'posting';
                    //显示loading样式
                    // $ionicLoading.show();
                    //合并必传参数
                    angular.extend(inParams, { appKey: backend.appkey, token: $localStorage.userInfo ? $localStorage.userInfo.token :undefined });

                    //获取服务名
                    angular.forEach(backendInterface, function(item, i) {
                        backendDetail = item.interfaces.indexOf(interfaceName) >= 0 ? item : backendDetail;
                    });

                    $http({
                        method: 'POST',
                        url: backend.url + ':' + backendDetail.port + '/' + backend.name + '/' + backendDetail.service + '/' + interfaceName,
                        data: JSON.stringify(inParams),
                        headers: { 'Content-Type': 'application/json' }
                    }).then(function(data) {
                        //service返回数据
                        var result = data.data;
                        // console.log(result);

                        //200代表接口调用成功
                        if (data.status === 200) {
                            if (result && backend.errorCodes.indexOf(result.returnCode) >= 0) { //数据库返回错误信息
                                errorHandle(interfaceName, result.message);
                                deferred.reject('Error Services');
                            } else {
                                //成功返回数据
                                servicePostCount[interfaceName] = undefined;
                                $ionicLoading.hide();
                                deferred.resolve(result);
                            }
                        } else {
                            errorHandle(interfaceName, '网络连接错误，请重试');
                            deferred.reject('Error Services');
                        }
                    }, function(data) {
                        errorHandle(interfaceName, '网络连接错误，请重试');
                        deferred.reject('Error Services');
                    });
                }

                return deferred.promise;
            }

            //错误处理
            function errorHandle(name, errorMessage) {
                servicePostCount[name] = undefined;
                Popup.alert(errorMessage);
                $ionicLoading.hide();
            }

            //上传文件
            function upload(ctrl, name, param) {
                var deferred = $q.defer(),
                    interfaceName = ctrl + '/' + name;
                var inParams = angular.copy(param || {}),
                     backendDetail = {};
                   //显示loading样式
                    // $ionicLoading.show();
                    //合并必传参数
                    angular.extend(inParams, { appKey: backend.appkey, token: $localStorage.userInfo ? $localStorage.userInfo.token : undefined });

                    //获取服务名
                    angular.forEach(backendInterface, function(item, i) {
                        backendDetail = item.interfaces.indexOf(interfaceName) >= 0 ? item : backendDetail;
                    });

                //上传文件到服务器
                Upload.upload({
                    // url: backend.url + ':' + backendDetail.port + '/' + backend.name + '/' + backendDetail.service + '/' + interfaceName,
                    url:'http://218.17.39.178:7070/common/VPFileUpload.ashx',
                    data:{ action: 'UpLoadImage', appid: 'UpLoadImage', form: 'client' },
                    
                }).then(function(data) {
                    //service返回数据
                    var result = data.data;
                    console.log(data)
                    //200代表接口调用成功
                    if (data.status === 200) {
                        //数据库返回错误信息
                        // if (!result.dataInfo) {
                        if (!result) {
                            deferred.reject('Error Image');
                            propShow('图片上传失败,请检查图片属性');
                           
                        } 
                        else 
                        {
                            deferred.resolve(result);
                        }
                    } 
                    else 
                    {
                        deferred.reject('Error Services');
                        propShow('提交操作失败,错误状态码：'+data.status);
                       
                    }
                }, function(error) {
                    deferred.reject('Error Services');
                    // propShow('提交操作失败,错误状态码：'+data.status);
                    console.log(error)
                },function(evt){
                    var progress = parseInt(100*evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' )
                    defered.notify(progress);

                });

                return deferred.promise;
            }
            //弹框
            function showAlert(item) {
                var alertPopup = $ionicPopup.alert({
                    template: item,
                    okText: '确认'
                });
                //成功后调用then方法
                alertPopup.then(function(res) {
                    console.log(item);
                });
            }

            function propShow(title) {
                var myPopup = $ionicPopup.show({
                    template: title,
                    buttons: [{ text: '关闭' }]
                })
                $timeout(function() {
                    myPopup.close();
                }, 2000);
            };        
            
        }
    })

    
})();

(function() {
    define(['app'],function(app){
        app.factory('Popup', Popup);
    
    
        Popup.$inject = ['$ionicPopup', '$state','$localStorage'];

        function Popup($ionicPopup, $state,$localStorage) {

            var factory = {
                //显示弹窗
                alert: alert,
                //确认框
                alertGoToLogin: alertGoToLogin

            };
            return factory;

            //显示弹窗
            function alert(message, okText, okType) {
                var alertPopup = $ionicPopup.alert({
                    title: '<strong>提示</strong>',
                    template: '<div class="text-center">' + message + '</div>',
                    okText: okText || '确定',
                    okType: 'button-' + (okType || 'assertive')
                });
                return alertPopup;
            }


            //未注册用户进入登录页面
            function alertGoToLogin(item) {
                var isLogin = "";
                var confirmPopup = $ionicPopup.confirm({
                    title:'<h2 class="popupH2">提示</h2>',
                    template: '<div class="text-center popupBody">' + item + '</div>',
                    buttons: [{
                         text: '取消',
                         type: 'button-stable',
                        onTap: function() {
                            isLogin = false;
                        }

                    }, {
                        text: '确定',
                        type: 'button-assertive',
                        onTap: function() {
                            isLogin = true;
                        }
                    }]

                });
                confirmPopup.then(function() {

                    if (isLogin) {
                        $localStorage.userInfo="";//清空缓存
                        // $state.go('login');
                        $state.go('businessHandling')
                    } else {
                        console.log('cancel to login again');
                    }
                });
            }

        }
    })
})();

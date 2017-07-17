(function() {
    define(['app'],function(app){
         app.controller('changePasswordCtrl', changePasswordCtrl);
   
        changePasswordCtrl.$inject = ['$scope', '$state', 'Service', '$stateParams'];

        function changePasswordCtrl($scope, $state, Service, $stateParams) {
            var vm = this;
            vm.item = {};
            vm.item.oldPwd = '';
            vm.item.newPwd = '';

            //提交更改密码信息
            vm.submitPwd = submitPwd;

            vm.goPrev = goPrev;

            //监控两次输入密码
            $scope.$watch(function() {
                return vm.item.newPwd;
            }, comparePassWord);
            $scope.$watch(function() {
                return vm.item.newPwdAgain;
            }, comparePassWord);
            $scope.$watch(function() {
                return vm.item.oldPwd;
            }, comparePassWord);

            //提交更改密码信息
            function submitPwd() {
                vm.condition = {
                    "oldPwd": vm.item.oldPwd,
                    "newPwd": vm.item.newPwdAgain
                }
                Service.post('storeServer', 'changePwd', vm.condition).then(function(data) {
                    $state.go('clerkLogin');
                });
            }
            //比较两次输入密码是否一致
            function comparePassWord() {


                if (vm.item.newPwd) {
                    var regNum = /^^\d+$/; //验证数字
                    var regStr = /^[a-zA-z]+$/; //验证字母

                    vm.isNumber = regNum.test(vm.item.newPwd);
                    vm.isStr = regStr.test(vm.item.newPwd);
                    vm.isPswWrong = (vm.isNumber || vm.isStr);
                    console.log(vm.isPswWrong);


                    if (vm.item.newPwd.length == 16) {

                        vm.endPwd = vm.item.newPwd;
                        console.log(vm.endPwd)
                    } else if (vm.item.newPwd.length > 16) {
                        console.log(vm.item.newPwd.length)
                        vm.item.newPwd = vm.endPwd;
                    }
                }

                if (vm.item.newPwdAgain) {
                    if (vm.item.newPwdAgain.length == 16) {
                        vm.endPwdAgain = vm.item.newPwdAgain;
                        console.log(vm.endPwdAgain)
                    } else if (vm.item.newPwdAgain.length > 16) {
                        console.log(vm.item.newPwd.length)
                        vm.item.newPwdAgain = vm.endPwdAgain;
                    }

                }

                vm.isSame = (!vm.item.newPwd || !vm.item.newPwdAgain || vm.item.newPwd == vm.item.newPwdAgain);
                vm.formCheck.newPwdAgain.$setValidity('isSame', vm.isSame);
            }

            function goPrev() {

                $state.go('setContent')
            }

        }
    })
})();
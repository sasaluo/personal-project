(function() {
    define(['app'],function(app){
        app.service('Cache', Cache);
        
        Cache.$inject = ['$localStorage', '$state', '$http'];

        function Cache($localStorage, $state, $http) {
            var vm = this;
            vm.item = {};
            //存储临时数据
            vm.saveCacheData = saveCacheData;

            function saveCacheData(item) {
                vm.item = item;
                console.log(vm.item);
            }
        }
    })
})();

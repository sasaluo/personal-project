(function() {
    angular.module('app').filter('limitNum', limitNum);
    function limitNum() {
        return cutNumber;
        function cutNumber(number, max) {
            if (!number) {
                return '';
            };
            max = parseInt(max, 10);
            if (number.length > max) {
                number = number.substr(0, max);

            }
            return number;
        }

    }

})();

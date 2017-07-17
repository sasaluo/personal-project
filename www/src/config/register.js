(function() {
    define(['app'], function(app) {
        app.config(config);
        config.$inject = ['$filterProvider', '$compileProvider', '$controllerProvider', '$provide'];

        function config($filterProvider, $compileProvider, $controllerProvider, $provide) {
            //保存旧有引用
            app.previous = {
                constant: app.constant,
                controller: app.controller,
                provider: app.provider,
                factory: app.factory,
                service: app.service,
                value: app.value,
                decorator: app.decorator,
                directive: app.directive,
                filter: app.filter
            };

            //注册provider
            app.provider = $provide.provider;
            //注册controller
            app.controller = $controllerProvider.register;
            //注册factory
            app.factory = $provide.factory;
            //注册service
            app.service = $provide.service;
            //注册constant
            app.constant = $provide.constant;
            //注册value
            app.value = $provide.value;
            //注册directive
            app.directive = $compileProvider.directive;
            //注册filter
            app.filter = $filterProvider.register;
            //注册decorator
            app.decorator = $provide.decorator;
        }
    });
})();
define(function(){

	var requireConstatnt={
		paths:{
			'angular':'../lib/angular/angular.min',
			'angular-qrcode':'../lib/angular-qrcode/angular-qrcode',
			'angular-ui-router':'../lib/angular-ui-router/release/angular-ui-router.min',
			'angular-animate':'../lib/angular-animate/angular-animate.min',
			'angular-sanitize':'../lib/angular-sanitize/angular-sanitize.min',
			'ng-file-upload':'../lib/ng-file-upload/ng-file-upload.min',
			'ngStorage':'../lib/ngstorage/ngStorage.min',
			'domReady':'../lib/domReady/domReady',
			'ionic':'../lib/ionic/js/ionic.bundle.min',
			'ionic-angular':'../lib/ionic/js/ionic-angular.min',
			'echarts':'../thirdPartPlugs/echarts',
			'QRCode':'../thirdPartPlugs/QRCode',
			'jweixinParam':'http://wx.zn007.com/api/weixinbase/get?id=1007',//配置参数
			'weixinConfig':'services/weixinConfig'//微信config配置文件
		},
		shim:{
			'echarts':{exports:'echarts'},
			'QRCode':{exports:'QRCode'},
			'angular':{exports:'angular'},
			'jweixinParam':['weixinConfig'],//引入文件的依赖关系，jweixinParam对应的文件需在weixinConfig对应文件引入后再引入
			'angular-qrcode':['angular'],
			'angular-ui-router':['angular'],
			'ng-file-upload':['angular'],
			'ngStorage':['angular'],
			'angular-animate':['angular'],
			'ionic':{exports:'ionic'},
			'ionic-angular': ['ionic', 'angular-animate', 'angular-ui-router'],
		}
	};
	return requireConstatnt
})
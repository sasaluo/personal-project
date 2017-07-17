(function(){

	define(['app'],function(app){
		//公共组件
		var commonComponents=[
			'factorys/service','constants/backend','constants/backendInterface','services/cache','popup/popup',
		];
		//单独controller
		var components={
			'myCare':['careInfo/myCareInfoCtrl'],
			'clerkIndex':['clerkShop/clerkIndexCtrl'],
			'clerkQR':['clerkShop/clerkQRCtrl'],
			'counterGoodsList':['counter/counterGoodsListCtrl'],
			'clerkRank':['dataMark/clerkRankCtrl'],
			'dailySale':['dataMark/dailySaleCtrl'],
			'dailyShare':['dataMark/dailyShareCtrl'],
			'saleRank':['dataMark/saleRankCtrl'],
			'clerkLogin':['login/clerkLoginCtrl'],
			'getVerifyCode':['login/getVerifyCodeCtrl'],
			'newPassWord':['login/newPassWordCtrl'],
			'businessHandling':['myBusiness/businessHandlingCtrl'],
			'businessStates':['myBusiness/businessStatesCtrl'],
			'businessList':['myBusiness/businessListCtrl'],
			'doBusiness':['myBusiness/doBusinessCtrl'],
			'buyNow':['products/buyNowCtrl'],
			'productDetail':['products/productDetailCtrl'],
			'productUpload':['products/productUploadCtrl'],
			'changePassword':['setInfo/changePasswordCtrl'],
			'setContent':['setInfo/setContentCtrl'],
			'setStore':['setInfo/setStoreCtrl'],

		};

		angular.forEach(components,function(value,key){
			angular.forEach(commonComponents,function(item,i){
				value.push(item)
			});
		});

		app.constant('components',components)
	})

})()
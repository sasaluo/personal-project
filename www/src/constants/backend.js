(function(){

	define(['app'],function(app){
		app.constant('backend',{
			 url: 'http://172.16.5.31',
             name:'traffic',
           	 appkey: 100000040,
             errorCodes: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 2000, 2001, 2002, 2003, 2004, 2005, 3000, 3001, 3002, 4001, 4002, 5001, 5002]
		})

	})
})()


// (function() {
//         angular.module('app').constant('backend', {
//             url: 'http://172.16.5.31',
//             name:'traffic',
//             appkey: 100000040,
//             errorCodes: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 2000, 2001, 2002, 2003, 2004, 2005, 3000, 3001, 3002, 4001, 4002, 5001, 5002]
//     });
// })();
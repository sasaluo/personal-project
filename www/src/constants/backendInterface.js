(function(){

    define(['app'],function(app){
        app.constant('backendInterface', [{
                service: 'visitor',
                port: 10040,
                interfaces: ['visitorServer/reservationInfo','visitorServer/getBusinessHallList', 'visitorServer/getHallMasterList', 'visitorServer/getBroadbandList', 'visitorServer/getHallMasterInfo', 'visitorServer/getBroadbandInfo']
            }, {
                service: 'store',
                port: 10040,
                interfaces: ['storeServer/login','storeServer/changePwd','storeServer/resetPwd','storeServer/checkSms']
            },
            {
                service: 'sales',
                port: 10040,
                interfaces: ['salesServer/saveReservationInfo','salesServer/getReservationInfo','salesServer/findOne','salesServer/editStore',
                'salesServer/addGoodsToStore','salesServer/shareGoods','salesServer/getBroadbandBusinessList','salesServer/getSaleBoardList',
                'salesServer/sendSms','salesServer/getDailySaleStatisticList','salesServer/saveShare','salesServer/saveGoodsClick']
            },
            {
                service: 'common',
                port: 10040,
                interfaces: ['file/upload']
            },
            {
                service: 'goods',
                port: 10040,
                interfaces: ['goodsServer/getStoreGoodsList']
            }
            
        ]);
    })

})()





// (function() {
//     angular.module('app').constant('backendInterface', [{
//             service: 'visitor',
//             port: 10040,
//             interfaces: ['visitorServer/reservationInfo','visitorServer/getBusinessHallList', 'visitorServer/getHallMasterList', 'visitorServer/getBroadbandList', 'visitorServer/getHallMasterInfo', 'visitorServer/getBroadbandInfo']
//         }, {
//             service: 'store',
//             port: 10040,
//             interfaces: ['storeServer/login','storeServer/changePwd','storeServer/resetPwd','storeServer/checkSms']
//         },
//         {
//             service: 'sales',
//             port: 10040,
//             interfaces: ['salesServer/saveReservationInfo','salesServer/getReservationInfo','salesServer/findOne','salesServer/editStore',
//             'salesServer/addGoodsToStore','salesServer/shareGoods','salesServer/getBroadbandBusinessList','salesServer/getSaleBoardList',
//             'salesServer/sendSms','salesServer/getDailySaleStatisticList','salesServer/saveShare','salesServer/saveGoodsClick']
//         },
//         {
//             service: 'common',
//             port: 10040,
//             interfaces: ['file/upload']
//         },
//         {
//             service: 'goods',
//             port: 10040,
//             interfaces: ['goodsServer/getStoreGoodsList']
//         }
        
//     ]);
// })();

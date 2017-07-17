var isWeXin = navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1 ? true : false; //判断是否是微信环境
window.weixinShare='';	        
    function WXConfigGetter(obj){
    	console.log(obj)
        obj.debug=false;
        obj.jsApiList=['onMenuShareTimeline','onMenuShareAppMessage'];            
        wx.config(obj); 

        console.log(111)  

        wx.ready(function(){           
            // wx.onMenuShareAppMessage({
            //     title: '上海移动营业厅', // 分享标题
            //     desc: '上海移动业务一键预约办理！', // 分享描述
            //     link: window.location.href, // 分享链接
            //     imgUrl: 'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
            //     type: '', // 分享类型,music、video或link，不填默认为link
            //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            //     success: function () {               
            //         saveShareDatas()                   
              
            //     },
            //     cancel: function () { }               
            // });

            // wx.onMenuShareTimeline({
            //     title: '上海移动营业厅', // 分享标题
            //     link: window.location.href, // 分享链接
            //     imgUrl: 'http://cmsh.vpclub.cn/img/shop.png', // 分享图标
            //     success: function () { 
            //         saveShareDatas()
            //     },
            //     cancel: function () {}
            // });
        }) 
        window.weixinShare=wx;
    }


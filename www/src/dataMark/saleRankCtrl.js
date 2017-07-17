(function() {
	define(['app','echarts'],function(app,echarts){
		app.controller('saleRankCtrl', saleRankCtrl);

	    saleRankCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading','$localStorage','Service'];

	    function saleRankCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading,$localStorage,Service) {
	    
	    var vm =this;
	    vm.dates=[];//存储日期
	    vm.businessData=[];
	    vm.shareData=[];
	    vm.markDatas=[];
	    vm.goPrev = goPrev;

	    function goPrev(){
	    	$state.go('clerkIndex')
	    }

	    var businessChart =document.getElementById('recentBusiness');
	    var shareChart =document.getElementById('recentShare')
	    console.log(businessChart.offsetWidth)
	    console.log(businessChart.offsetHeight)

	    businessChart.width = 2*businessChart.offsetWidth
	    businessChart.height = 1.5*businessChart.offsetHeight


	    shareChart.width = 2*shareChart.offsetWidth
	    shareChart.height = 1.5*shareChart.offsetHeight

	    var myChart1 = echarts.init(businessChart);
	    var myChart2 = echarts.init(shareChart);
		 
	      vm.parameters={	 
	     	'storeId':$localStorage.userInfo.id,	 
	     	'masterId':$localStorage.userInfo.storeMasterId, 
	     	'identityId':1	 
	      }
	     console.log(vm.parameters)
	 
	     Service.post('salesServer', 'getDailySaleStatisticList',vm.parameters).then(function(data) {              
		 		console.log(data)
		 
	               if(data.returnCode==1000){
	 
	              	$localStorage.saleDatas = data.dataInfo.dailyBroadBandAmountList;
		 
	              	$localStorage.shareDatas = data.dataInfo.dailyShareVisitAmountList;
		 
	                vm.businessLists = data.dataInfo.dailyBroadBandAmountList;//业务量
		 
	                vm.shareLists = data.dataInfo.dailyShareVisitAmountList;//分享量
		 
	                console.log(vm.businessLists)	 
	                console.log(vm.shareLists)
		 				 for(var i=1;i<vm.businessLists.length;i++){
		 				 	vm.endDates =vm.businessLists[i].saleDate.split('-').join('/').substr(5); 				 
						    vm.dates.unshift(vm.endDates);   	 				 	 				 
		 				 }
		 				 console.log(vm.dates)	
	 
			            for(var i=1;i<vm.businessLists.length;i++){
			            	vm.businessData.unshift(vm.businessLists[i].saleAmount);	
			            }
			            for(var i=1;i<vm.shareLists.length;i++){
			            	vm.shareData.unshift(vm.shareLists[i].saleAmount);	
			            }
			             vm.num = parseInt(vm.businessLists.length/2);
				        console.log(vm.num)
				        for(var i=0;i<vm.num;i++){
					          vm.jsons1={};
					          vm.jsons2={};
					          vm.markArea=[];
					          vm.jsons1.xAxis = vm.dates[2*i];
					          vm.jsons2.xAxis = vm.dates[2*i+1];

					          vm.markArea.push(vm.jsons1);
					          vm.markArea.push(vm.jsons2);
					          console.log(vm.markArea)
					          vm.markDatas.push(vm.markArea);
				      	}

				      	console.log(vm.markDatas);
			             option1={
					                  
					          xAxis:  {
					              type: 'category',
					              boundaryGap: false,
					              axisLabel:{
					                textStyle :{
					                  fontStyle:16
					                }
					              },
					              axisTick: {show: false},
					              data:vm.dates

					          },
					          yAxis: {
					              type: 'value',
					              axisLine: {show: false,
					                lineStyle: {
					                        color: '#fff'
					                    }
					              },
					              axisLabel: {show: false},
					              axisTick: {show: false},
					              axisLabel: {
					                  formatter: '{value}'
					              },
					              splitLine: {
					                    show: false//背景横条
					                }
					          },
					          series: [
					              {
					                  name:'用电量',
					                  type:'line',
					                  smooth: true,
					                  symbol:'none',//去掉小圆点
					                  itemStyle:{
					                    normal:{
					                      lineStyle:{
					                        color:"#FF1D8A"
					                      }
					                    }
					                  },
					                  data:vm.businessData,
					                  markArea: {
					                      itemStyle :{normal:{                              
					                        color:"#FFE5ED"
					                     } 
					                    },
					                      data: vm.markDatas                              
					                  }
					              }
					          ]
					        }

					         option2={
					                  
					          xAxis:  {
					              type: 'category',
					              boundaryGap: false,
					              axisLabel:{
					                textStyle :{
					                  fontStyle:16
					                }
					              },
					              axisTick: {show: false},
					              data:vm.dates

					          },
					          yAxis: {
					              type: 'value',
					              axisLine: {show: false,
					                lineStyle: {
					                        color: '#fff'
					                    }
					              },
					              axisLabel: {show: false},
					              axisTick: {show: false},
					              axisLabel: {
					                  formatter: '{value}'
					              },
					              splitLine: {
					                    show: false//背景横条
					                }
					          },
					          series: [
					              {
					                  name:'用电量',
					                  type:'line',
					                  smooth: true,
					                  symbol:'none',//去掉小圆点
					                  itemStyle:{
					                    normal:{
					                      lineStyle:{
					                        color:"#5BD2FD"
					                      }
					                    }
					                  },
					                  data:vm.shareData,
					                  markArea: {
					                      itemStyle :{normal:{                              
					                        color:"rgba(82,168,240,0.3)"
					                     } 
					                    },
					                      data: vm.markDatas                              
					                  }
					              }
					          ]
					        }
		 
			         myChart1.setOption(option1);
			         myChart2.setOption(option2)  
			         	 
	               }              
		        }); 

	    }
	})
})()


  

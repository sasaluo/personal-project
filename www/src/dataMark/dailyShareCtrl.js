(function() {
  define(['app','echarts'],function(app,echarts){
    app.controller('dailyShareCtrl', dailyShareCtrl);

    dailyShareCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading','$localStorage','Service'];

    function dailyShareCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading,$localStorage,Service) {
    
      	var vm =this;
      	  vm.shareDatas = $localStorage.shareDatas;
      	  vm.goPrev = goPrev;

      	  console.log(vm.shareDatas)
	      vm.dates = [];
	      vm.amount=[];
	      vm.markArea=[];
	      vm.markDatas=[];
	    function goPrev(){
	        $state.go('saleRank')
	      }


      for(var i=0;i<vm.shareDatas.length;i++){
        vm.endDates =vm.shareDatas[i].saleDate.split('-').join('/').substr(5);
        vm.dailyAmount=vm.shareDatas[i].saleAmount;
 
        vm.dates.unshift(vm.endDates);
        vm.amount.unshift(vm.dailyAmount)      
      }

 
        vm.num = parseInt(vm.shareDatas.length/2);
        console.log(vm.num)
        for(var i=0;i<vm.num;i++){
          vm.jsons1={};
          vm.jsons2={};
          vm.markArea=[];
          vm.jsons1.xAxis = vm.dates[2*i];
          vm.jsons2.xAxis = vm.dates[2*i+1];
          console.log(vm.jsons1)
          console.log(vm.jsons2)
          vm.markArea.unshift(vm.jsons1);
          vm.markArea.unshift(vm.jsons2);
          console.log(vm.markArea)
          vm.markDatas.unshift(vm.markArea);
        
        }                             
 
        console.log(vm.markDatas)
          var shareChart = document.getElementById('recentSale');
          shareChart.width = 2*shareChart.offsetWidth;
          shareChart.height = 1.5*shareChart.offsetHeight

          var myChart = echarts.init(shareChart);

          myChart.setOption(option={
                  
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
                          symbol:'none',
                          smooth: true,
                          itemStyle:{
                            normal:{
                              lineStyle:{
                                color:"#5BD2FD"
                              }
                            }
                          },
                          data:vm.amount,

                          markArea: {
                              itemStyle :{
                              	normal:{                              
	                                color:"rgba(82,168,240,0.3)"
	                             } 
                            },
                              data: vm.markDatas                              
                          }
                      }
                  ]
              }); 
      }
  })
})()
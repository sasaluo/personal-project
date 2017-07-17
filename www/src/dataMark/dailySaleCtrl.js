(function() {
  define(['app','echarts'],function(app,echarts){
    app.controller('dailySaleCtrl', dailySaleCtrl);

      dailySaleCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicLoading','$localStorage','Service'];

      function dailySaleCtrl($scope, $rootScope, $state, $ionicPopup, $ionicLoading,$localStorage,Service) {
      
        var vm =this;
        vm.goPrev = goPrev;
         function goPrev(){
          $state.go('saleRank')
        }


        vm.dates = [];
        vm.amount=[];
        vm.markArea=[];
        vm.markDatas=[];

        vm.daySellLists = $localStorage.saleDatas;
        console.log(vm.daySellLists)

        for(var i=0;i<vm.daySellLists.length;i++){
          vm.endDates =vm.daySellLists[i].saleDate.split('-').join('/').substr(5);
          vm.dailyAmount=vm.daySellLists[i].saleAmount;
   
          vm.dates.unshift(vm.endDates);
          vm.amount.unshift(vm.dailyAmount)      
        }

   
          vm.num = parseInt(vm.daySellLists.length/2);
          console.log(vm.num)
          for(var i=0;i<vm.num;i++){
            vm.jsons1={};
            vm.jsons2={};
            vm.markArea=[];
            vm.jsons1.xAxis = vm.dates[2*i];
            vm.jsons2.xAxis = vm.dates[2*i+1];
            
            vm.markArea.unshift(vm.jsons1);
            vm.markArea.unshift(vm.jsons2);
            console.log(vm.markArea)
            vm.markDatas.unshift(vm.markArea);
          
          }                             
   
          console.log(vm.markDatas)
            var saleChart =document.getElementById('recentSale'); 
            saleChart.width = 2*saleChart.offsetWidth
            saleChart.height = 1.5*saleChart.offsetHeight
       
            var myChart = echarts.init(saleChart);

            myChart.setOption(
              option={
                    
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
                            data:vm.amount,
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
                );

                 




        // var chartData = {
        //   labels: [],
        //   datasets: [{
        //     fillColor : "rgba(255,229,237,0)",//图表阴影颜色
        //     strokeColor : " rgba(255,29,138,1)",//线条颜色
        //     strokeWidth:5,        
        //     data:[],
        //   }],    
        // };

        // var defaults = {
        //     scaleShowLabels : false,//y轴刻度
        //     scaleShowGridLines : false,//是否显示背景网格
        //     pointDotRadius : 1,
        //     bezierCurve : false,
        //     scaleFontSize : 12,
        //     scaleLineColor : "rgba(0,0,0,0)",//X轴颜色，设为0，表示无色     
        //   }
        
        //    for(var i=1;i<vm.daySellLists.length;i++){
        //       vm.daySellLists[i].saleDate.split('-')
        //       vm.endDates =vm.daySellLists[i].saleDate.split('-').join('/').substr(5); 
        //       console.log(vm.endDates)
        //       chartData.labels.unshift(vm.endDates);            
        //      }
            
        //     for(var i=1;i<vm.daySellLists.length;i++){
        //        chartData.datasets[0].data.unshift(vm.daySellLists[i].saleAmount);

        //     }
        //     var dayBusiness = document.getElementById('recentSale').getContext("2d");
        //     var myLineChart = new Chart(dayBusiness).Line(chartData,defaults);
        // 
      }
  })
})()
(function(){
	requirejs(['main.param'],function(requireConstatnt){
		requirejs.config({
			paths: requireConstatnt.paths,
			shim: requireConstatnt.shim,
			waitSeconds:0,
			//deps里面的文件最先加载
			deps:['domReady!','constants/component','config/router','config/register','config/config','config/run'],
			callback: function(doc,components){
 
				angular.bootstrap(doc, ['app']);
 
	 
			}
		});
	});
})();
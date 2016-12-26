// 针对自定义插件
global.plugin = function(pkg) {
	return require('./' + pkg);
}
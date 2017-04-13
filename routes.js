var path = require('path');
var express = require("express");
var router = express.Router();

var cleanRouterCache = require('./tools/updateModulePro').cleanRouterCache,
	cleanInterfaceCache = require('./tools/updateModulePro').cleanInterfaceCache;

// 这里的path对路由进行分析,从而引入相对的处理文件,再将文件路径监听,一旦修改清楚缓存的文件,重新读取,
// 处理文件使用 router.use 直接处理,反馈结果
// 目前支持 路由热更新
const ROUTER = [
	{
		path: '/',
		require: path.join(__dirname, 'routes/index')
	},
	{
		path: '/logs',
		require: path.join(__dirname, 'routes/logs')
	},
];

const INTERFACE = [
	{
		path: '/interface_test_hotupdate',
		require: path.join(__dirname, 'private/interface/test_hotupdate'),
		method: 'post'
	}
];

// 利用挂载于router下,堆内存指向,修改后清除模块重载,指向不变
cleanRouterCache(ROUTER, router);
cleanInterfaceCache(INTERFACE, router);




module.exports = router;



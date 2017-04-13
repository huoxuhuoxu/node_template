
let fs = require("fs");


// 支持 热更新 方案
// 释放模块缓存,以及 所有相关的引用
const CleanCache = function(modulePath){
    let module = require.cache[modulePath];
    if(module.parent){
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    require.cache[modulePath] = null;
}

exports.CleanCache = CleanCache;

// 路由 热更新
exports.cleanRouterCache = function(ROUTER, router){
	ROUTER.forEach(function(objectPath){
		let requirePath = require(objectPath['require']);
		router.all(objectPath['path'], function(req, res, next){
			requirePath(req, res, next);
		});
		fs.watch(require.resolve(objectPath['require']), function(){
		    CleanCache(require.resolve(objectPath['require']));
		    try{
		        requirePath = require(objectPath['require']);
		    }catch(err){
		        console.error("module update failed, moduleName: " + objectPath['require']);
		    }
		});
	});
}

// 接口热更新
exports.cleanInterfaceCache = function(ROUTER, router){
	ROUTER.forEach(function(objectPath){
		let requirePath = require(objectPath['require']);
		router[objectPath['method']](objectPath['path'], function(req, res, next){
			requirePath(req, res, next);
		});
		fs.watch(require.resolve(objectPath['require']), function(){
		    CleanCache(require.resolve(objectPath['require']));
		    try{
		        requirePath = require(objectPath['require']);
		    }catch(err){
		        console.error("module update failed, moduleName: " + objectPath['require']);
		    }
		});
	});
}






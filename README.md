Version 1.0.0
### nodeJs7.7.8基于Express模块,自定义框架
	研发环境,使用模块热更新，生产环境配合pm2使用

#### config.js文件
	1.database: 数据库连接配置
	2.port: 主服务进程端口配置
	
#### routes.js文件
	文件启用了模块热更新
	1.ROUTER常量: 定义页面路由
		const ROUTER = [
			{
				path: '/',
				require: path.join(__dirname, 'routes/index')
			}
		];
	2. INTERFACE常量: 定义接口
		const INTERFACE = [
			{
				path: 'interface_test_hotupdate',
				require: path.join(__dirname, 'private/interface/test_hotupdate'),
				method: 'post'
			}
		];

#### app.js文件
	nodeJs主程序文件
	负责启用各中间件,静态资源代理,路由挂载,404,500等处理

#### bin
	www文件
		服务器启动文件: node bin/www
		
#### module
	暂留

#### private
	interface: 接口文件
	orm: 数据库文件
		classMysqlHandler.js: 连接mysql
		awaitQuerySql.js: async/await形式执行sql语句

#### public静态资源文件夹
	css/js/images/fonts/source: 常规
	sass: sass基于compass框架
		_function: 函数
		_module: 混合宏
		_placeholder: 预定义
		_variable: 变量定义
		_predefine: 常用class定义
	tools: 自定义工具
		hz_frontBase: 基础方法		
		hz_myTools:	功能方法
		hz_reactBase: react/redux方法
		hz_touch: 触摸方法
	tpls: 存放html代码片段
	dist: 打包后的文件目录
	
#### routes
	存放路由处理文件与routes.js中ROUTER定义的路由有关

#### scripts脚本文件夹
	initial_database.js: 自动建表脚本
	
#### services其他服务文件夹
	webrtc.js: WebRTC服务
	ws.js: websocket服务
	wss.js: 基于https的websocket服务

#### tools工具文件夹
	updateModulePro.js: 热更新模块

#### views视图文件夹
	layouts: 模版文件夹
		main.handlebars: 默认模版
		phone.handlebars: 手机端模版
	partials: 段落文件夹
		bootstrapHeader.handlebars: 引入bootstrap的相关代码段
	index.handlebars: 首页视图文件,与routes中ROUTER定义相关
		
	
##### end
	



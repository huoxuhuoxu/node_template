Version 1.0.0
### nodeJs7.7.8基于Express模块,初始化项目结构
	研发环境,使用模块热更新，生产环境配合pm2使用

#### .env
	环境变量生成 基于 dotenv模块

#### config.js
	1.database: 数据库连接配置
	2.port: 主服务进程端口配置

#### database.json
	db-migrate 数据库迁移配置
	
#### routes.js
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

#### app.js
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

#### public
	静态资源文件夹
	
#### routes
	存放路由处理文件与routes.js中ROUTER定义的路由有关

#### scripts
	initial_project.sh: 项目环境初始化
		权限 chmod u+x ./scripts/initial_project.sh
		执行 ./scripts/initial_project.sh
	
#### services其他服务文件夹
	webrtc.js: WebRTC服务
	ws.js: websocket服务
	wss.js: 基于https的websocket服务
	sse.js: 数据推送服务
	ws_socketIO.js: socket.io模块的ws服务

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
	



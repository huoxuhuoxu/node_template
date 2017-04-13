var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	// 优化为: angular,监测字段是否存在,存在将angular相关引入...以此类推.
	let info = {
		title: '日志系统后台',
		boostrap: 'boostrapHeader'
	}	
  	res.render('logs', info);
});

module.exports = router;

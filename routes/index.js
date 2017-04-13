var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
	let info = {
		title: 'index测试',
	}
  	res.render('index', info);
});

module.exports = router;

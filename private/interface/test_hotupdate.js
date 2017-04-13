var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  	res.json({
		'code': 0,
		'msg': "ok",
		'test': 1
	});
});

module.exports = router;

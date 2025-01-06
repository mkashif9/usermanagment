const { authentication, restrictTo } = require('../controller/authController');
const { createProject } = require('../controller/projectController');

const router =  require('express').Router();

router.route('/').post(authentication,restrictTo('1'),createProject)

module.exports = router;
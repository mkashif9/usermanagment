const { authentication } = require('../controller/authController');
const { getAllUsers } = require('../controller/userController');

const router =  require('express').Router();
router.route('/').get(authentication,getAllUsers);

module.exports = router
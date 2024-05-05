const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter')

router.route('/signin')
    .post(loginLimiter, authController.signin)

router.route('/refresh')
    .post(authController.refresh)

router.route('/logout')
    .post(authController.logout)

router.route('/signup')
    .post(loginLimiter,authController.signup)

router.route('/googlesignin')
    .post(loginLimiter,authController.googlesignin)

module.exports = router

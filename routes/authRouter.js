const express = require('express');
const authController = require('./../controller/authController');

const router = express.Router();

                router.route('/signup')
                    .post(authController.signup);

                router.route('/validate') 
                    .post(authController.validateEmail);

                router.route('/validateNow') 
                    .post(authController.validateNow);

                router.route('/login') 
                    .post(authController.login);

                router.route('/forgotPassword')
                    .get(authController.forgotPassword);

                router.route('/resetPassword/:token')
                    .patch(authController.resetPassword);

module.exports = router;
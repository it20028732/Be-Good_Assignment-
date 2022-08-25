const express = require('express')
const router = express.Router()

//controller
const {Register,Login}=require('../Controller/Auth.Controller')

//routes
router.route('/register').post(Register);
router.route('/login').post(Login);



module.exports = router
const express = require('express')
const router = express.Router()

//controller
const {Register}=require('../Controller/Auth.Controller')

//routes
router.route('/register').post(Register);



module.exports = router
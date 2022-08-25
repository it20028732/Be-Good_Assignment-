const express = require('express')
const router = express.Router()

//controller
const {Vtype}=require('../Controller/Vehicle.Controller')


//routes
router.route('/:type').post(Vtype);


module.exports = router
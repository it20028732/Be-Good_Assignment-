const express = require('express')
const router = express.Router()

//controller
const {Vtype,getOneVehicle,getAllVehicle,deleteVehicle,updateVehicle}=require('../Controller/Vehicle.Controller')
//middleware
const {authenticateReg,authorizePermissions}=require('../middleware/authentication')


//routes
router.route('/:type').post(Vtype);
router.route('/home/:docID').get(getOneVehicle);
router.route('/getall').get(authenticateReg,authorizePermissions('admin'),getAllVehicle)
router.route('/deletevehicle/:docID').delete(authenticateReg,deleteVehicle)
router.route('/updatevehicle/:docID').post(authenticateReg,updateVehicle)


module.exports = router
const Vehicle_Details=require('../Model/Vehicle_Details')
var validator = require("validator");
const asyncHandler = require("express-async-handler");

//determine type of vehicle
const Vtype = asyncHandler(async (req, res) => {
    var plateNo = req.params.type;

    //check for empty fields
    if(!plateNo){
        res.send({ msg: "Enter PlateNo" });
        throw new Error("Enter PlateNo");        
    }
    var carType=0;
    //regex to identify type of vehicle
    const modern = /[a-zA-Z]/
    const vintage=/[\u0D80-\u0DFF]/
    const old= /^[0-9 -]+$/

    
    if(modern.test(plateNo) && vintage.test(plateNo) || modern.test(plateNo) && old.test(plateNo)||old.test(plateNo) && vintage.test(plateNo) ){
        res.send({ msg: "invalid number plate" });
        return;
    }
    //check if plate is modern
    if(modern.test(plateNo)){
        carType= "modern"
    }
    //check if plate is vintage
    if(vintage.test(plateNo)){
        carType= "vintage"
    }
    //check if plate is old
    if(old.test(plateNo)){
        carType= "old"
    }
    //if non of the conditions sttisfy
    if(carType==0){
        res.send({ msg: "error" });
    }else{
        res.send({ data: carType,msg: "cartype Found" });
    }
});
//get one vehicle

module.exports = { Vtype };
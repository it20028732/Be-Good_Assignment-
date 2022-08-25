const Vehicle_Details=require('../Model/Vehicle_Details')
var validator = require("validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const saltRounds = 10;


//Register function---------------------------------------
const Register = asyncHandler(async (req, res) => {
    var { Name,email,password,accountType,plateNo,chassisNo } = req.body;

    //check for empty fields
    if(!Name,!email,!password,!accountType){
        res.send({ msg: "Enter Name,email,password,acctype" });
        throw new Error("Enter plateNo & chassisNo");        
    }
    //if customer is registering enter plate number & chassis number 
    if(accountType=='customer' && !plateNo,!chassisNo){
        res.send({ msg: "Enter plateNo & chassisNo" });
        throw new Error("Enter plateNo & chassisNo");
    }

    var carType=0;
    //regex to identify type of vehicle
    const modern = /[a-zA-Z]/
    const vintage=/[\u0D80-\u0DFF]/
    const old= /^[0-9]+$/

    if(modern.test(plateNo) && vintage.test(plateNo) || modern.test(plateNo) && old.test(plateNo)||old.test(plateNo) && vintage.test(plateNo) ){
        res.send({ msg: "invalid number plate" });
        return;
    }

    if(modern.test(plateNo)){
        carType= "modern"
        res.send({ msg: "modern" });
    }
    
    if(vintage.test(plateNo)){
        carType= "vintage"
        res.send({ msg: "vintage" });
    }
    if(old.test(plateNo)){
        carType= "old"
        res.send({ msg: "old" });
    }
})

module.exports = { Register };
const Vehicle_Details=require('../Model/Vehicle_Details')
var validator = require("validator");
const { createTokenUser, createJWT } = require("../utils");
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
    if(accountType=='customer'){
        if(!plateNo,!chassisNo ){
         res.send({ msg: "Enter plateNo & chassisNo" });
         throw new Error("Enter plateNo & chassisNo");
        }
    }else{
        plateNo=null,
        chassisNo=null
    }
    //validate email
    const validemail = await validator.isEmail(email);
    if (!validemail) {
      res.send({ msg: "enter valid email" });
      throw new Error("enter valid email");
    }

    try {
        //check if email || plate already exists
        const findEmail = await Vehicle_Details.findOne({ email: email });
        const findPlate = await Vehicle_Details.findOne({ plateNo: plateNo });
        if (findEmail) {
            res.send({ msg: "Email already exist" });
            throw new Error("Email already exist");
        }
        if (findPlate) {
            res.send({ msg: "Plate already exist" });
            throw new Error('Plate already exist');
        }

        //hash password
        password = await bcrypt.hash(password, saltRounds);
        //register
        const register=await Vehicle_Details.create({
            Name,
            email,
            password,
            accountType,
            plateNo,
            chassisNo
        });
        if (register) {
            res.send({ msg: "registered" });   
        }

    } catch (error) {
        console.log(error)
        res.send({ msg: "error" });
        throw new Error('error');
        
    }
});
//Login  function---------------------------------------
const Login = asyncHandler(async (req, res) => {
    const { credential,password } = req.body;
    //credential can be email or password
    if (!credential || !password) {
        res.send({ msg: "Fields cannot be empty" });
        throw new Error("empty fields");
    }
    //check email
    const reg = await Vehicle_Details.findOne({ $or:[ {'email':credential}, {'plateNo':credential}]});
    if (!reg) {
        res.status(400).send({ msg: "Email/Number plate doesnt exist" });
        throw new Error("Email/Number plate doesnt exist");
    }
    //validate password
    const isPasswordCorrect = await bcrypt.compare(password, reg.password);
    if (!isPasswordCorrect) {
        res.status(400).send({ msg: "invalid password" });
        throw new Error("Invalid password");
    } else {
        const tokenUser = createTokenUser(reg);
        const token = createJWT({ payload: tokenUser });
        res.status(201).json({ user: tokenUser, token });
    }
});

module.exports = { Register ,Login};
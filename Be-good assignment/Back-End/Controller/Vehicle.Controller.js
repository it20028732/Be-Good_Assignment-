const Vehicle_Details=require('../Model/Vehicle_Details')
var validator = require("validator");
const asyncHandler = require("express-async-handler");

//determine type of vehicle
const Vtype = asyncHandler(async (req, res) => {
  var plateNo = req.params.type;

  //check for empty fields
  if (!plateNo) {
    res.send({ msg: "Enter PlateNo" });
    throw new Error("Enter PlateNo");
  }
  var carType = 0;
  //regex to identify type of vehicle
  const modern = /[a-zA-Z]/;
  const vintage = /[\u0D80-\u0DFF]/;
  const old = /^[0-9 -]+$/;

  if (
    (modern.test(plateNo) && vintage.test(plateNo)) ||
    (modern.test(plateNo) && old.test(plateNo)) ||
    (old.test(plateNo) && vintage.test(plateNo))
  ) {
    res.send({ msg: "invalid number plate" });
    return;
  }
  //check if plate is modern
  if (modern.test(plateNo)) {
    carType = "modern";
  }
  //check if plate is vintage
  if (vintage.test(plateNo)) {
    carType = "vintage";
  }
  //check if plate is old
  if (old.test(plateNo)) {
    carType = "old";
  }
  //if non of the conditions sttisfy
  if (carType == 0) {
    res.send({ msg: "error" });
  } else {
    res.send({ data: carType, msg: "cartype Found" });
  }
});
//get logged user registration details
const getOneVehicle = asyncHandler(async (req, res) => {
    const docID=req.params.docID
    if(!docID){
      res.send({ msg: "Document ID empty" });
    }
    try {
      res.status(201).json(await Vehicle_Details.findById(docID))
    } catch (error) {
      console.log(error)
      res.send({ msg: "error" });
    } 
});
//get all registration details
const getAllVehicle = asyncHandler(async (req, res) => {
  try {
    res.status(201).json(await Vehicle_Details.find({accountType:"customer"}))
  } catch (error) {
    console.log(error)
    res.send({ msg: "errorr" });
  } 
});
//delete vehicle reg
const deleteVehicle = asyncHandler(async (req, res) => {
  const docID=req.params.docID
  if(!docID){
    res.send({ msg: "Document ID empty" });
  }
  try {
    const response=await Vehicle_Details.findByIdAndDelete(docID)
    if(!response){
      res.send({ msg: "failed to delete" });
      return
    }else{
      res.send({ msg: "deleted" });
    }
  } catch (error) {
    console.log(error)
    res.send({ msg: "errorr" });
  } 
});
//update vehicle
const updateVehicle = asyncHandler(async (req, res) => {
  const filter={_id:req.params.docID}
  var { Name,email } = req.body;

  if(!Name || !email){
    res.send({ msg: "fields cannot be empty" });
    return;
  }
  try {
    const response = await Vehicle_Details.updateOne(filter, {
      Name,
      email,
    });
    if (response) {
      res.send({data:1, msg: "Updated sucessfully" });
      return
    } else {
      res.send({ msg: "failed to update" });
      return;
    }
  } catch (error) {
    console.log(error)
    res.send({ msg: "error" });
  }
})

module.exports = { Vtype,getOneVehicle,getAllVehicle,deleteVehicle,updateVehicle};

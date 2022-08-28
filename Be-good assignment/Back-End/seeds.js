const mongoose=require('mongoose')
const Vehicle_Details = require("./Model/Vehicle_Details");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const seed =async () => {
    try {
        const connection =await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.log(error)
    }
    pass = await bcrypt.hash('admin', saltRounds);
    
    //admin account details
    const seedData=[
        {
             Name:"admin",
             email:"admin@gmail.com",
             password:pass,
             accountType:"admin"
        }
    ]
    
    const seedDB=async()=>{
        const del=await Vehicle_Details.deleteMany({})
        if(del){
            console.log("deleted existing records")
        }else{
            console.log("error in Deleting records")
        }
        const create=await Vehicle_Details.insertMany(seedData)
        if(create){
            console.log("Admin Data Added")
        }else{
            console.log("Error in adding Admin Data")
        }
        mongoose.connection.close();
    }
    try {
        seedDB();
    } catch (error) {
        console.log(error)
    }
    
}
seed();

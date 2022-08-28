require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

//db conn
const connectDB = require("./db/conn");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//get routes
const AuthRoutes=require('./Routes/Auth.Routes')
const VehicleRoutes=require('./Routes/Vehicle.Routes')
//use routes
app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/vehicle",VehicleRoutes);

//sample server side
app.get("/", (req, res) => {
    res.send({ message: "vehicle registration backend" });
  });
  
//server port
const port = 4000;

//start server & mongodb connection
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
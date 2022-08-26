const { isTokenValid } = require('../utils')
const asyncHandler = require("express-async-handler");

//authenticate reg
const authenticateReg =asyncHandler( async (req, res, next) => {
    const authHeader = req.headers.authorization
  
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.send({ message: "failed to authenticate header" });
      throw new Error('Authentication Failed')
    }
    
    //split to get token
    const token = authHeader.split(' ')[1]
  
    try {
      const {docID,Name,email, accountType,plateNo,chassisNo } = isTokenValid({ token })
      
      req.reg = {docID,Name,email, accountType,plateNo,chassisNo}
      next()
    } catch (error) {
        res.send({ msg: "Authentication Failed" });
      throw new Error('Authentication Failed')
      
      
    }
  })

//authorize permission based on accountype
const authorizePermissions = (...accountTypes) => {
    return (req, res, next) => {
      //get acc type from token
      const authHeader = req.headers.authorization
      
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.send({ message: "failed to authenticate header" });
        throw new Error('Authentication Failed')
      }  
      //split to get token
      const token = authHeader.split(' ')[1]
      const {accountType } = isTokenValid({ token })


      //prevent anauthorized user from accessing route
      if (!accountTypes.includes(accountType)) {
        res.send({ msg: "Unauthorized to access this route" });
        throw new Errorr(
          'Unauthorized to access this route'
        )
      }
      next()
    }
}

  module.exports = {
    authenticateReg,
    authorizePermissions,
  }
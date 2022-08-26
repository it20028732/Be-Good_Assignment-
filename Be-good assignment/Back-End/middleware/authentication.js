const { isTokenValid } = require('../utils')

//authenticate reg
const authenticateReg = async (req, res, next) => {
    const authHeader = req.headers.authorization
  
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      //throw new Error('Authentication Failed')
      res.send({ message: "failed to authenticate header" });
      return
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
  }

//authorize permission based on accountype
const authorizePermissions = (...accountType) => {
    return (req, res, next) => {
    
      //prevent anauthorized user from accessing route
      if (!accountType.includes(req.reg.accountType)) {
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
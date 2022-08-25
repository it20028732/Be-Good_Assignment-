const { isTokenValid } = require('../utils')

//authenticate user
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
  
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      //throw new Error('Authentication Failed')
      res.send({ message: "failed to authenticate header" });
      return
    }
    
    //split to get token
    const token = authHeader.split(' ')[1]
  
    try {
      const { id, email, accountType } = isTokenValid({ token })
      req.user = { id, email, accountType }
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
      if (!accountType.includes(req.user.accountType)) {
        res.send({ msg: "Unauthorized to access this route" });
        throw new Errorr(
          'Unauthorized to access this route'
        )
      }
      next()
    }
}

  module.exports = {
    authenticateUser,
    authorizePermissions,
  }
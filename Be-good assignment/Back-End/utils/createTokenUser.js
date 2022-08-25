const createTokenUser = (reg) => {
  return {
    Name: reg.Name,
    email: reg.email,
    accountType: reg.accountType,
    plateNo: reg.plateNo,
    chassisNo: reg.chassisNo,
    Vehicle_Type: reg.chassisNo   
  }
}

module.exports = createTokenUser

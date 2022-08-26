const createTokenUser = (reg) => {
  return {
    docID: reg._id, 
    Name: reg.Name,
    email: reg.email,
    accountType: reg.accountType,
    plateNo: reg.plateNo,
    chassisNo: reg.chassisNo
  }
}

module.exports = createTokenUser

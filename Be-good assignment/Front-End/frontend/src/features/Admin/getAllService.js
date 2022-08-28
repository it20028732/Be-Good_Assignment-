import axios from 'axios'

//get all registration vehicles
export const getAllVehicles = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get("/api/v1/vehicle/getall", config)
    console.log('response',response)
    return response.data
  }
import axios from 'axios'

// Login user
const login = async (Data) => {
  console.log("here at authservice")    
  const response = await axios.post('/api/v1/auth/login', Data)
  console.log("response",response)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  logout,
  login,
}

export default authService
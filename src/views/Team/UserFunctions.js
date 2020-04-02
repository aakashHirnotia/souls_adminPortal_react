import axios from 'axios'

export const register = newUser=>{
  console.log("axios worked")
  // console.log(url)
  return axios.post('http://localhost:5000/users/register',{
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        gender: newUser.gender,
        email: newUser.email,
        password: newUser.password,
        joining: newUser.joining,
        address: newUser.address,
        status: newUser.status,
        role: newUser.role,
        mobile: newUser.mobile  
      }).then(response=>{
          console.log('Registerd')
      })
}


export const fetchUserDetails = (token)=>{
  return axios.get('http://localhost:5000/users/profile',{
        headers: {
          token: token
        }        
  }).then(response=>{
          console.log('Fetching data')
      })
}

export const update = updatedUser=>{
  return axios.post('http://localhost:5000/users/update',{
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        gender: updatedUser.gender,
        email: updatedUser.email,
        password: updatedUser.password,
        joining: updatedUser.joining,
        address: updatedUser.address,
        status: updatedUser.status,
        role: updatedUser.role,
        mobile: updatedUser.mobile
      }).then(response => {
        localStorage.removeItem('usertoken')
        localStorage.setItem('usertoken', response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
}

export const login = user => {
  return axios
    .post('http://localhost:5000/users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
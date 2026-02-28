import React from 'react'
import Form from './components/form/Form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../config'
import Layout from '../../components/layout/Layout'

const Login = () => {
   

  const navigate = useNavigate()
  const handleLogin = async (data)=>{
   try {
    const response = await axios.post(baseUrl + '/login',data)
   if(response.status === 200){
   
    localStorage.setItem('token',response.data.token)
    navigate('/')
   }else{
    alert("Login failed")
   }
   } catch (error) {
    alert(error?.response?.data?.message)
   }
  }


  return (
    <Layout>  
      <Form type='Login' onSubmit={handleLogin} />
    </Layout>
 
  )
}

export default Login
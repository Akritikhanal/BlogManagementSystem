import React from 'react'
import Form from './components/form/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../config'
import Layout from '../../components/layout/Layout'

const Register =  () => {
  
  const navigate = useNavigate()
  const handleRegister = async (data)=>{
   try {
    const response = await axios.post(`${baseUrl}/register`,data)
   if(response.status === 201){
    navigate('/login')
   }else{
    alert("Registration failed")
   }
   } catch (error) {
    alert(error?.response?.data?.message)
   }
  }
  return (
    <Layout>
      <Form type='Register' onSubmit={handleRegister} />
    </Layout>
    
  )
}

export default Register
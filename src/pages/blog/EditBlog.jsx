import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../components/layout/Layout'
import Form from './components/form/Form'
import { baseUrl } from '../../config'

const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${baseUrl}/blog/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      if (response.status === 200) setBlog(response.data.data)
      else alert('Failed to fetch blog')
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to load blog')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchBlog()
  }, [id])

  // Merge updated data with existing blog
  const handleEditBlog = async (data) => {
    if (!blog) return
    try {
      const formData = new FormData()
      formData.append('title', data.title || blog.title)
      formData.append('subtitle', data.subtitle || blog.subtitle)
      formData.append('description', data.description || blog.description)
      formData.append('category', data.category || blog.category)
      if (data.image) formData.append('image', data.image)

      const response = await axios.patch(`${baseUrl}/blog/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      })

      if (response.status === 200) navigate('/')
      else alert('Something went wrong while updating!')
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to update blog')
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!blog) return <p className="text-center mt-10">Blog not found</p>

  return (
    <Layout>
      <Form type="Edit" onSubmit={handleEditBlog} initialData={blog} />
    </Layout>
  )
}

export default EditBlog
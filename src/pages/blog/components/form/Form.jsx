import React, { useState, useEffect } from 'react'

const Form = ({ type, onSubmit, initialData }) => {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    image: null,
  })

  // Prefill form when initialData is available
  useEffect(() => {
    if (initialData) {
      setData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',
        category: initialData.category || '',
        image: null, // file inputs cannot be prefilled
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setData({
      ...data,
      [name]: name === 'image' ? files[0] : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="container my-3 px-4 lg:px-20">
        <div className="w-full p-8 my-2 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl mx-25">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl">
              {type} <br /> Blog
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Title*"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
              />
              <input
                className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Subtitle*"
                name="subtitle"
                value={data.subtitle}
                onChange={handleChange}
                required
              />
              <input
                className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Category*"
                name="category"
                value={data.category}
                onChange={handleChange}
                required
              />
              <input
                className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="file"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="my-4">
              <textarea
                required
                onChange={handleChange}
                placeholder="Description*"
                name="description"
                value={data.description}
                className="w-full h-32 bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

            {/* Show current image preview if editing */}
            {initialData?.imageUrl && !data.image && (
              <div className="my-4">
                <p className="font-bold mb-2">Current Image:</p>
                <img
                  src={initialData.imageUrl}
                  alt="Current"
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="my-2 w-1/2 lg:w-1/4">
              <button className="uppercase text-sm font-bold tracking-wide bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
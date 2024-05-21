import React from 'react'

const AddProduct = () => {

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  return (
    <div className='font-mono tracking-widest'>
      <h1 className='text-center text-2xl'>AddProduct</h1>

      <form onSubmit={handleSubmit}></form>
    </div>
  )
}

export default AddProduct
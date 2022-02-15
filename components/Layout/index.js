import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '../Header'

const Layout = ({ children }) => {
  return (
      <>
        <Header />
        <div className='container mx-auto'>{children}</div>
        <ToastContainer />
      </>
  )
}

export default Layout

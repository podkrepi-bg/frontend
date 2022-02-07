import React from 'react'
import CarsNavBar from './CarsNavBar'
import Footer from './Footer'

export default function Layout({ children }: any) {
  return (
    <>
      <CarsNavBar />
      {children}
      <Footer />
    </>
  )
}

import React from 'react'

import NavBar from 'components/documents/layout/NavBar'
import Footer from 'components/documents/layout/Footer'

export default function Layout({ children }: any) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}

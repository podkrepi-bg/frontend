import React from 'react'

import NavBar from 'components/documents/layout/NavBar'
import Footer from 'components/documents/layout/Footer'
import Snackbar from 'components/layout/Snackbar'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
      <Snackbar />
      <Footer />
    </>
  )
}

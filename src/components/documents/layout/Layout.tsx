import React from 'react'

import NavBar from 'components/documents/layout/NavBar'
import Footer from 'components/documents/layout/Footer'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}

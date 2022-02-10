import React from 'react'

import DocumentsDrawer from 'components/documents/layout/DocumentsDrawer'
import DocumentsAppbar from 'components/documents/layout/DocumentsAppBar'

export default function NavBar() {
  return (
    <>
      <DocumentsAppbar />
      <DocumentsDrawer />
    </>
  )
}

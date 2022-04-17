import React from 'react'
import { Document, Page, renderToStream, StyleSheet, View } from '@react-pdf/renderer'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Logo from './svg/Logo'

const styles = StyleSheet.create({})

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const MyDocument = () => (
    <Document>
      <Page size="A4">
        <Logo />
      </Page>
    </Document>
  )
  const pdfStream = await renderToStream(<MyDocument />)
  res.setHeader('Content-Type', 'application/pdf')
  pdfStream.pipe(res)
}

export default Handler

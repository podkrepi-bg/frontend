import React from 'react'
import ReactPDF from '@react-pdf/renderer'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const MyDocument = () => (
    <ReactPDF.Document>
      <ReactPDF.Text>mdmdmd</ReactPDF.Text>
    </ReactPDF.Document>
  )
  const pdfStream = await ReactPDF.renderToStream(<MyDocument />)
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-disposition', 'attachment;filename="filename.pdf"')
  res.send(pdfStream)
}

export default Handler

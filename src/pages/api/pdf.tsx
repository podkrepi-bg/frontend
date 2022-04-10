import React from 'react'
import ReactPDF from '@react-pdf/renderer'
import { NextApiHandler } from 'next'

const Handler: NextApiHandler = async (req, res) => {
  const MyDocument = () => (
    <ReactPDF.Document>
      <ReactPDF.Text>mdmdmd</ReactPDF.Text>
    </ReactPDF.Document>
  )
  const pdfStream = await ReactPDF.renderToString(<MyDocument />)
  res.setHeader('Content-Type', 'application/pdf')
  // pdfStream.pipe(res)
  // pdfStream.on('end', () => console.log('Done streaming, response sent.'))

  res.setHeader('Content-disposition', 'attachment;filename="filename.pdf"')
  res.setHeader('Content-Type', 'application/pdf')
  res.send(pdfStream)
}

export default Handler

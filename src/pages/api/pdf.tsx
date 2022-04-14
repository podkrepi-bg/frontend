import React from 'react'
import { Document, Page, Text, renderToStream } from '@react-pdf/renderer'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const MyDocument = () => (
    <Document>
      <Page size="A4">
        <Text>mdmdmd</Text>
      </Page>
    </Document>
  )
  const pdfStream = await renderToStream(<MyDocument />)
  res.setHeader('Content-Type', 'application/pdf')
  pdfStream.pipe(res)
  pdfStream.on('end', () => console.log('Done streaming, response sent.'))
}

export default Handler

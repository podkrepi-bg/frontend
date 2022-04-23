import { renderToStream } from '@react-pdf/renderer'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Certificate from './document'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pdfStream = await renderToStream(<Certificate />)
  res.setHeader('Content-Type', 'application/pdf')
  pdfStream.pipe(res)
}

export default Handler

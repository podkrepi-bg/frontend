import { renderToStream } from '@react-pdf/renderer'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { QueryClient, QueryClientProvider } from 'react-query'
import Certificate from './document'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Array.isArray(req.query.donationId) ? req.query.donationId[0] : req.query.donationId
  const pdfStream = await renderToStream(
    <QueryClientProvider client={new QueryClient()}>
      <Certificate donationId={id} />
    </QueryClientProvider>,
  )
  res.setHeader('Content-Type', 'application/pdf')
  pdfStream.pipe(res)
}

export default Handler

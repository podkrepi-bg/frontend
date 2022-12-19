import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { renderToStream } from '@react-pdf/renderer'

import { UserDonationResponse } from 'gql/donations'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig } from 'service/restRequests'

import Certificate from 'components/pdf/Certificate'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Array.isArray(req.query.donationId) ? req.query.donationId[0] : req.query.donationId

  const jwt = await getToken({ req })
  if (!id) {
    res.status(500).send('No donation id provided')
    return
  }
  const { data: donation } = await apiClient.get<UserDonationResponse>(
    endpoints.donation.getUserDonation(id).url,
    authConfig(jwt?.accessToken),
  )

  if (!donation) {
    res.status(404).json({ notFound: true })
  } else {
    const pdfStream = await renderToStream(<Certificate donation={donation} />)
    res.setHeader('Content-Type', 'application/pdf')
    pdfStream.pipe(res)
  }
}

export default Handler

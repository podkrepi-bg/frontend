import { renderToStream } from '@react-pdf/renderer'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { apiClient } from 'service/apiClient'
import { UserDonationResponse } from 'gql/donations'
import { endpoints } from 'service/apiEndpoints'
import Certificate from 'components/pdf/Certificate'
import { authConfig } from 'service/restRequests'
import { getToken } from 'next-auth/jwt'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Array.isArray(req.query.donationId) ? req.query.donationId[0] : req.query.donationId

  const jwt = await getToken({ req })
  const { data: donation } = await apiClient.get<UserDonationResponse>(
    endpoints.donation.getUserDonation(id).url,
    authConfig(jwt?.accessToken),
  )

  if (!donation) {
    res.status(404).json({ notFound: true })
  } else {
    const pdfStream = await renderToStream(
      <Certificate donation={donation} person={donation.person} />,
    )
    res.setHeader('Content-Type', 'application/pdf')
    pdfStream.pipe(res)
  }
}

export default Handler

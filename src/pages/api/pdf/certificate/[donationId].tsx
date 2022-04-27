import { renderToStream } from '@react-pdf/renderer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { PersonResponse } from 'gql/person'
import { apiClient } from 'service/apiClient'
import { DonationResponse } from 'gql/donations'
import { endpoints } from 'service/apiEndpoints'
import Certificate from 'components/pdf/Certificate'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Array.isArray(req.query.donationId) ? req.query.donationId[0] : req.query.donationId

  const { data: donation } = await apiClient.get<DonationResponse>(
    endpoints.donation.getDonation(id).url,
  )

  let person: PersonResponse | undefined = undefined
  if (donation?.personId) {
    const { data } = await apiClient.get<PersonResponse>(
      endpoints.person.viewPerson(donation.personId).url,
    )
    person = data
  }

  const pdfStream = await renderToStream(
    <QueryClientProvider client={new QueryClient()}>
      <Certificate donation={donation} person={person} />
    </QueryClientProvider>,
  )
  res.setHeader('Content-Type', 'application/pdf')
  pdfStream.pipe(res)
}

export default Handler

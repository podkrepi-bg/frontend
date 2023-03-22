import { Currencies } from 'components/admin/withdrawals/WithdrawalTypes'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { stripe } from 'service/stripeClient'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { setup_intent: setupIntentId, finalAmount } = req.query
  if (!setupIntentId || typeof setupIntentId !== 'string') {
    res.status(500).send('No setupIntentId provided or it is not a string')
    return
  }
  console.log(req.query)
  const paymentIntent = await apiClient.post(
    endpoints.donation.finalizeSetupIntent(setupIntentId).url,
    {
      amount: Math.round(Number(finalAmount)),
      currency: Currencies.BGN,
    },
  )
  console.log(paymentIntent)
}

export default Handler

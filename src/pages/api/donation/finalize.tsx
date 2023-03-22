import Stripe from 'stripe'
import { Currencies } from 'components/admin/withdrawals/WithdrawalTypes'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { AxiosResponse } from 'axios'
import { routes } from 'common/routes'

const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { setup_intent: setupIntentId, finalAmount, isAnonymous, campaignSlug } = req.query
  if (!setupIntentId || typeof setupIntentId !== 'string') {
    res.status(500).send('No setupIntentId provided or it is not a string')
    return
  }
  console.log(req.query)
  const paymentIntentRes = await apiClient.post<any, AxiosResponse<Stripe.PaymentIntent>>(
    endpoints.donation.finalizeSetupIntent(setupIntentId).url,
    {
      amount: Math.round(Number(finalAmount)),
      currency: Currencies.BGN,
    },
  )

  try {
    const donation = await apiClient.post(endpoints.donation.createStripeDonation.url, {
      paymentIntentId: paymentIntentRes.data.id,
      amount: Number(finalAmount),
      isAnonymous: isAnonymous === 'true',
    })
  } catch (error) {}
  // Confirm the payment
  const urlToRedirect = new URL(
    `${process.env.APP_URL}/${routes.campaigns.donationStatus(campaignSlug as string)}`,
  )
  urlToRedirect.search = new URLSearchParams({
    payment_intent_client_secret: paymentIntentRes.data.client_secret as string,
    payment_intent_id: paymentIntentRes.data.id as string,
    amount: finalAmount as string,
  }).toString()

  res.redirect(urlToRedirect.toString())
}

export default Handler

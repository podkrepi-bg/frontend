import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import Stripe from 'stripe'

import { endpoints } from 'service/apiEndpoints'
import { queryFnFactory } from 'service/restRequests'
import { CampaignResponse } from 'gql/campaigns'

import { Currencies } from 'components/withdrawals/WithdrawalTypes'
import DonationFlowPage from 'components/donation-flow/DonationFlowPage'
import { apiClient } from 'service/apiClient'
import { AxiosResponse } from 'axios'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse>(
    [endpoints.campaign.viewCampaign(String(slug)).url],
    queryFnFactory<CampaignResponse>(),
  )

  //create and prefetch the payment intent
  const { data: paymentIntent } = await apiClient.post<
    Stripe.PaymentIntentCreateParams,
    AxiosResponse<Stripe.PaymentIntent>
  >(endpoints.donation.createPaymentIntent.url, {
    amount: 100,
    currency: Currencies.BGN,
  })

  return {
    props: {
      slug,
      paymentIntent,
      dehydratedState: dehydrate(client),
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'one-time-donation',
      ])),
    },
  }
}

export default DonationFlowPage

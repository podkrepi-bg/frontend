import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import Stripe from 'stripe'
import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { queryFnFactory } from 'service/restRequests'
import { CampaignResponse } from 'gql/campaigns'
import DonationFlowPage from 'components/client/donation-flow/DonationFlowPage'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse>(
    [endpoints.campaign.viewCampaign(String(slug)).url],
    queryFnFactory<CampaignResponse>(),
  )
  await client.prefetchQuery(
    [endpoints.donation.singlePrices.url],
    queryFnFactory<Stripe.Price[]>(),
  )

  //Generate idempotencyKey to prevent duplicate creation of resources in stripe
  const idempotencyKey = crypto.randomUUID()

  //create and prefetch the payment intent
  const { data: setupIntent } = await apiClient.post<
    Stripe.SetupIntentCreateParams,
    AxiosResponse<Stripe.SetupIntentCreateParams>
  >(endpoints.donation.createSetupIntent.url, idempotencyKey)

  return {
    props: {
      slug,
      setupIntent,
      idempotencyKey,
      dehydratedState: dehydrate(client),
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'donation-flow',
      ])),
    },
  }
}

export default DonationFlowPage

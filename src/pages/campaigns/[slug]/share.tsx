import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useViewCampaign } from 'common/hooks/campaigns'
import { endpoints } from 'service/apiEndpoints'
import { CampaignResponse } from 'gql/campaigns'
import { queryFnFactory } from 'service/restRequests'
import CenteredSpinner from 'components/common/CenteredSpinner'
import NotFoundPage from 'pages/404'
import SharePage from 'components/client/campaigns/SharePage'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse>(
    [endpoints.campaign.viewCampaign(slug as string).url],
    queryFnFactory<CampaignResponse>(),
  )

  return {
    props: {
      slug,
      ...(await serverSideTranslations(context.locale ?? 'bg', ['common', 'campaigns'])),
      dehydratedState: dehydrate(client),
    },
  }
}

type Props = { slug: string }

export default function ShareCampaignPage({ slug }: Props) {
  const { data, isLoading, isError } = useViewCampaign(slug)

  if (isLoading || !data) {
    return (
      <>
        {isLoading && <CenteredSpinner size={'2rem'} />}
        {isError && <NotFoundPage />}
      </>
    )
  }

  return <SharePage campaign={data.campaign} />
}

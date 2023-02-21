import { useTranslation } from 'next-i18next'

import { useViewCampaign } from 'common/hooks/campaigns'
import { useRouter } from 'next/router'
import Form from 'components/campaign-expenses/Form'
import Layout from 'components/layout/Layout'

export default function CreateCampaignExpensePage() {
  const { t } = useTranslation('expenses')
  const router = useRouter()
  const { slug } = router.query
  const { data } = useViewCampaign(slug as string)

  return (
    <Layout maxWidth={false}>
      <Form vaultId={data?.campaign.defaultVault} />
    </Layout>
  )
}

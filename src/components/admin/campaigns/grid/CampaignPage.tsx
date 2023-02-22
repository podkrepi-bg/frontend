import { useTranslation } from 'next-i18next'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import CampaignGrid from './CampaignGrid'

export default function CampaignPage() {
  const { t } = useTranslation('campaigns')

  return (
    <AdminLayout>
      <AdminContainer title={t('Кампании')}>
        <CampaignGrid />
      </AdminContainer>
    </AdminLayout>
  )
}

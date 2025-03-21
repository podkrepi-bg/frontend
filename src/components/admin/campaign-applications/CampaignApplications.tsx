import { useTranslation } from 'next-i18next'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import CampaignApplicationsGrid from './CampaignApplicationsGrid'

export default function CampaignApplicationsPage() {
  const { t } = useTranslation('campaign-application')

  return (
    <AdminLayout>
      <AdminContainer title={t('admin.title')}>
        <CampaignApplicationsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
